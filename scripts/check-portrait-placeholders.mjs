import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Node cannot `import()` this project's extensionless TS source (moduleResolution
// "bundler" only) without a custom loader, so this is a careful targeted parse of
// the source text instead of a real module import — see the CARD report.
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENTRY = join(ROOT, "src", "lib", "content", "local", "testimonials.ts");

const fail = (message) => {
  console.error(`\ncheck-portrait-placeholders FAILED — ${message}\n`);
  process.exit(1);
};

function parseImportedImageModules(source, fromFile) {
  const modules = new Map();
  for (const m of source.matchAll(
    /import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["'];?/g,
  )) {
    const specifiers = m[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const modulePath = m[2];
    if (!modulePath.startsWith(".")) continue;
    for (const name of specifiers) {
      modules.set(name, join(dirname(fromFile), `${modulePath}.ts`));
    }
  }
  return modules;
}

async function resolveSrcFromModule(modulePath, identifier) {
  const source = await readFile(modulePath, "utf8");
  const block = new RegExp(
    `export const ${identifier}\\s*:\\s*ContentImage\\s*=\\s*\\{([^}]*)\\}`,
  ).exec(source);
  if (block === null) return null;
  const src = /src:\s*["']([^"']+)["']/.exec(block[1]);
  return src === null ? null : src[1];
}

function parseTestimonialEntries(source) {
  const arrayStart = source.indexOf("export const testimonials");
  if (arrayStart === -1) {
    fail(
      "no `export const testimonials` found — the data shape moved and this script's parse must move with it.",
    );
  }
  const arraySource = source.slice(arrayStart);
  const entries = [];
  for (const m of arraySource.matchAll(/\{([^{}]*)\}/g)) {
    const body = m[1];
    const name = /name:\s*["']([^"']+)["']/.exec(body);
    const portrait = /portrait:\s*(null|[A-Za-z_$][\w$]*|\{[^}]*\})/.exec(body);
    if (name === null || portrait === null) continue;
    entries.push({ name: name[1], portraitExpr: portrait[1] });
  }
  // `{([^{}]*)}` only matches innermost braces, so a nested object literal
  // hides its outer entry — cross-check against a brace-free `portrait:` count.
  const declared = (arraySource.match(/^\s*portrait:/gm) || []).length;
  return { entries, declared };
}

const source = await readFile(ENTRY, "utf8");
const imageModules = parseImportedImageModules(source, ENTRY);
const { entries, declared } = parseTestimonialEntries(source);

if (entries.length === 0)
  fail(
    "found 0 testimonial entries with both a `name` and a `portrait` field — the parse is broken, not the data.",
  );

if (entries.length !== declared)
  fail(
    `parsed ${entries.length} testimonial entries but the source declares ${declared} \`portrait:\` fields — the entry parser silently dropped ${declared - entries.length} entry (likely a nested object literal defeating the \`{([^{}]*)}\` match). Fix the parser before trusting this check, not the data.`,
  );

const bySrc = new Map();
for (const entry of entries) {
  const expr = entry.portraitExpr;
  let src;
  if (expr === "null") {
    continue;
  }
  if (expr.startsWith("{")) {
    const inline = /src:\s*["']([^"']+)["']/.exec(expr);
    src = inline === null ? null : inline[1];
  } else {
    const modulePath = imageModules.get(expr);
    if (modulePath === undefined)
      fail(
        `testimonial "${entry.name}" has portrait: ${expr}, but no import of \`${expr}\` was found — the parse cannot resolve its image src.`,
      );
    src = await resolveSrcFromModule(modulePath, expr);
  }
  if (src === null)
    fail(
      `testimonial "${entry.name}" has portrait: ${expr}, but no \`src\` could be resolved for it — the parse cannot confirm this portrait is unique.`,
    );
  const bucket = bySrc.get(src) ?? [];
  bucket.push(entry.name);
  bySrc.set(src, bucket);
}

const collisions = [...bySrc.entries()].filter(([, names]) => names.length > 1);

if (collisions.length > 0) {
  const report = collisions
    .map(([src, names]) => `  ${src}\n    ${names.join("\n    ")}`)
    .join("\n\n");
  fail(`${collisions.reduce((n, [, names]) => n + names.length, 0)} testimonials share a portrait that should be one-per-person.

${report}

This is DEC-068's temporary placeholder (one real person's portrait standing in
for everyone) — it must not ship. Retire it by giving each testimonial its own
photograph, or setting portrait: null, then this check passes on its own.`);
}

console.log(
  `\nPORTRAIT PLACEHOLDERS — ${entries.length} testimonials checked, every non-null portrait is unique.\n`,
);
