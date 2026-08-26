# Prompt Library

Production-quality lightweight prompt-library site for GitHub Pages.

## Quick start

1. Clone repo.
2. Run `node scripts/generate-manifest.mjs`.
3. Open `index.html` in a static server rooted at repo.

### Local preview

- Python: `python -m http.server 8000`
- Open: `http://localhost:8000/prompts/` when served from a parent directory, or `http://localhost:8000/` when serving repo root.

## Content management

- Add prompt files under `prompts/<category>/` as `.md` or `.txt`.
- Filename becomes title unless front matter sets `title` and `description`.
- Categories are inferred from subdirectory name.
- Run `node scripts/generate-manifest.mjs` after add/rename/delete.

## Deployment

GitHub Actions builds manifest and deploys static site to GitHub Pages.

## Validation

Run:

- `node scripts/generate-manifest.mjs`
- `node scripts/validate-manifest.mjs`
