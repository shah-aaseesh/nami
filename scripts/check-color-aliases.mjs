import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { __unstable__loadDesignSystem, compile } from "tailwindcss";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENTRY = join(ROOT, "src", "app", "globals.css");
const FIELDS = ["field-ink", "field-brand", "field-teal", "field-blush"];

const require_ = createRequire(import.meta.url);
async function loadStylesheet(id, base) {
  const path = id.startsWith(".")
    ? join(base, id)
    : require_.resolve(id.endsWith(".css") ? id : `${id}/index.css`);
  return { path, base: dirname(path), content: await readFile(path, "utf8") };
}

const css = await readFile(ENTRY, "utf8");
const options = { base: dirname(ENTRY), loadStylesheet };
const output = (await compile(css, options)).build(FIELDS);
const theme = new Map(
  [...(await __unstable__loadDesignSystem(css, options)).theme.entries()].map(
    ([key, entry]) => [key, String(entry.value)],
  ),
);

const RULE = /(?:^|[{};\n])\s*((?:\.[\w-]+\s*,\s*)*\.[\w-]+)\s*\{/g;
const rules = [];
for (let open = RULE.exec(output); open !== null; open = RULE.exec(output)) {
  let depth = 1;
  let end = open.index + open[0].length;
  const start = end;
  while (end < output.length && depth > 0) {
    if (output[end] === "{") depth += 1;
    else if (output[end] === "}") depth -= 1;
    end += 1;
  }
  const body = output.slice(start, end - 1);
  rules.push({
    selectors: open[1].split(",").map((part) => part.trim()),
    properties: new Set([...body.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])),
  });
}

function overridden(field) {
  const props = new Set();
  for (const rule of rules) {
    if (!rule.selectors.includes(`.${field}`)) continue;
    for (const property of rule.properties) props.add(property);
  }
  return props;
}

const refs = (value) =>
  [...String(value ?? "").matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]);

const fail = (message) => {
  console.error(`\ncheck-color-aliases FAILED — ${message}\n`);
  process.exit(1);
};
const list = (keys) => [...keys].sort().join("\n    ") || "(none)";

const declared = new Map(FIELDS.map((field) => [field, overridden(field)]));
const [reference] = FIELDS;
const expected = declared.get(reference);

for (const [field, own] of declared) {
  if (own.size === 0)
    fail(`@utility ${field} produced no custom properties. The compiler output
  carries no .${field} rule at all — the extraction is broken, not the CSS.`);
  const missing = [...expected].filter((k) => !own.has(k));
  const extra = [...own].filter((k) => !expected.has(k));
  if (missing.length > 0 || extra.length > 0)
    fail(`.${field} re-points a different property set than .${reference}, so a
  section using it falls back to the enclosing field or :root for the
  difference. Every colour field is declared TWICE in src/app/globals.css —
  once as "@utility field-…", and again in the shared "@layer base" alias block.
  missing:\n    ${list(missing)}\n  unexpected:\n    ${list(extra)}`);
}

// A field's own tokens are the ones nothing else it re-points resolves through;
// the rest are @theme aliases, frozen to :root unless every field restates them.
const fieldTokens = new Set(
  [...expected].filter(
    (k) => !refs(theme.get(k)).some((ref) => expected.has(ref)),
  ),
);

const scoped = new Set(fieldTokens);
for (let settled = false; !settled; ) {
  settled = true;
  for (const [key, value] of theme) {
    if (scoped.has(key)) continue;
    if (refs(value).some((ref) => scoped.has(ref))) {
      scoped.add(key);
      settled = false;
    }
  }
}
const needed = new Set([...scoped].filter((k) => !fieldTokens.has(k)));
const redeclared = new Set([...expected].filter((k) => !fieldTokens.has(k)));

if (theme.size === 0 || needed.size === 0 || redeclared.size === 0)
  fail(`nothing to compare — ${theme.size} theme keys, ${needed.size} aliases
  needing re-declaration, ${redeclared.size} re-declared. Two empty sets match
  each other, so this must never be read as a pass.`);

const dead = [...needed].filter((k) => !redeclared.has(k));
const stale = [...redeclared].filter((k) => !needed.has(k));

if (dead.length > 0 || stale.length > 0)
  fail(`the shadcn alias set has drifted between :root and the colour fields.

  Declared in @theme, so frozen to :root and DEAD inside every colour field.
  Add to the shared "@layer base" alias block:
    ${list(dead)}

  Re-declared on the colour fields but no longer resolving against a field
  token at :root. Remove from the shared "@layer base" alias block:
    ${list(stale)}`);

console.log(
  `\nCOLOUR ALIASES — ${needed.size} of ${theme.size} theme keys resolve against a field-scoped token.`,
);
console.log(
  `All ${needed.size} are re-declared by every field, so they invert.`,
);
console.log(`    ${list(needed)}`);
console.log(
  `\n  ${fieldTokens.size} field tokens + ${redeclared.size} aliases, re-pointed identically by all ${FIELDS.length} fields: ${FIELDS.join(", ")}.\n`,
);
