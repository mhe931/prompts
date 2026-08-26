# Agent continuity

## State
- Repo: mhe931/prompts
- Site target: https://mhe931.github.io/prompts/
- Branch: mhe931-prompt-library-ui

## Canonical commands
- Build manifest: `node scripts/generate-manifest.mjs`
- Validate: `node scripts/validate-manifest.mjs`
- Preview: `python -m http.server 8000`

## Decisions not to reverse
- Static site only, no framework.
- Prompt rendering uses textContent to avoid HTML injection.
- Manifest generated automatically from prompts/.
- GitHub Pages base path support via computed base path.

## Acceptance criteria
- Category browsing, search, viewer, copy, URL deep-linking, mobile UX, theme toggle.
