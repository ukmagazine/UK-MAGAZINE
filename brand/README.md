# Brand assets

`ukmag-logo.png` is the 2000×2000 RGBA master supplied by the publisher —
genuinely transparent background, ink bounding box 1835×1915 with even padding.
It is archived here, **outside `public/`, so it is never served**: at 865 KB it
is far too heavy to put in front of a reader.

Everything the site actually loads is derived from it:

| File | Size | Bytes | Used for |
|---|---|---|---|
| `public/logo.png` | 160×160 | 5.4 KB | header and footer lockup (`Wordmark`) |
| `src/app/icon.png` | 192×192 | 6.1 KB | favicon / app icon |
| `src/app/apple-icon.png` | 180×180 | 4.5 KB | iOS home screen — flattened onto white, because Apple ignores transparency and would composite it on black |
| `src/app/opengraph-image.png` | 1200×630 | 7.9 KB | Open Graph card — white treatment on `#8E1B9C` |
| `src/app/twitter-image.png` | 1200×630 | 7.9 KB | Twitter card, same image |

The master was re-encoded losslessly on the way in: 879,466 → 865,048 bytes.
The derived files total 32 KB.

## Regenerating

`sharp` is not a declared dependency of this project — it arrives as a
transitive dependency of Next and is pinned in `overrides`. The derived files
are therefore committed rather than generated at build time, and this is the
one-off script that produced them:

```js
const sharp = require('sharp');
const fs = require('node:fs');
const src = 'brand/ukmag-logo.png';
const PNG = { compressionLevel: 9, effort: 10, palette: true, quality: 90 };

async function whiteSilhouette(size) {
  const alpha = await sharp(src).ensureAlpha().resize(size, size).extractChannel(3).toBuffer();
  const white = await sharp({ create: { width: size, height: size, channels: 3, background: '#ffffff' } }).png().toBuffer();
  return sharp(white).joinChannel(alpha).png().toBuffer();
}

(async () => {
  await sharp(src).resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png(PNG).toFile('public/logo.png');
  await sharp(src).resize(192, 192).png(PNG).toFile('src/app/icon.png');
  await sharp(src).resize(180, 180).flatten({ background: '#ffffff' }).png(PNG).toFile('src/app/apple-icon.png');

  const markSize = 380;
  const mark = await whiteSilhouette(markSize);
  const og = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#8E1B9C' } })
    .composite([{ input: mark, top: (630 - markSize) / 2, left: (1200 - markSize) / 2 }])
    .png(PNG).toBuffer();
  fs.writeFileSync('src/app/opengraph-image.png', og);
  fs.writeFileSync('src/app/twitter-image.png', og);
})();
```

## White treatment

There is no separate white logo file and none is needed. On dark or
brand-coloured surfaces the mark is rendered white in CSS:

```css
/* brightness(0) flattens every colour — including the gradient on the "U" and
   any residual shadow — to black; invert(1) then makes it white. */
filter: brightness(0) invert(1);
```

`Wordmark` applies this via its `inverted` prop.

## Do not touch

`ukmag_watermark.png` in the `ukmagazine/ukmag-assets` repository is a separate
file consumed by the Instagram cover automation at a fixed size. Nothing here
replaces it.

An SVG export of this logo exists and is **not usable**: Canva wrapped two
base64 PNGs in an SVG container with zero vector paths, so it has none of
SVG's advantages and would defeat the CSS filter above. If a true vector is
wanted later it should be redrawn, not converted.
