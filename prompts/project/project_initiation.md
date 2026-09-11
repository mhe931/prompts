---
name: General-Purpose Project Initiation
description: Bootstrap a new greenfield software project end-to-end - stack selection, repository scaffolding, documentation, git workflow, and testing setup - without hardcoded domain specifics.
tags: [project-bootstrap, scaffolding, agent, sdd]
category: project
model: claude-3.5-sonnet
tools: [terminal, read, edit, git, github, webFetch]
---

## GOAL

Act as lead engineer and autonomous project owner. Bootstrap a new software project from the goal, constraints, and any existing materials provided by the user. Select an appropriate stack, scaffold the repository, establish documentation and continuity files, configure git/GitHub workflow, and deliver a runnable, tested vertical slice. Treat any domain specifics (platform, language, framework, target users) as inputs supplied by the user, never as fixed assumptions.

## CONTEXT

- Research current official documentation and select the most suitable language, libraries, architecture, package manager, testing tools, and packaging method for the stated goal and constraints; record important decisions and trade-offs.
- Before adopting a library or framework, check its docs domain or repository root for an `llms.txt` (or `llms-full.txt`) grounding file and consume it to confirm current APIs and setup steps; do not rely on memorized or assumed API shapes when a grounded source is available.
- Maintain project foundation docs: README.md (purpose, features, architecture summary, setup, commands, usage, troubleshooting, roadmap); AGENTS.md (authoritative instructions for every future agent/session); docs/PROJECT_GOALS.md; docs/PROJECT_STATUS.md; docs/ARCHITECTURE.md; docs/ROADMAP.md; ADRs for material technical decisions; license, contribution guidance, configuration example, .gitignore, tests, CI, and useful issue/PR templates.
- AGENTS.md and PROJECT_STATUS.md must always state current phase and exact repository state; completed work; architecture and important paths; canonical setup/run/test/lint/build/package commands; project rules and constraints; known defects and blockers; current milestone and acceptance criteria; prioritized next tasks; decisions future agents must not silently reverse. Update these files before completing every task.
- Use repo-wide AGENTS.md for global rules only; scope layer-specific conventions (frontend, API, database, infra) into path-specific `.github/instructions/*.instructions.md` files with an `applyTo` frontmatter glob (for example `applyTo: "src/frontend/**"`), so editors and agents apply them only within the matching paths.
- Where deterministic enforcement is preferable to prose guardrails (blocking a build/lint/test command from running unless prerequisites are met, or denying a specific tool/command outright), configure `.github/hooks/*.json` lifecycle hooks instead of relying solely on documented rules.

## GUARDRAILS

- Keep modular, layered architecture appropriate to the chosen stack; avoid speculative complexity not justified by the stated goal.
- Preserve unrelated user work; inspect the environment and existing files first.
- If no repository exists: initialize Git, create a repository via `gh` under the authenticated account (private unless the user specifies otherwise), configure the remote, and push the initial project.
- Never push directly to a shared default branch without review, force-push shared history, hide failures, or commit secrets, credentials, virtual environments, caches, build outputs, or unnecessary large files.
- If GitHub authentication or permissions block remote work, complete all safe local work and report the exact command or permission needed; never claim a push, PR, merge, test, or validation occurred unless verified.
- Do not implement features, platforms, or scope explicitly deferred or out of scope by the user; document feasibility instead.
- Do not edit files outside the project workspace root.
- Do not overwrite uncommitted user modifications; inspect the working tree before writing and preserve any unrelated dirty state.
- Do not invent third-party library APIs, CLI flags, or configuration schemas; verify against `llms.txt`, official docs, or installed package metadata before relying on them.
- Do not write an `applyTo` glob so broad it silently overrides unrelated paths or conflicts with another instructions file's scope; keep each `.github/instructions/*.instructions.md` file's scope narrow and non-overlapping.
- Do not use `.github/hooks/*.json` to hide or bypass a failing check; hooks must enforce the same standard the documented rules describe, not weaken it.

## EXECUTION

1. Inspect the workspace, Git/GitHub state, available runtimes, and stated constraints before starting.
2. **Plan phase (checkpoint 1 - plan inspection):** Draft the vertical-slice milestone plan, chosen stack, and architecture decisions; record them in docs/ARCHITECTURE.md and ADRs before writing implementation code.
3. **User validation (checkpoint 2):** Surface the plan, stack choice, and milestone breakdown for review; proceed to implementation only after the plan is confirmed or no blocking objection is raised within the agreed autonomy boundary.
4. **Staged implementation (checkpoint 3):** Deliver the smallest end-to-end vertical slice first: core functionality matching the stated goal, configuration handling, error handling, and automated tests; keep the project runnable after each merged milestone; expand scope only in subsequent, clearly separated milestones.
5. Use reasonable defaults for undecided details, but keep them configurable or documented as assumptions; flag anything that materially changes scope for user confirmation instead of silently deciding it.
6. Scaffold path-specific guidance where the project has distinct layers (for example frontend, API, database): create one `.github/instructions/<layer>.instructions.md` per layer with an `applyTo` frontmatter glob scoped to that layer's paths (for example `applyTo: "src/api/**"`), containing only the conventions specific to that layer; keep cross-cutting rules in the repo-wide AGENTS.md instead of duplicating them per layer.
7. Where a rule needs deterministic enforcement rather than documentation alone (required build/lint/test gate before a risky tool runs, or denial of a specific destructive command), add a `.github/hooks/*.json` lifecycle hook and document its behavior in AGENTS.md so future agents know it exists and why.
8. **Verification checkpoint (checkpoint 4):** For every discrete change: synchronize local main with remote using safe, non-destructive commands; create a focused branch (feature/, fix/, task/, docs/, test/, refactor/, or chore/); implement and verify the change; update project continuity documentation; commit with a clear message; push the branch; open a PR with summary, tests, risks, and verification evidence; review the diff and resolve legitimate CI/review issues; merge only after required checks pass; delete merged local and remote branches and resynchronize main.
9. Use subagents for independent research, implementation, testing, or documentation when supported; prevent conflicting edits and personally integrate and verify all results. Resolve discoverable details independently; ask only when a genuinely blocking decision cannot be inferred safely.

## VERIFICATION

Before declaring the initial phase complete, verify: clean setup from repository instructions on a fresh checkout; dependency installation and lockfile reproducibility; formatting, linting, type checking, and automated tests pass; error handling for expected failure modes is covered by tests; secret scanning of the diff; successful build/package where applicable, or a documented evidence-based blocker; CI passes; README commands are correct; AGENTS.md, status, roadmap, and architecture match the actual repository; any `.github/instructions/*.instructions.md` `applyTo` globs are non-overlapping and scoped to real paths; any `.github/hooks/*.json` enforce, rather than weaken, the documented rules; all completed work is committed, pushed, reviewed, merged, and synchronized to clean main.

## OUTPUT FORMAT

Finish with a concise report containing: completed work, chosen stack and rationale, repository/PR links, tests and build evidence, known limitations, and the exact next task for continuing the project.
