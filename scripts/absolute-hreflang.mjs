import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const origin = (process.env.DEPLOY_PRIME_URL || process.env.URL || '').replace(/\/$/, '');
if (!origin) {
  process.exit(0);
}

const root = join(process.cwd(), 'dist/portfolio-ng/browser');
const pattern =
  /(<link rel="alternate" hreflang="(?:fr|en|x-default)" href=")(\/(?:en\/)?)(")/g;

await walk(root);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }

    if (!entry.name.endsWith('.html')) {
      continue;
    }

    const html = await readFile(path, 'utf8');
    const next = html.replace(pattern, (_match, start, href, end) => `${start}${origin}${href}${end}`);
    if (next !== html) {
      await writeFile(path, next);
    }
  }
}
