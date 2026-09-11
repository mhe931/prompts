---
name: Create AGENTS.md
description: Generate or repair an authoritative AGENTS.md so any future coding agent can operate on this repository correctly without prior chat history.
tags: [agents-md, documentation, project-continuity, agent-instructions]
category: project
model: claude-3.5-sonnet
tools: [read, grep, edit, terminal, git]
---

## GOAL

Act as project-continuity owner. Create or repair this repository's `AGENTS.md` so that any future coding agent, with no access to prior chat history, can understand the project, follow its rules, run its canonical commands, and continue work safely and correctly.

## CONTEXT

- Inspect repository structure, code, configuration, dependencies, tests, CI/CD workflows, deployment files, Git history, recent commits/PRs, and any existing `AGENTS.md`, `README.md`, or `CONTRIBUTING.md` before writing.
- Before documenting setup or tooling commands for a dependency or framework, check its docs domain or repository root for an `llms.txt` (or `llms-full.txt`) grounding file and consume it to confirm current, accurate commands and behavior; do not rely on memorized or assumed defaults when a grounded source is available.
- If subdirectories have materially different toolchains, rules, or ownership (e.g. a monorepo with separate frontend/backend packages), consider scoped `AGENTS.md` files in those subdirectories in addition to the root file.
- `AGENTS.md` is the single source of truth for future agents; it must be current, unambiguous, and free of speculative or aspirational claims.
- Distinguish three complementary mechanisms and route each rule to the correct one: `AGENTS.md` for repo-wide goals, architecture, commands, and conventions that apply everywhere; `.github/instructions/*.instructions.md` files (each with an `applyTo` frontmatter glob, for example `applyTo: "src/frontend/**"`) for conventions specific to one path or layer that should not clutter the root file; `.github/hooks/*.json` lifecycle hooks for rules that must be enforced deterministically by tooling (a required check before a command runs, or an outright denial of a specific tool/command) rather than merely documented as guidance an agent could overlook.
- Inventory any existing `.github/instructions/*.instructions.md` and `.github/hooks/*.json` files before writing `AGENTS.md`, and reference them from it so a future agent knows they exist and where their scope begins and ends.

## GUARDRAILS

- Treat code, configuration, tests, CI, and Git history as evidence; do not copy stale claims from other docs without verifying them against the actual repository state.
- Never invent completed work, deployment state, test results, commands, or project rules that are not verifiable in the repository.
- Do not expose secrets, tokens, internal credentials, or confidential values in `AGENTS.md`.
- Do not edit files outside the workspace root, and do not rewrite unrelated documentation beyond what is needed for `AGENTS.md` accuracy and any necessary cross-links.
- Do not overwrite uncommitted user modifications; inspect `git status` before writing and preserve any dirty working tree content unrelated to this task.
- Do not invent third-party library or framework APIs, configuration keys, or CLI flags; verify against `llms.txt`, installed versions, lockfiles, or official docs before documenting them.
- Do not duplicate a rule in both `AGENTS.md` and a path-specific `.github/instructions/*.instructions.md` file; state it once in the correct location and cross-reference it from the other.
- Never force-push shared history or claim a Git action succeeded without verification.

## EXECUTION

1. Inspect the repository: languages, package manager(s), build/test/lint/format commands, directory layout, entry points, CI workflows, deployment targets, any existing `AGENTS.md` or equivalent, and any existing `.github/instructions/*.instructions.md` or `.github/hooks/*.json` files.
2. Check for `llms.txt`/`llms-full.txt` grounding files for major dependencies and frameworks in use; use them to verify canonical commands and current API/tooling behavior before documenting them.
3. Draft or update `AGENTS.md` covering: project goal and current phase; architecture overview and important paths/source-of-truth documents; environment, package manager, and canonical setup/run/test/lint/build/package commands (verified by running them where safe); coding, testing, security, dependency, and documentation conventions; Git/branch/commit/PR workflow rules; constraints and decisions that must not be silently reversed; known defects, blockers, and prioritized next tasks; rules for preserving unrelated work, secrets, and generated artifacts; a short index of which `.github/instructions/*.instructions.md` files exist, their `applyTo` scope, and which `.github/hooks/*.json` are active and what they enforce.
4. Run every documented command that can be safely executed to confirm it is correct; correct `AGENTS.md` or flag a code/configuration inconsistency if a command fails or behaves differently than described.
5. Add scoped `AGENTS.md` files in subdirectories only where a materially different toolchain or rule set justifies a separate file; keep the root file as the entry point and cross-reference scoped files from it. Prefer a path-specific `.github/instructions/*.instructions.md` file with a narrow `applyTo` glob over a scoped `AGENTS.md` when the difference is a set of conventions rather than a whole separate toolchain.
6. Review the full diff for accuracy, broken links, invented claims, and secret exposure before finalizing.

## VERIFICATION

Before completion: confirm every documented command was run or is otherwise verifiable as correct; confirm `AGENTS.md` accurately reflects current repository state, not aspirational or stale state; confirm no secrets or sensitive data are present; confirm every existing `.github/instructions/*.instructions.md` and `.github/hooks/*.json` file is inventoried in `AGENTS.md` with accurate scope; confirm a new agent with no prior context could set up, test, and safely modify the project using only `AGENTS.md`.

## OUTPUT FORMAT

Return a concise final report containing: whether `AGENTS.md` was created or updated (and where scoped files were added); key facts documented; the inventory of `.github/instructions/*.instructions.md` and `.github/hooks/*.json` files referenced; commands verified; any inconsistencies found between existing docs and the actual repository; remaining gaps or blockers.
