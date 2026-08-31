/**
 * Regenerates the PWA icon set from the canonical app artwork.
 *
 *   node scripts/generate-icons.mjs
 *
 * This is a one-off tool, not part of `npm run build`. `sharp` is not a
 * declared dependency of this project — it arrives as a transitive dependency
 * of Next and is pinned in `overrides` — so the generated PNGs are committed
 * rather than produced at build time. Same arrangement as brand/README.md.
 *
 * WHY THE ARTWORK IS REBUILT RATHER THAN RESIZED
 *
 * `brand/ukmag-app-icon.png` is an app *tile*: the mark sits on a white
 * rounded square with a soft drop shadow. Shipping that as-is would be wrong
 * in three ways:
 *
 *   1. Android and iOS apply their own mask. Pre-baked rounded corners inside
 *      a system rounding produce a visible double-rounded edge, and the tile's
 *      shadow becomes a grey ring inside the system's own shadow.
 *   2. The mark is 68.7% of the tile and is off-centre by 28px right and 24px
 *      up. A maskable icon is cropped to a centre circle, so an off-centre
 *      mark loses more on one side than the other.
 *   3. A maskable icon must keep its content inside a safe circle of 80% of
 *      the canvas. The mark as placed in the tile would touch that boundary.
 *
 * So the mark is extracted by chroma (the artwork is purple on white, so
 * "coloured pixel" isolates it exactly), re-centred, and composited onto a
 * clean canvas at a size chosen per purpose.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SOURCE = 'brand/ukmag-app-icon.png';
const BACKGROUND = { r: 255, g: 255, b: 255, alpha: 1 }; // matches the tile
const PNG = { compressionLevel: 9, effort: 10, palette: true, quality: 92 };

/** Bounding box of the coloured mark, ignoring the white tile and its shadow. */
async function findMark() {
  const { data, info } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * C;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      // Chroma, not darkness: the drop shadow is grey (zero chroma) and must
      // not widen the box, while every part of the mark is saturated purple.
      if (Math.max(r, g, b) - Math.min(r, g, b) > 40) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/**
 * @param size    canvas edge in px
 * @param ratio   mark height as a fraction of the canvas
 * @param out     destination path
 */
async function build(mark, size, ratio, out) {
  const markH = Math.round(size * ratio);
  const markW = Math.round(markH * (mark.width / mark.height));

  const cropped = await sharp(SOURCE)
    .extract(mark)
    .resize(markW, markH, { fit: 'fill', kernel: 'lanczos3' })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: BACKGROUND },
  })
    .composite([{
      input: cropped,
      // Rounded to whole pixels and centred exactly, correcting the source
      // artwork's 28px/24px offset.
      left: Math.round((size - markW) / 2),
      top: Math.round((size - markH) / 2),
    }])
    .png(PNG)
    .toFile(out);

  return { out, size, markW, markH };
}

const mark = await findMark();
console.log(`mark extracted: ${mark.width}x${mark.height} at (${mark.left},${mark.top})`);

await mkdir('public/icons', { recursive: true });

const results = [];

// purpose "any" — the launcher applies its own rounding, so the mark sits
// generously inside a full-bleed white square.
results.push(await build(mark, 192, 0.78, 'public/icons/icon-192.png'));
results.push(await build(mark, 512, 0.78, 'public/icons/icon-512.png'));

/*
 * purpose "maskable" — cropped to a centre circle of 80% of the canvas.
 * At 72% height the mark's furthest ink sits 36% from centre (top of the
 * ring) and 34.6% horizontally, both inside the 40% safe radius. The bbox
 * corners exceed it, but the mark is a ring: there is no ink there.
 */
results.push(await build(mark, 192, 0.72, 'public/icons/icon-maskable-192.png'));
results.push(await build(mark, 512, 0.72, 'public/icons/icon-maskable-512.png'));

// iOS home screen. Next serves src/app/apple-icon.png at /apple-icon.png and
// emits the <link> itself. iOS ignores transparency and applies its own
// squircle, so this is opaque and square-cornered.
results.push(await build(mark, 180, 0.78, 'src/app/apple-icon.png'));

// Browser tab. Larger ratio: at 16-32px every spare pixel of mark helps.
results.push(await build(mark, 192, 0.88, 'src/app/icon.png'));

const { statSync } = await import('node:fs');
for (const r of results) {
  console.log(
    String(statSync(r.out).size).padStart(7),
    'B  ',
    `${r.size}x${r.size}`.padEnd(9),
    `mark ${r.markW}x${r.markH}`.padEnd(18),
    r.out,
  );
}
