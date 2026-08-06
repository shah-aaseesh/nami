import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { __unstable__loadDesignSystem, compile } from "tailwindcss";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENTRY = join(ROOT, "src", "app", "globals.css");
const FIELDS = ["field-ink", "field-brand", "field-teal"];
const SHARED = `.${FIELDS.join(", .")}`;

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

function properties(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const open = new RegExp(`(?:^|[{};\\n])\\s*${escaped}\\s*\\{`).exec(output);
  if (open === null) return new Set();
  let depth = 1;
  let end = open.index + open[0].length;
  const start = end;
  while (end < output.length && depth > 0) {
    if (output[end] === "{") depth += 1;
    else if (output[end] === "}") depth -= 1;
    end += 1;
  }
  const body = output.slice(start, end - 1);
  return new Set([...body.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
}

const fail = (message) => {
  console.error(`\ncheck-color-aliases FAILED — ${message}\n`);
  process.exit(1);
};
const list = (keys) => [...keys].sort().join("\n    ") || "(none)";

const fieldTokens = properties(`.${FIELDS[0]}`);
for (const field of FIELDS) {
  const own = properties(`.${field}`);
  const missing = [...fieldTokens].filter((k) => !own.has(k));
  const extra = [...own].filter((k) => !fieldTokens.has(k));
  if (own.size === 0)
    fail(`@utility ${field} produced no custom properties. The compiler output
  carries no .${field} rule at all — the extraction is broken, not the CSS.`);
  if (missing.length > 0 || extra.length > 0)
    fail(`@utility ${field} re-points a different token set than ${FIELDS[0]},
  so a section using it inherits :root for the difference.
  missing:\n    ${list(missing)}\n  unexpected:\n    ${list(extra)}`);
}

const scoped = new Set(fieldTokens);
for (let settled = false; !settled; ) {
  settled = true;
  for (const [key, value] of theme) {
    if (scoped.has(key)) continue;
    const refs = [...value.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]);
    if (refs.some((ref) => scoped.has(ref))) {
      scoped.add(key);
      settled = false;
    }
  }
}
const needed = new Set([...scoped].filter((k) => !fieldTokens.has(k)));
const redeclared = properties(SHARED);

if (theme.size === 0 || needed.size === 0 || redeclared.size === 0)
  fail(`nothing to compare — ${theme.size} theme keys, ${needed.size} aliases
  needing re-declaration, ${redeclared.size} re-declared. Two empty sets match
  each other, so this must never be read as a pass.`);

const dead = [...needed].filter((k) => !redeclared.has(k));
const stale = [...redeclared].filter((k) => !needed.has(k));

if (dead.length > 0 || stale.length > 0)
  fail(`the shadcn alias set has drifted between :root and the colour fields.

  Declared in @theme, so frozen to :root and DEAD inside every colour field.
  Add to "@layer base { ${SHARED} }":
    ${list(dead)}

  Re-declared on the colour fields but no longer resolving against a field
  token at :root. Remove from "@layer base { ${SHARED} }":
    ${list(stale)}`);

console.log(
  `\nCOLOUR ALIASES — ${needed.size} of ${theme.size} theme keys resolve against a field-scoped token.`,
);
console.log(
  `All ${needed.size} are re-declared on "${SHARED}", so they invert.`,
);
console.log(`    ${list(needed)}`);
console.log(
  `\n  ${fieldTokens.size} field tokens, re-pointed identically by all ${FIELDS.length} fields.\n`,
);
