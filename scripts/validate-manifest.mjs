import { promises as fs } from 'node:fs';
import path from 'node:path';

const data = JSON.parse(await fs.readFile('prompts/manifest.json', 'utf8'));
if (!Array.isArray(data.prompts)) throw new Error('manifest prompts missing');
if (data.count !== data.prompts.length) throw new Error('manifest count mismatch');
if (!Array.isArray(data.categories) || !data.categories.length) throw new Error('manifest categories missing');
for (const item of data.prompts) {
  if (!item.id || !item.path || !item.name || !item.title || !item.description || !item.category || !Array.isArray(item.tags)) {
    throw new Error(`invalid item: ${JSON.stringify(item)}`);
  }
  const filePath = path.resolve(item.path);
  const content = await fs.readFile(filePath, 'utf8');
  if (!content.startsWith('---\n') || !content.includes('\n---\n')) throw new Error(`${item.path}: frontmatter missing`);
  for (const section of ['GOAL', 'CONTEXT', 'GUARDRAILS', 'EXECUTION', 'VERIFICATION', 'OUTPUT FORMAT']) {
    if (!new RegExp(`^## ${section.replace(' ', '\\ ')}`, 'm').test(content)) {
      throw new Error(`${item.path}: missing section ${section}`);
    }
  }
}
console.log(`Manifest valid: ${data.prompts.length} prompts`);
