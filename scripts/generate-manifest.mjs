import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const promptsRoot = path.join(repoRoot, 'prompts');
const manifestPath = path.join(promptsRoot, 'manifest.json');
const validExt = new Set(['.md', '.txt']);

const titleFromFile = (name) => name.replace(/[-_]+/g, ' ').replace(/\.[^.]+$/, '').replace(/\b\w/g, (c) => c.toUpperCase());

function parseFrontMatter(content) {
  if (!content.startsWith('---\n')) return { meta: {}, body: content };
  const end = content.indexOf('\n---\n', 4);
  if (end === -1) return { meta: {}, body: content };
  const raw = content.slice(4, end).split('\n');
  const meta = {};
  for (const line of raw) {
    const idx = line.indexOf(':');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key && value) meta[key] = value;
  }
  return { meta, body: content.slice(end + 5) };
}

async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.startsWith('.')) continue;
      await walk(p, acc);
      continue;
    }
    const ext = path.extname(e.name).toLowerCase();
    if (!validExt.has(ext)) continue;
    if (e.name.toLowerCase() === 'readme.md') continue;
    acc.push(p);
  }
  return acc;
}

const files = await walk(promptsRoot);
const items = [];
for (const abs of files) {
  const rel = path.relative(repoRoot, abs).replace(/\\/g, '/');
  const parts = rel.split('/');
  if (parts.length < 3) continue;
  const category = parts[1] || 'other';
  const content = await fs.readFile(abs, 'utf8');
  const { meta } = parseFrontMatter(content);
  const file = path.basename(rel);
  const slug = file.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  items.push({
    id: `${category}/${slug}`,
    slug,
    category,
    file,
    path: rel,
    title: meta.title || titleFromFile(file),
    description: meta.description || ''
  });
}
items.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
const categories = [...new Set(items.map((i) => i.category))];
const manifest = {
  generatedAt: new Date().toISOString(),
  categories,
  count: items.length,
  prompts: items
};
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated ${manifestPath} with ${items.length} prompts.`);
