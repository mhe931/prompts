import { promises as fs } from 'node:fs';

const data = JSON.parse(await fs.readFile('prompts/manifest.json', 'utf8'));
if (!Array.isArray(data.prompts)) throw new Error('manifest prompts missing');
for (const item of data.prompts) {
  if (!item.id || !item.path || !item.title || !item.category) throw new Error(`invalid item: ${JSON.stringify(item)}`);
}
console.log(`Manifest valid: ${data.prompts.length} prompts`);
