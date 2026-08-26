# Architecture

- `index.html`: semantic SPA shell.
- `assets/styles.css`: responsive theme and layout.
- `assets/app.js`: client app logic.
- `prompts/manifest.json`: generated prompt index.
- `scripts/generate-manifest.mjs`: scans prompts and emits manifest.
- `.github/workflows/pages.yml`: build manifest and deploy to Pages.

Rendering path:
1. Load manifest JSON.
2. Filter by category/query.
3. Fetch selected prompt text.
4. Render with `textContent`.
