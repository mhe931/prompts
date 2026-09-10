# Architecture

- `index.html`: semantic SPA shell.
- `assets/styles.css`: responsive theme and layout.
- `assets/app.js`: client app logic.
- `prompts/manifest.json`: generated prompt index.
- `prompts/<category>/`: prompt content, one directory per category (`coding`, `other`, `presentations`, `project`, `research`, `writing`). `project` holds project scaffolding, `AGENTS.md` authoring, project-status continuity, and prompt-compiler prompts; `coding` holds task-scoped coding prompts such as code review.
- `scripts/generate-manifest.mjs`: scans prompts and emits manifest.
- `.github/workflows/pages.yml`: build manifest and deploy to Pages.

Rendering path:
1. Load manifest JSON.
2. Filter by category/query.
3. Fetch selected prompt text.
4. Render with `textContent`.
