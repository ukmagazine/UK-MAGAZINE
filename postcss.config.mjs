import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Resolve the Tailwind config relative to this file rather than the working
 * directory, so the build produces the same CSS however the process is
 * launched (from the project root, a monorepo root, or an IDE task).
 *
 * @type {import('postcss-load-config').Config}
 */
const config = {
  plugins: {
    tailwindcss: { config: path.join(dir, 'tailwind.config.ts') },
    autoprefixer: {},
  },
};

export default config;
