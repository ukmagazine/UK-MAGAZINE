import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // Production is served at the custom-domain root; Make hard-codes /article/<slug>/.
  basePath: '',
  // Pin file tracing to this project so an unrelated lockfile further up the
  // filesystem cannot be inferred as the workspace root.
  outputFileTracingRoot: __dirname,
  /**
   * The content loader reads `content/articles/` from disk at build time.
   * `process.cwd()` is not reliable here — Next can be started from another
   * directory (`next start <dir>`), which has already broken the PostCSS and
   * Tailwind lookups in this repo. Pinning the root removes the ambiguity.
   */
  env: { PROJECT_ROOT: __dirname },
  images: {
    /**
     * Resizing is delegated to Unsplash's CDN (see src/lib/image-loader.ts).
     * The built-in optimiser had to download each 1.3 MB original once per
     * size variant, which timed out under load and served 500s.
     */
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    /**
     * Capped at 1440 — the site canvas never exceeds 1480px, so wider
     * variants would only ever be discarded.
     */
    deviceSizes: [320, 375, 640, 768, 1024, 1280, 1440],
    imageSizes: [64, 68, 96, 132, 200, 256, 384],
  },
};

export default nextConfig;
