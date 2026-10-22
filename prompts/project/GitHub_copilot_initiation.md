Act as my Principal AI Development Environment Architect and Implementation Agent.

GOAL
Audit, optimize, install, configure, and verify my GitHub Copilot environment on Windows 11, covering the Copilot desktop app, CLI, and VS Code where supported. Take end-to-end responsibility. Use specialist subagents, available skills, plugins, MCP servers, and terminal tools when useful.

MY ENVIRONMENT
- Windows 11, PowerShell, VS Code, GitHub Copilot desktop app and optionally Copilot CLI.
- No administrator rights. Prefer per-user installation and existing tools.
- Python, Conda/Miniforge, uv, Git, GitHub, Azure CLI, Playwright, JavaScript, SQL.
- Projects: UPM PULSAR-SHAPE/LABEL/SHIVE/platform/data; EO infrastructure master's thesis; YaySay; AirPilot virtual mouse; career-profile/CV.
- Tasks: CV/ML/MLOps engineering; Azure DevOps and GitHub; browser automation; evidence-based project reporting; technical/academic documents; Google Docs; PowerPoint and Google Slides with substantial speaker notes.

EXECUTE
1. Discover installed Copilot versions, app capabilities, CLI commands, skills, plugins, MCP servers, agents, hooks, instructions, authentication status and relevant project roots. Read current official GitHub/Microsoft documentation. Determine which configurations are supported by each actual harness.
2. Back up configurations and inventories with rollback instructions. Detect duplicates and preserve functioning settings and existing project conventions. Do not re-install built-in capabilities.
3. Install the highest-value trusted components, prioritizing official marketplaces:
   - Microsoft Azure Skills: azure@azure-skills from microsoft/azure-skills.
   - From awesome-copilot where available: testing-automation, database-data-management, frontend-web-dev, security-best-practices, project-documenter, project-planning.
   - Official GitHub MCP; Azure MCP; remote Azure DevOps MCP where supported; Microsoft Learn MCP; Microsoft Playwright MCP.
   - Discover optional Google Workspace Docs/Drive/Slides integration, but only enable if trusted, available and explicitly authorized.
   - Check requirements, current registry identifiers, marketplace provenance, permissions and version compatibility before installing; skip redundant or conflicting components.
4. Create or adapt personal agent skills in %USERPROFILE%\.copilot\skills (or another verified supported user scope):
   coding-agent-prompt-compiler, copilot-run-auditor, project-status-briefs, python-engineering-testing, git-pr-automation, azure-mlops, computer-vision-rd, evidence-document-workflow, presentation-speaker-notes, daniel-academic-voice, browser-automation, data-engineering-sql, frontend-ux-testing, security-code-review, scientific-literature-review and architecture-review.
   Reuse trusted existing skills where present. If my ChatGPT skill packages are locally available, inspect and port their complete SKILL.md instructions and resources; otherwise recreate equivalent skills without falsely claiming to have imported them.
5. Create focused custom agents for software architecture, Python/CV engineering, Azure/MLOps, QA/security, scientific research and technical writing. Use the existing orchestration capability when supported. Avoid conflicting agent definitions and unnecessary parallelization.
6. Set concise global instructions: take responsibility through verified delivery; inspect before editing; preserve existing architecture and partial work; use relevant tools/subagents; avoid duplication; implement and test rather than merely propose; protect secrets; review Git diff; report only evidenced completion.
7. Add repository-specific instructions/skills only when relevant to their actual codebase:
   - PULSAR: human-in-the-loop labeling, image provenance, one review queue, sample IDs and dates, shive classification, Azure SQL/Blob/Container Apps.
   - Thesis: geospatial/EO infrastructure, reproducible experiments, academic citations and verification.
   - YaySay: FastAPI/Telegram, RBAC, data integrity, anti-abuse.
   - AirPilot: MediaPipe, low latency, TFLite, Windows input, UI testing.
   - Career profile: factual experience claims, documentation and safe PR workflow.
   Do not infer unsupported project facts or modify unrelated repositories.
8. Configure proportionate test/lint/security hooks and useful on-demand prompt files only where supported. Do not introduce hidden auto-commit, auto-merge, production deployment or destructive actions.
9. Validate with actual commands and smoke tests:
   - Installed skill discovery and activation.
   - Plugin inventory and load state.
   - MCP connection and minimal read-only test per server.
   - Custom-agent availability.
   - A small isolated skill invocation.
   - App/CLI/VS Code interoperability, where supported.
   Distinguish configured from actually working.

SAFETY
Do not require admin rights, expose credentials, bypass company policy, weaken authentication, install unverified arbitrary code, or send UPM/internal data to unauthorized external services. Do not change production resources, databases, cloud permissions, PR state, or Azure DevOps work items during setup. Request approval for credentials, elevated privileges, untrusted code, external paid services and destructive changes. Store secrets only in approved secure stores.

DELIVER
Finish with a compact, evidence-based report:
- Installed and verified components, with location and version
- Reused/existing components
- Failed or blocked components and precise reasons
- Actions requiring my approval
- Backup/rollback path
- How to use the new setup in Copilot Windows, CLI and VS Code

Do the work now with available tools. Do not stop at a recommendation list or claim completion based only on successful configuration writes.
