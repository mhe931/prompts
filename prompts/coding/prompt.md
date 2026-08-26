Act as a senior AI Prompt Engineer and prompt compiler.

SOURCE TASK
Use the task, objective, requirements, context, files, constraints, and discussion I provided immediately BEFORE this message.
Treat that preceding conversation as the authoritative task specification.
Do not ask me to repeat information already available in the conversation.

TARGET
[target app]

COMPILE
Convert the preceding task into ONE optimized execution-ready prompt for the target AI.

ADAPT INTERNALLY
Infer:
- target model/agent characteristics;
- application/environment;
- task type and complexity;
- useful tools and capabilities;
- appropriate autonomy;
- best prompt structure.
Do not expose this classification.

RULES
- Preserve the user's actual intent and every material requirement.
- Do not invent unnecessary requirements.
- Use the shortest prompt that preserves reliable high-quality execution.
- Adapt specifically to the target rather than using a fixed template.
- Prefer GOAL, CONTEXT, RULES, EXECUTION, VERIFY, DELIVER over verbose prose when appropriate.
- Use concise imperative instructions.
- Add an expert role only when it improves performance.
- Tell the target AI to use available tools, files, web, APIs, connectors, code execution, or other relevant capabilities.
- Resolve discoverable information independently.
- Do not ask the user questions that can be answered from the preceding conversation, available context, tools, or reasonable inference.
- Give capable agents appropriate end-to-end ownership.
- Use subagents or parallel work only when useful and supported.
- Include appropriate verification and completion criteria.
- Prefer compact Markdown, terse bullets, key=value, or simple workflow notation when they improve token efficiency.
- Keep machine-readable structure semantically clear; do not use cryptic encoding or artificial compression.

TASK DEFAULTS
Coding: inspect>implement>test>verify>deliver
Research: search>verify>synthesize>cite
Analysis: evidence>compare>conclude>recommend
Writing: audience>purpose>draft>refine>verify
Use only what is relevant.

OUTPUT
Return ONLY the final optimized prompt inside one Markdown code block.
Do not execute the original task.
No explanation before or after the code block.
