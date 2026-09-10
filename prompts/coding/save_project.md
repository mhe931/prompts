---
name: Save Project Status to Memory
description: Persist the current project status to project memory so a new session can resume without prior chat history.
tags: [continuity, memory, session-handoff]
category: coding
model: gpt-4o-mini
tools: [read, edit]
---

## GOAL

Save the current project status to the project memory so a new session opened from this project can resume work without access to this chat history.

## CONTEXT

This prompt is issued at the end of a working session. The assistant has access to the project's persistent memory or continuity files (for example AGENTS.md, docs/PROJECT_STATUS.md, or an equivalent project-memory mechanism).

## GUARDRAILS

- Record only verified facts about the current repository/project state; do not invent completed work, decisions, or results.
- Do not include secrets, credentials, or sensitive data in the saved status.
- Overwrite stale status information rather than appending duplicate or contradictory entries.
- Do not edit files outside the workspace root or memory files unrelated to this project.
- Do not overwrite uncommitted user modifications elsewhere in the working tree; touch only the canonical memory file(s).

## EXECUTION

1. **Plan inspection (checkpoint 1):** Identify the canonical project-memory location (AGENTS.md, docs/PROJECT_STATUS.md, or equivalent) and read its current contents before writing anything.
2. **User validation (checkpoint 2):** Summarize the current phase, completed work, open tasks, known blockers, and any decisions that must not be silently reversed; surface this summary for confirmation when the session allows a review step.
3. **Staged implementation (checkpoint 3):** Write or update the canonical location with this summary, replacing stale sections rather than appending duplicates.
4. **Verification (checkpoint 4):** Re-read the updated file to confirm it accurately reflects the current repository state before ending the session.

## VERIFICATION

Confirm the canonical memory file was updated and accurately reflects the current repository state before ending the session.

## OUTPUT FORMAT

Confirm in one or two sentences that the project status was saved, naming the file(s) updated.
