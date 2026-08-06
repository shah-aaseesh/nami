import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "placeholder",
);

const SPECS = [
  { name: "hero-16x9", width: 1600, height: 900 },
  { name: "level-4x3", width: 1200, height: 900 },
  { name: "campus-3x2", width: 1200, height: 800 },
  { name: "logo-3x1", width: 600, height: 200 },
  { name: "portrait-1x1", width: 600, height: 600 },
];

function svgFor({ name, width, height }) {
  const stroke = Math.max(2, Math.round(Math.min(width, height) / 150));
  const gap = Math.round(Math.min(width, height) / 8);
  const label = `${width} × ${height}`;
  const titleSize = Math.round(Math.min(width, height) / 9);
  const labelSize = Math.round(titleSize * 0.45);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="hatch" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="${gap}" stroke="#c9ced6" stroke-width="${stroke}"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="#eef0f3"/>
  <rect width="${width}" height="${height}" fill="url(#hatch)"/>
  <rect x="${stroke}" y="${stroke}" width="${width - stroke * 2}" height="${height - stroke * 2}" fill="none" stroke="#8b93a1" stroke-width="${stroke * 2}"/>
  <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#8b93a1" stroke-width="${stroke}"/>
  <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="#8b93a1" stroke-width="${stroke}"/>
  <rect x="${width * 0.08}" y="${height / 2 - titleSize}" width="${width * 0.84}" height="${titleSize * 2}" fill="#eef0f3" stroke="#8b93a1" stroke-width="${stroke}"/>
  <text x="50%" y="${height / 2 - titleSize * 0.05}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="bold" fill="#5c6472" letter-spacing="${titleSize * 0.08}">PLACEHOLDER</text>
  <text x="50%" y="${height / 2 + titleSize * 0.7}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${labelSize}" fill="#5c6472">${name}  ${label}</text>
</svg>`;
}

await mkdir(OUT_DIR, { recursive: true });

for (const spec of SPECS) {
  const png = await sharp(Buffer.from(svgFor(spec)))
    .png({ palette: true, colours: 8, effort: 10 })
    .toBuffer();
  await writeFile(join(OUT_DIR, `${spec.name}.png`), png);
  console.log(
    `${spec.name}.png  ${spec.width}x${spec.height}  ${(png.length / 1024).toFixed(1)} KiB`,
  );
}
