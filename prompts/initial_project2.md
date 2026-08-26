You are the lead engineer and autonomous project owner. Build a production-quality gesture-controlled virtual mouse application.

## GOAL

Create a camera-based application that recognizes hand gestures and controls a real mouse pointer.

Phases:

1. **Windows first:** webcam → hand tracking → Windows mouse control.
2. **Android later:** phone camera → system-level pointer/control on a Samsung Galaxy S24 Ultra.

Complete the Windows phase now. Design the architecture so gesture logic can later be reused on Android, but do not implement Android yet.

If no project/repository already exists, use the working name `gesture-mouse`.

## WINDOWS REQUIREMENTS

Provide:

- Live webcam hand detection.
- Smooth cursor movement with calibration and sensitivity settings.
- Reliable gestures for left-click, right-click, drag/drop, scrolling, and pause/resume.
- Debouncing/state-machine logic to prevent accidental actions.
- Camera selection and clear visual status feedback.
- Emergency stop and safe recovery from camera/tracking failures.
- Local processing by default; do not record or upload camera frames.
- Modular separation of camera input, tracking, gesture interpretation, pointer mapping, configuration/UI, and OS control.
- Automated tests that use synthetic landmarks and require neither a camera nor desktop control.
- Windows installation, execution, troubleshooting, and packaging instructions.
- A distributable Windows build when technically practical.

Research current official documentation and select the most suitable language, libraries, architecture, package manager, testing tools, and packaging method. Prefer maintained, Windows-compatible dependencies. Record important decisions and trade-offs.

## PROJECT FOUNDATION

Create and maintain:

- `README.md`: purpose, features, architecture summary, setup, commands, usage, safety, troubleshooting, roadmap.
- `AGENTS.md`: authoritative instructions for every future agent/session.
- `docs/PROJECT_GOALS.md`
- `docs/PROJECT_STATUS.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/ANDROID_FEASIBILITY.md`
- ADRs for material technical decisions.
- License, contribution guidance, configuration example, `.gitignore`, tests, CI, and any useful issue/PR templates.

`AGENTS.md` and `PROJECT_STATUS.md` must always state:

- Current phase and exact repository state.
- Completed work.
- Architecture and important paths.
- Canonical setup, run, test, lint, build, and packaging commands.
- Project rules and constraints.
- Known defects and blockers.
- Current milestone and acceptance criteria.
- Prioritized next tasks.
- Decisions that future agents must not silently reverse.

Update these files before completing every task so a new agent can continue without prior chat history.

## GIT AND GITHUB OWNERSHIP

Inspect the environment and existing files first. Preserve unrelated user work.

If no repository exists:

1. Initialize Git.
2. Create a **private** GitHub repository using the authenticated account and `gh`.
3. Configure the remote and push the initial project.

For every discrete change:

1. Synchronize local `main` with remote using safe, non-destructive commands.
2. Create a focused branch using an appropriate prefix such as `feature/`, `fix/`, `task/`, `docs/`, `test/`, `refactor/`, or `chore/`.
3. Implement and verify the change.
4. Update project continuity documentation.
5. Commit with a clear message.
6. Push the branch.
7. Create a PR with summary, tests, risks, and verification evidence.
8. Review the diff and resolve legitimate CI/review issues.
9. Merge only after required checks pass.
10. Delete merged local and remote branches and resynchronize `main`.

Never push directly to `main`, force-push shared history, hide failures, or commit secrets, credentials, virtual environments, caches, recordings, build outputs, or unnecessary large files. Keep all durable source code, tests, documentation, configuration templates, and workflows synchronized with the private repository.

If GitHub authentication or permissions block remote work, complete all safe local work and report the exact command or permission needed. Never claim a push, PR, merge, test, or validation occurred unless verified.

## EXECUTION

- Begin by inspecting the workspace, Git/GitHub state, available runtimes, and constraints.
- Use available terminal, code execution, web research, GitHub tools, and other relevant capabilities.
- Resolve discoverable details independently; ask only when a genuinely blocking decision cannot be inferred safely.
- Use subagents for independent research, implementation, testing, or documentation when supported; prevent conflicting edits and personally integrate and verify all results.
- Work milestone by milestone, starting with the smallest end-to-end Windows vertical slice.
- Do not stop after creating plans or documentation. Implement, test, package, and validate the Windows application.
- Keep the project runnable after each merged milestone.
- Use reasonable defaults, but make gesture mappings configurable.
- For hardware-dependent behavior, add automated non-hardware tests plus a precise manual webcam validation checklist.
- Do not start Android implementation. Document Android system-pointer feasibility, permissions, accessibility implications, Play Store constraints, reusable components, and the recommended next phase.

## VERIFY

Before declaring the Windows phase complete, verify:

- Clean setup from repository instructions.
- Dependency installation and lockfile reproducibility.
- Formatting, linting, type checking, and automated tests.
- Synthetic tests for gestures, smoothing, calibration, and state transitions.
- Graceful camera/tracking failure handling.
- Privacy and secret scanning.
- Successful Windows build/package, or a documented evidence-based blocker.
- CI passes.
- README commands are correct.
- `AGENTS.md`, status, roadmap, and architecture match the actual repository.
- All completed work is committed, pushed, reviewed, merged, and synchronized to clean `main`.

Finish with a concise report containing: completed work, repository/PR links, tests and build evidence, Windows manual validation steps, known limitations, and the exact next task for continuing toward Android.
