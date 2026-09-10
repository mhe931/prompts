---
name: Windows Gesture-Controlled Virtual Mouse Bootstrap
description: Bootstrap a production-quality, camera-based hand-gesture mouse controller for Windows with an architecture reusable for a later Android phase.
tags: [computer-vision, windows, project-bootstrap, gesture-control, agent]
category: coding
---

## GOAL

Act as lead engineer and autonomous project owner. Build a production-quality gesture-controlled virtual mouse application: a camera-based app that recognizes hand gestures and controls a real mouse pointer. Complete the Windows phase now (webcam - hand tracking - Windows mouse control); design gesture logic so it can be reused later on Android (phone camera - system-level pointer control on a Samsung Galaxy S24 Ultra), but do not implement Android yet. If no project exists, use the working name gesture-mouse.

## CONTEXT

- Research current official documentation and select the most suitable language, libraries, architecture, package manager, testing tools, and packaging method; prefer maintained, Windows-compatible dependencies; record important decisions and trade-offs.
- Maintain project foundation docs: README.md (purpose, features, architecture summary, setup, commands, usage, safety, troubleshooting, roadmap); AGENTS.md (authoritative instructions for every future agent/session); docs/PROJECT_GOALS.md; docs/PROJECT_STATUS.md; docs/ARCHITECTURE.md; docs/ROADMAP.md; docs/ANDROID_FEASIBILITY.md; ADRs for material technical decisions; license, contribution guidance, configuration example, .gitignore, tests, CI, and useful issue/PR templates.
- AGENTS.md and PROJECT_STATUS.md must always state current phase and exact repository state; completed work; architecture and important paths; canonical setup/run/test/lint/build/package commands; project rules and constraints; known defects and blockers; current milestone and acceptance criteria; prioritized next tasks; decisions future agents must not silently reverse. Update these files before completing every task.

## GUARDRAILS

- Process locally by default; do not record or upload camera frames.
- Keep modular separation of camera input, tracking, gesture interpretation, pointer mapping, configuration/UI, and OS control.
- Preserve unrelated user work; inspect the environment and existing files first.
- If no repository exists: initialize Git, create a private GitHub repository via gh under the authenticated account, configure the remote, and push the initial project.
- Never push directly to main, force-push shared history, hide failures, or commit secrets, credentials, virtual environments, caches, recordings, build outputs, or unnecessary large files.
- If GitHub authentication or permissions block remote work, complete all safe local work and report the exact command or permission needed; never claim a push, PR, merge, test, or validation occurred unless verified.
- Do not start Android implementation; only document its feasibility.

## EXECUTION

1. Inspect the workspace, Git/GitHub state, available runtimes, and constraints before starting.
2. Deliver for Windows: live webcam hand detection; smooth cursor movement with calibration and sensitivity settings; reliable gestures for left-click, right-click, drag/drop, scrolling, and pause/resume; debouncing/state-machine logic to prevent accidental actions; camera selection and clear visual status feedback; emergency stop and safe recovery from camera/tracking failures; automated tests using synthetic landmarks that require neither a camera nor desktop control; Windows installation, execution, troubleshooting, and packaging instructions; a distributable Windows build when technically practical.
3. Work milestone by milestone, starting with the smallest end-to-end Windows vertical slice; keep the project runnable after each merged milestone.
4. Use reasonable defaults, but make gesture mappings configurable. For hardware-dependent behavior, add automated non-hardware tests plus a precise manual webcam validation checklist.
5. Document Android system-pointer feasibility: permissions, accessibility implications, Play Store constraints, reusable components, and the recommended next phase - do not implement it.
6. For every discrete change: synchronize local main with remote using safe, non-destructive commands; create a focused branch (feature/, fix/, task/, docs/, test/, refactor/, or chore/); implement and verify the change; update project continuity documentation; commit with a clear message; push the branch; open a PR with summary, tests, risks, and verification evidence; review the diff and resolve legitimate CI/review issues; merge only after required checks pass; delete merged local and remote branches and resynchronize main.
7. Use subagents for independent research, implementation, testing, or documentation when supported; prevent conflicting edits and personally integrate and verify all results. Resolve discoverable details independently; ask only when a genuinely blocking decision cannot be inferred safely.

## VERIFICATION

Before declaring the Windows phase complete, verify: clean setup from repository instructions; dependency installation and lockfile reproducibility; formatting, linting, type checking, and automated tests; synthetic tests for gestures, smoothing, calibration, and state transitions; graceful camera/tracking failure handling; privacy and secret scanning; successful Windows build/package, or a documented evidence-based blocker; CI passes; README commands are correct; AGENTS.md, status, roadmap, and architecture match the actual repository; all completed work is committed, pushed, reviewed, merged, and synchronized to clean main.

## OUTPUT FORMAT

Finish with a concise report containing: completed work, repository/PR links, tests and build evidence, Windows manual validation steps, known limitations, and the exact next task for continuing toward Android.
