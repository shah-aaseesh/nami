import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [, , pdfPath, outDir] = process.argv;
mkdirSync(outDir, { recursive: true });

const buf = readFileSync(pdfPath);

// JPEG (DCTDecode) streams embed a complete JFIF/EXIF payload, so SOI..EOI can be
// carved straight out without decoding the PDF object graph.
const SOI = Buffer.from([0xff, 0xd8, 0xff]);
const EOI = Buffer.from([0xff, 0xd9]);

let found = 0;
let cursor = 0;
const sizes = [];

while (cursor < buf.length) {
  const start = buf.indexOf(SOI, cursor);
  if (start === -1) break;
  const end = buf.indexOf(EOI, start + 3);
  if (end === -1) break;
  const slice = buf.subarray(start, end + 2);
  if (slice.length > 4096) {
    const name = `img-${String(found).padStart(3, "0")}.jpg`;
    writeFileSync(join(outDir, name), slice);
    sizes.push({ name, bytes: slice.length });
    found += 1;
  }
  cursor = end + 2;
}

// PNG (FlateDecode-wrapped) images occasionally appear verbatim too.
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const IEND = Buffer.from([0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
cursor = 0;
while (cursor < buf.length) {
  const start = buf.indexOf(PNG_SIG, cursor);
  if (start === -1) break;
  const end = buf.indexOf(IEND, start);
  if (end === -1) break;
  const slice = buf.subarray(start, end + 8);
  const name = `img-${String(found).padStart(3, "0")}.png`;
  writeFileSync(join(outDir, name), slice);
  sizes.push({ name, bytes: slice.length });
  found += 1;
  cursor = end + 8;
}

sizes.sort((a, b) => b.bytes - a.bytes);
console.log(`extracted ${found} images to ${outDir}`);
for (const s of sizes.slice(0, 25)) {
  console.log(`  ${s.name}  ${(s.bytes / 1024).toFixed(0)} KB`);
}
