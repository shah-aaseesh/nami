import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = join(ROOT, "scripts", "tsconfig.placeholders.json");
const BUILD = join(ROOT, "node_modules", ".cache", "nami-content");

const compile = spawnSync(
  process.execPath,
  [join(ROOT, "node_modules", "typescript", "bin", "tsc"), "-p", CONFIG],
  { cwd: ROOT, encoding: "utf8" },
);
if (compile.status !== 0) {
  process.stderr.write(compile.stdout ?? "");
  process.stderr.write(compile.stderr ?? "");
  console.error("Could not compile the content layer.");
  process.exit(1);
}

const require_ = createRequire(import.meta.url);
const { content, placeholderRecords, isPlaceholderShaped, isPlaceholder } =
  require_(join(BUILD, "index.js"));

const graph = {
  institution: await content.getInstitution(),
  stats: await content.getStats(),
  academicLevels: await content.getAcademicLevels(),
  programmes: await content.getProgrammes(),
  affiliations: await content.getAffiliations(),
  partners: await content.getPartners(),
  campusLife: await content.getCampusLife(),
  admissionCalls: await content.getAdmissionCalls(),
  updates: await content.getUpdates(),
  testimonials: await content.getTestimonials(),
  homeCopy: await content.getHomeCopy(),
  aboutCopy: await content.getAboutCopy(),
};

const occurrences = new Map();
function walk(node, path) {
  if (typeof node === "string") {
    const seen = occurrences.get(node) ?? [];
    seen.push(path);
    occurrences.set(node, seen);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, index) => {
      walk(item, `${path}[${item?.slug ?? index}]`);
    });
    return;
  }
  if (typeof node === "object" && node !== null) {
    for (const [key, value] of Object.entries(node)) {
      walk(value, path === "" ? key : `${path}.${key}`);
    }
  }
}
walk(graph, "");

const records = placeholderRecords();
const failures = [];

for (const record of records) {
  if (!occurrences.has(record.value)) {
    failures.push(
      `registered but absent from the content: ${record.path} = ${JSON.stringify(record.value)}`,
    );
  }
}

for (const [value, paths] of occurrences) {
  if (isPlaceholderShaped(value) && !isPlaceholder(value)) {
    failures.push(
      `placeholder-shaped but NOT registered: ${paths[0]} = ${JSON.stringify(value)}`,
    );
  }
}

const KIND_ORDER = [
  "contact",
  "address",
  "map",
  "link",
  "image",
  "testimonial",
  "update",
];
const sorted = [...records].sort(
  (a, b) =>
    KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) ||
    a.path.localeCompare(b.path),
);

console.log(
  `\nPLACEHOLDER CONTENT — ${records.length} registered sites, source "${content.source}"`,
);
console.log(
  "Every value below is FAKE and must be replaced before this site goes live.\n",
);

let currentKind = "";
for (const record of sorted) {
  if (record.kind !== currentKind) {
    currentKind = record.kind;
    console.log(`  ${currentKind.toUpperCase()}`);
  }
  const used = occurrences.get(record.value)?.length ?? 0;
  const times = used > 1 ? `  (${used} places)` : "";
  const shown =
    record.value.length > 88 ? `${record.value.slice(0, 85)}...` : record.value;
  console.log(`    ${record.path}`);
  console.log(`      ${shown}${times}`);
}

const realLinks = graph.admissionCalls.filter(
  (call) => call.link !== null && !isPlaceholder(call.link.href),
);
console.log(`\n  REAL, NOT PLACEHOLDER — leave these alone`);
for (const call of realLinks) {
  console.log(`    admissionCalls[${call.slug}].link.href`);
  console.log(`      ${call.link.href}`);
}

if (failures.length > 0) {
  console.error(`\nFAILED — ${failures.length} registry problem(s):`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(
  `\nRegistry is consistent with the content. ${records.length} placeholders.\n`,
);
