---
name: AutoHotkey Clipboard Prompt Launcher
description: Maintain an AutoHotkey v2 script that expands hotstrings into full prompt texts and pastes them via the clipboard.
tags: [autohotkey, automation, windows, prompt-engineering, utility-script]
category: other
model: claude-3.5-sonnet
tools: [read, edit]
---

## GOAL

Build and maintain an AutoHotkey v2 script that expands short hotstrings into complete, ready-to-use prompt texts and pastes them into the active application via the clipboard.

## CONTEXT

The script runs under AutoHotkey v2 on Windows and is triggered by typing a hotstring (for example hmn, rsm, sss, prm, wpp) in any text field. Each hotstring builds a full prompt string in memory and hands it to a shared PasteText helper, which places the text on the clipboard and sends Ctrl+V. Some hotstrings (rsm, prm, wpp) first collect one piece of user input via InputBox (job description/URL, or target application/agent name) and interpolate it into the generated prompt. The prompt bodies embedded in this script correspond to the standalone prompts write_resume.md, save_project.md, prompt.md, prompt_for_agent.md, and humanize_for_me.md elsewhere in this library; keep their wording synchronized when either side changes.

## GUARDRAILS

- Preserve the exact hotstring trigger names (hmn, rsm, sss, prm, wpp) and the PasteText clipboard/paste mechanism.
- Always clear the clipboard, wait briefly, set the new text, call ClipWait, and show an error MsgBox on failure before sending Ctrl+V; never send Ctrl+V without a successful ClipWait.
- Cancel cleanly (return without pasting) when an InputBox is dismissed with Cancel or left blank where a value is required.
- Do not remove or weaken the accuracy, ethics, or scope-limiting language embedded in the generated prompts (for example the resume prompt's anti-fabrication rules).
- Keep the script self-contained AutoHotkey v2 syntax; do not introduce external dependencies.
- Do not edit files outside the workspace root or unrelated prompt files when synchronizing embedded prompt text.
- Do not overwrite uncommitted user modifications in this file or the standalone prompt files it mirrors; diff before writing.
- Do not invent AutoHotkey v2 functions, directives, or built-in variables; verify against the AutoHotkey v2 documentation before use.

## EXECUTION

1. Define a shared PasteText(text) function that stages the clipboard, waits for it to be ready, and sends Ctrl+V, showing a MsgBox if the clipboard fails.
2. Implement each hotstring as its own block:
   - hmn: pastes the human-academic-writing-style prompt directly.
   - rsm: prompts for a job description/URL via InputBox, builds the full tailored resume/cover-letter/interview/salary prompt (matching other/write_resume.md), appends the captured job description, and pastes it.
   - sss: pastes the fixed save-project-status prompt directly.
   - prm: prompts for a target application/model via InputBox (defaulting to "use the current AI system/model" if blank), builds the universal prompt-compiler prompt (matching coding/prompt.md), and pastes it.
   - wpp: prompts for a target coding agent/environment via InputBox (defaulting to "use the current coding agent/environment" if blank), builds the coding-agent prompt-compiler prompt (matching coding/prompt_for_agent.md), and pastes it.
3. When adding a new hotstring, follow the same pattern: collect only the minimum required input, build the text with string concatenation, and end with a call to PasteText.
4. Keep this file and the corresponding standalone prompt files consistent; update both sides when the wording of a shared prompt changes.

## VERIFICATION

- Manually trigger each hotstring in a text editor and confirm the expected prompt is pasted, including correctly interpolated InputBox values.
- Confirm Cancel/blank InputBox responses abort without pasting or showing errors.
- Confirm the clipboard-failure path shows the MsgBox and does not attempt to paste.
- Diff the embedded prompt text against the corresponding standalone prompt file after any edit to keep them in sync.

## OUTPUT FORMAT

Return the complete AutoHotkey v2 script as a single fenced code block, ready to save as a .ahk file and run.

Reference implementation:

```autohotkey

; =========================================================
; Clipboard Paste Helper
; =========================================================

PasteText(text) {
    A_Clipboard := ""
    Sleep 50
    A_Clipboard := text

    if !ClipWait(1) {
        MsgBox "Clipboard failed. Please try again."
        return
    }

    Sleep 50
    Send "^v"
}
; =========================================================
; HOTSTRING: hmn
; Human Academic Writing Prompt
; =========================================================

::hmn::
{
    prompt := "Act as a Persian Master's student in Artificial Intelligence studying at the University of Vaasa, Finland."
    prompt .= "`n`nWrite in a natural, human, and academically authentic way. The response should sound like it was written by a real international graduate student, not an AI system."
    prompt .= "`n`nUse clear, simple, and thoughtful English. Keep the tone humble, curious, and realistic. Avoid robotic transitions, exaggerated vocabulary, and generic AI-style phrasing."
    prompt .= "`n`nPrefer conversational academic writing over overly polished corporate language. Use natural sentence variation and avoid unnecessary bullet points unless they improve clarity."
    prompt .= "`n`nThe final answer should feel personal, credible, and suitable for academic discussion."

    PasteText(prompt)
}

; =========================================================
; HOTSTRING: rsm
; Professional Resume and Job Application Prompt
; AutoHotkey v2
; =========================================================

::rsm::
{
    target := InputBox(
        "Paste the job description, company profile, or job posting URL:",
        "Job Application Context"
    )

    if target.Result = "Cancel" || Trim(target.Value) = ""
        return

    rsmText := "Act as a Senior Technical Recruiter, ATS Optimization Specialist, Executive Resume Writer, and Career Strategist specializing in Data Engineering, Analytics, AI, Computer Vision, and industrial technology roles."

    rsmText .= "`n`nOBJECTIVE"
    rsmText .= "`nAnalyze the target role and create a realistic, evidence-based application package. Aim for strong relevance rather than artificial keyword matching. Target approximately 80% alignment when supported by my actual experience."

    rsmText .= "`n`nACCURACY AND ETHICS"
    rsmText .= "`n- Do not invent responsibilities, employers, technologies, achievements, certifications, dates, metrics, or project outcomes."
    rsmText .= "`n- Do not exaggerate seniority or claim production impact that is not supported by the supplied profile."
    rsmText .= "`n- Preserve factual consistency across the resume, cover letter, interview answers, and salary analysis."
    rsmText .= "`n- When a useful metric is missing, use a clearly marked placeholder such as [METRIC REQUIRED] instead of fabricating a number."
    rsmText .= "`n- Distinguish clearly between professional employment, academic work, prototypes, personal projects, and proof-of-concept implementations."
    rsmText .= "`n- Never expose confidential, proprietary, employer-owned, customer-specific, or security-sensitive information."
    rsmText .= "`n- Use only information supported by the target job description and the reference profile."

    rsmText .= "`n`nINITIAL ROLE-GATE ASSESSMENT"
    rsmText .= "`nBefore writing application materials:"
    rsmText .= "`n1. Identify the role title, company, location, employment type, seniority, primary responsibilities, mandatory requirements, preferred requirements, and likely business problems."
    rsmText .= "`n2. Estimate my overall match percentage and briefly justify it."
    rsmText .= "`n3. Separate the assessment into:"
    rsmText .= "`n   - Strong matches"
    rsmText .= "`n   - Transferable matches"
    rsmText .= "`n   - Partial matches"
    rsmText .= "`n   - Material gaps"
    rsmText .= "`n4. If mandatory professional fluency in a non-English language is explicitly required and I cannot credibly meet it, stop and explain the issue."
    rsmText .= "`n5. If the estimated overall match is below 50%, stop and explain the main gaps and whether applying is still strategically reasonable."
    rsmText .= "`n6. Do not treat an optional or preferred language requirement as an automatic rejection."
    rsmText .= "`n7. If the job posting URL cannot be accessed, state that clearly and ask for the full job description instead of guessing."

    rsmText .= "`n`nWRITING STYLE"
    rsmText .= "`n- Use direct, modern, natural, Master's-level professional English."
    rsmText .= "`n- Write in a confident but credible tone."
    rsmText .= "`n- Avoid generic AI language, inflated adjectives, and cliches such as pioneered, tapestry, cutting-edge, world-class, revolutionary, visionary, game-changing, or similar wording."
    rsmText .= "`n- Avoid empty claims such as results-driven, dynamic professional, proven track record, and passionate about technology unless supported by evidence."
    rsmText .= "`n- Prefer concise sentences, strong verbs, specific technologies, business context, and measurable outcomes."
    rsmText .= "`n- Make the writing sound human and suitable for a Finnish or international European employer."

    rsmText .= "`n`nCANDIDATE POSITIONING"

    rsmText .= "`n`nCore Profile:"
    rsmText .= "`nLead Data and Analytics Engineer with more than 14 years of professional experience across data engineering, analytics, business intelligence, automation, machine learning, computer vision, operations, and decision-support systems."

    rsmText .= "`n`nCurrent Professional Focus:"
    rsmText .= "`nCurrently working as a Summer Worker in Computer Vision and Advanced Analytics at UPM-Kymmene Oyj in Finland. The role started on May 25, 2026, and is planned as a four-month assignment."
    rsmText .= "`nRelevant work includes industrial computer vision, neural-network monitoring, image and mask processing, asynchronous Python workflows, frame-latency optimization, automated data collection, model evaluation, and integration of analytical solutions with existing industrial processes."
    rsmText .= "`nRepresent this role accurately as a fixed-term summer position. Do not rename it as a permanent senior role."

    rsmText .= "`n`nAcademic Focus:"
    rsmText .= "`nMaster's studies in Artificial Intelligence and Data Engineering at the University of Vaasa, with emphasis on machine learning, automation, advanced data architectures, computer vision, and practical industrial AI applications."

    rsmText .= "`n`nPrevious Company Context:"
    rsmText .= "`n- Digikala Holding: A major Iranian digital ecosystem serving approximately 54 million users across e-commerce, consumer-to-consumer services, digital content, and fintech products, including Digikala, Pindo, Fidibo, and Digipay."
    rsmText .= "`n- Snapp Market: A high-growth online grocery and FMCG platform operating within the Snapp ecosystem. Relevant experience includes scaling operations from an early 12-person team to a regional organization of approximately 100 people."
    rsmText .= "`nUse international comparisons such as Amazon, Uber, or Wolt only when they improve understanding. Do not present these companies as legally or operationally identical."

    rsmText .= "`n`nRELEVANT EXPERIENCE AND PROJECT INVENTORY"
    rsmText .= "`nSelect only the projects that directly support the target role. Do not force every project into every application."

    rsmText .= "`n`nAI, Machine Learning, and Automation:"
    rsmText .= "`n- Market Party: Reinforcement-learning-oriented profit optimization and budget-control concept."
    rsmText .= "`n- Zombie Analysis: Customer retention, inactivity, and discount-sensitivity analysis."
    rsmText .= "`n- Predictive churn modeling and customer-behavior pipelines."
    rsmText .= "`n- AI-assisted operational decision-support workflows."

    rsmText .= "`n`nComputer Vision and Industrial Analytics:"
    rsmText .= "`n- Industrial material and defect inspection prototypes."
    rsmText .= "`n- Image scraping, annotation extraction, mask generation, deterministic mask cleaning, object detection, classification, human review, and model-retraining workflows."
    rsmText .= "`n- Video-frame processing and latency optimization using asynchronous Python."
    rsmText .= "`n- Automated sensor, image, and telemetry collection."
    rsmText .= "`n- Industrial inspection work related to UPM and Wartsila contexts, described only at a non-confidential level."

    rsmText .= "`n`nData Engineering, Analytics, and Operations:"
    rsmText .= "`n- Real-time anomaly-detection and notification bots using asynchronous updates."
    rsmText .= "`n- Airflow-based ETL orchestration."
    rsmText .= "`n- Consolidated dashboards and Single Source of Truth reporting."
    rsmText .= "`n- Data pipelines, operational analytics, KPI frameworks, and automated reporting."
    rsmText .= "`n- Cross-functional collaboration between business, engineering, analytics, and operations teams."

    rsmText .= "`n`nGeospatial and Commercial Analytics:"
    rsmText .= "`n- Billboard heatmaps and user-density analysis for logistics and advertising assets."
    rsmText .= "`n- Location-based decision support and operational planning."

    rsmText .= "`n`nTAILORING METHOD"
    rsmText .= "`n1. Extract the 10 to 15 most important keywords, technologies, capabilities, and business outcomes from the target role."
    rsmText .= "`n2. Map each important requirement to verified evidence from my background."
    rsmText .= "`n3. Prioritize the strongest and most recent evidence."
    rsmText .= "`n4. Use exact terminology from the job posting where factually appropriate."
    rsmText .= "`n5. Do not keyword-stuff."
    rsmText .= "`n6. Identify transferable experience when an exact match is unavailable."
    rsmText .= "`n7. Explain important gaps honestly and suggest how to address them in the application or interview."
    rsmText .= "`n8. Optimize for both ATS parsing and human readability."

    rsmText .= "`n`nREQUIRED DELIVERABLES"

    rsmText .= "`n`n1. Role and Fit Assessment"
    rsmText .= "`nProvide:"
    rsmText .= "`n- Role summary"
    rsmText .= "`n- Estimated match percentage"
    rsmText .= "`n- Strong matches"
    rsmText .= "`n- Transferable matches"
    rsmText .= "`n- Important gaps"
    rsmText .= "`n- Mandatory-language assessment"
    rsmText .= "`n- Apply / Apply with caution / Do not apply recommendation"
    rsmText .= "`n- Five highest-priority ATS keywords"

    rsmText .= "`n`n2. Targeted Professional Summary"
    rsmText .= "`nWrite a concise three-to-five-line professional summary tailored to the role."
    rsmText .= "`nDo not merely repeat the job description."

    rsmText .= "`n`n3. ATS-Optimized Core Skills"
    rsmText .= "`nCreate a focused skills section grouped into relevant categories such as:"
    rsmText .= "`n- Data Engineering"
    rsmText .= "`n- Machine Learning and AI"
    rsmText .= "`n- Computer Vision"
    rsmText .= "`n- Analytics and BI"
    rsmText .= "`n- Cloud and MLOps"
    rsmText .= "`n- Leadership and Business"
    rsmText .= "`nInclude only skills supported by my actual profile."

    rsmText .= "`n`n4. Resume Bullet Recommendations"
    rsmText .= "`nCreate tailored bullets for the most relevant roles and projects."
    rsmText .= "`nUse the XYZ principle where evidence permits:"
    rsmText .= "`nAccomplished [X], measured by [Y], by doing [Z]."
    rsmText .= "`nDo not force the formula when no reliable metric exists."
    rsmText .= "`nEach bullet should:"
    rsmText .= "`n- begin with a precise action verb;"
    rsmText .= "`n- describe the technical or business action;"
    rsmText .= "`n- explain scale, complexity, or outcome when supported;"
    rsmText .= "`n- contain relevant ATS terminology naturally;"
    rsmText .= "`n- remain concise and defensible in an interview."

    rsmText .= "`n`n5. Professional Cover Letter"
    rsmText .= "`nWrite a tailored cover letter of approximately 300 to 450 words."
    rsmText .= "`nStructure:"
    rsmText .= "`n- Opening: role, motivation, and concise value proposition"
    rsmText .= "`n- Evidence: two or three directly relevant examples"
    rsmText .= "`n- Business fit: how my experience addresses the employer's likely challenges"
    rsmText .= "`n- Closing: professional interest and availability for discussion"
    rsmText .= "`nAvoid repeating the resume line by line."
    rsmText .= "`nDo not invent a hiring manager's name."

    rsmText .= "`n`n6. Interview Preparation"
    rsmText .= "`nProvide five to seven likely interview questions."
    rsmText .= "`nFor each question:"
    rsmText .= "`n- explain what the interviewer is evaluating;"
    rsmText .= "`n- provide a realistic, conversational answer;"
    rsmText .= "`n- use STAR structure when appropriate;"
    rsmText .= "`n- connect the answer to relevant experience without forcing unrelated projects;"
    rsmText .= "`n- avoid scripted or exaggerated language."
    rsmText .= "`nInclude at least:"
    rsmText .= "`n- one technical-depth question;"
    rsmText .= "`n- one system-design or architecture question;"
    rsmText .= "`n- one leadership or stakeholder question;"
    rsmText .= "`n- one failure, conflict, or lessons-learned question;"
    rsmText .= "`n- one question about motivation for the role."

    rsmText .= "`n`n7. Salary Assessment"
    rsmText .= "`nEstimate a realistic gross salary range based on:"
    rsmText .= "`n- role;"
    rsmText .= "`n- location;"
    rsmText .= "`n- industry;"
    rsmText .= "`n- seniority;"
    rsmText .= "`n- employment type;"
    rsmText .= "`n- current market conditions."
    rsmText .= "`nState whether the estimate is monthly or annual and whether it includes bonuses."
    rsmText .= "`nUse current, reputable market sources when browsing is available."
    rsmText .= "`nIf current salary data cannot be verified, clearly label the range as an estimate and explain the assumptions."
    rsmText .= "`nProvide:"
    rsmText .= "`n- conservative range;"
    rsmText .= "`n- realistic target range;"
    rsmText .= "`n- negotiation anchor;"
    rsmText .= "`n- brief negotiation rationale."

    rsmText .= "`n`n8. Application Risk Check"
    rsmText .= "`nIdentify:"
    rsmText .= "`n- unsupported claims to avoid;"
    rsmText .= "`n- missing evidence;"
    rsmText .= "`n- likely recruiter concerns;"
    rsmText .= "`n- interview areas requiring preparation;"
    rsmText .= "`n- portfolio or GitHub items that should be highlighted."

    rsmText .= "`n`nREFERENCE PROFILE"
    rsmText .= "`nResume Portfolio: https://mhe931.github.io/cv/"
    rsmText .= "`nGitHub Portfolio: https://github.com/mhe931/"
    rsmText .= "`nReview these sources when access is available, but do not infer unsupported facts from repository names alone."

    rsmText .= "`n`nOUTPUT FORMAT"
    rsmText .= "`nUse the following sections:"
    rsmText .= "`nA. Role and Fit Assessment"
    rsmText .= "`nB. Requirement-to-Evidence Matrix"
    rsmText .= "`nC. Targeted Professional Summary"
    rsmText .= "`nD. ATS-Optimized Skills"
    rsmText .= "`nE. Resume Bullet Recommendations"
    rsmText .= "`nF. Cover Letter"
    rsmText .= "`nG. Interview Questions and Answers"
    rsmText .= "`nH. Salary Assessment"
    rsmText .= "`nI. Application Risks and Gaps"
    rsmText .= "`nJ. Final Application Recommendation"

    rsmText .= "`n`nFINAL QUALITY CHECK"
    rsmText .= "`nBefore finalizing, verify that:"
    rsmText .= "`n- all claims are supported;"
    rsmText .= "`n- no metrics were invented;"
    rsmText .= "`n- mandatory requirements were evaluated correctly;"
    rsmText .= "`n- relevant ATS terms were included naturally;"
    rsmText .= "`n- employment, academic, prototype, and personal-project experience remain clearly distinguished;"
    rsmText .= "`n- the resume and cover letter are consistent;"
    rsmText .= "`n- the language is direct, credible, and human;"
    rsmText .= "`n- confidential company information is excluded;"
    rsmText .= "`n- the final recommendation is realistic rather than overly optimistic."

    rsmText .= "`n`nTARGET JOB DESCRIPTION, COMPANY CONTEXT, OR URL"
    rsmText .= "`n" target.Value

    PasteText(rsmText)
}


; =========================================================
; HOTSTRING: sss
; save current status for AIs
; =========================================================

::sss::
{

    sssText := "save project status to the project memory. I will open a new session from this project."
    sssText .= "`n"

    PasteText(sssText)
}

; =========================================================
; HOTSTRING: prm
; Context-Aware Universal Prompt Compiler
; AutoHotkey v2
; =========================================================

::prm::
{
    target := InputBox(
        "Target application / model / agent:`n`nExamples: Gemini, ChatGPT, Claude, Perplexity, NotebookLM.`n`nLeave blank if the current application/model is already clear.",
        "PRM - Target"
    )

    if target.Result != "OK"
        return

    targetValue := Trim(target.Value)
    if targetValue = ""
        targetValue := "Use the current AI system/model."

    prmText := "Act as a senior AI Prompt Engineer and prompt compiler."

    prmText .= "`n`nSOURCE TASK"
    prmText .= "`nUse the task, objective, requirements, context, files, constraints, and discussion I provided immediately BEFORE this message."
    prmText .= "`nTreat that preceding conversation as the authoritative task specification."
    prmText .= "`nDo not ask me to repeat information already available in the conversation."

    prmText .= "`n`nTARGET"
    prmText .= "`n" targetValue

    prmText .= "`n`nCOMPILE"
    prmText .= "`nConvert the preceding task into ONE optimized execution-ready prompt for the target AI."

    prmText .= "`n`nADAPT INTERNALLY"
    prmText .= "`nInfer:"
    prmText .= "`n- target model/agent characteristics;"
    prmText .= "`n- application/environment;"
    prmText .= "`n- task type and complexity;"
    prmText .= "`n- useful tools and capabilities;"
    prmText .= "`n- appropriate autonomy;"
    prmText .= "`n- best prompt structure."
    prmText .= "`nDo not expose this classification."

    prmText .= "`n`nRULES"
    prmText .= "`n- Preserve the user's actual intent and every material requirement."
    prmText .= "`n- Do not invent unnecessary requirements."
    prmText .= "`n- Use the shortest prompt that preserves reliable high-quality execution."
    prmText .= "`n- Adapt specifically to the target rather than using a fixed template."
    prmText .= "`n- Prefer GOAL, CONTEXT, RULES, EXECUTION, VERIFY, DELIVER over verbose prose when appropriate."
    prmText .= "`n- Use concise imperative instructions."
    prmText .= "`n- Add an expert role only when it improves performance."
    prmText .= "`n- Tell the target AI to use available tools, files, web, APIs, connectors, code execution, or other relevant capabilities."
    prmText .= "`n- Resolve discoverable information independently."
    prmText .= "`n- Do not ask the user questions that can be answered from the preceding conversation, available context, tools, or reasonable inference."
    prmText .= "`n- Give capable agents appropriate end-to-end ownership."
    prmText .= "`n- Use subagents or parallel work only when useful and supported."
    prmText .= "`n- Include appropriate verification and completion criteria."
    prmText .= "`n- Prefer compact Markdown, terse bullets, key=value, or simple workflow notation when they improve token efficiency."
    prmText .= "`n- Keep machine-readable structure semantically clear; do not use cryptic encoding or artificial compression."

    prmText .= "`n`nTASK DEFAULTS"
    prmText .= "`nCoding: inspect>implement>test>verify>deliver"
    prmText .= "`nResearch: search>verify>synthesize>cite"
    prmText .= "`nAnalysis: evidence>compare>conclude>recommend"
    prmText .= "`nWriting: audience>purpose>draft>refine>verify"
    prmText .= "`nUse only what is relevant."

    prmText .= "`n`nOUTPUT"
    prmText .= "`nReturn ONLY the final optimized prompt inside one Markdown code block."
    prmText .= "`nDo not execute the original task."
    prmText .= "`nNo explanation before or after the code block."

    PasteText(prmText)
}
; =========================================================
; HOTSTRING: wpp
; Context-Aware Coding / Agent Prompt Compiler
; AutoHotkey v2
; =========================================================

::wpp::
{
    target := InputBox(
        "Target coding agent / environment:`n`nExamples: GitHub Copilot, Codex, Claude Code, Gemini, Hermes, VS Code.`n`nLeave blank if already clear from the conversation.",
        "WPP - Target"
    )

    if target.Result != "OK"
        return

    targetValue := Trim(target.Value)
    if targetValue = ""
        targetValue := "Use the current coding agent/environment."

    wpptxt := "Act as a senior Coding-Agent Prompt Engineer and Multi-Agent Execution Orchestrator."

    wpptxt .= "`n`nSOURCE TASK"
    wpptxt .= "`nUse the implementation task, requirements, bugs, desired deliverables, project context, constraints, files, reports, and discussion I provided immediately BEFORE this message."
    wpptxt .= "`nTreat the preceding conversation as the authoritative task specification."
    wpptxt .= "`nDo not ask me to repeat information already provided."

    wpptxt .= "`n`nTARGET"
    wpptxt .= "`n" targetValue

    wpptxt .= "`n`nCOMPILE"
    wpptxt .= "`nConvert the preceding task into ONE concise execution prompt for one primary implementation agent."
    wpptxt .= "`nDo not execute the implementation yourself."

    wpptxt .= "`n`nADAPT INTERNALLY"
    wpptxt .= "`nInfer:"
    wpptxt .= "`n- model/agent capabilities;"
    wpptxt .= "`n- repository/project type;"
    wpptxt .= "`n- task complexity and dependencies;"
    wpptxt .= "`n- available tools, terminal, filesystem, Git, CI/CD, web, MCP, APIs, skills, plugins, and subagents;"
    wpptxt .= "`n- appropriate autonomy;"
    wpptxt .= "`n- required validation, Git workflow, and delivery method."
    wpptxt .= "`nDo not ask me to specify information the agent can discover itself."

    wpptxt .= "`n`nPRIMARY AGENT"
    wpptxt .= "`n- Give one primary agent end-to-end ownership."
    wpptxt .= "`n- It owns discovery, planning, implementation, delegation, integration, validation, and delivery."
    wpptxt .= "`n- Use specialist subagents only when they materially improve speed, quality, isolation, or independent verification."
    wpptxt .= "`n- Parallelize safe independent work when supported."
    wpptxt .= "`n- The primary agent must verify delegated results and own the final state."

    wpptxt .= "`n`nEXECUTION DEFAULT"
    wpptxt .= "`ninspect>understand>check_existing>plan_briefly>delegate?>implement>verify>integrate>deliver"

    wpptxt .= "`n`nRULES"
    wpptxt .= "`n- Preserve every material requirement from the preceding task."
    wpptxt .= "`n- Do not invent requirements."
    wpptxt .= "`n- Inspect relevant repository instructions, code, docs, Git state, branches, PRs, tests, and existing work before editing."
    wpptxt .= "`n- Detect work already complete, partial, duplicated, superseded, or blocked."
    wpptxt .= "`n- Continue valid existing work rather than recreating it."
    wpptxt .= "`n- Modify only necessary files."
    wpptxt .= "`n- Preserve unrelated and uncommitted user work."
    wpptxt .= "`n- Follow existing architecture, project governance, security, infrastructure, and repository rules."
    wpptxt .= "`n- Never expose secrets or weaken controls merely to make something pass."
    wpptxt .= "`n- Choose useful tools, skills, plugins, MCP services, subagents, and execution methods automatically."
    wpptxt .= "`n- Use safe supported fallbacks when preferred capabilities fail or are unavailable."
    wpptxt .= "`n- Resolve discoverable details independently."
    wpptxt .= "`n- Ask the user only when a genuine permission, credential, governance, safety, or non-discoverable blocker prevents progress."
    wpptxt .= "`n- Run focused relevant validation first; broaden when justified."
    wpptxt .= "`n- Verify actual files, behavior, artifacts, tests, UI, and final diff rather than trusting success messages."
    wpptxt .= "`n- Follow Git/branch/commit/PR/work-item workflow when relevant and permitted."
    wpptxt .= "`n- Continue until the requested deliverables are verified or a genuine blocker remains."

    wpptxt .= "`n`nPROMPT OPTIMIZATION"
    wpptxt .= "`n- Adapt specifically to the target coding agent."
    wpptxt .= "`n- Optimize execution reliability per token."
    wpptxt .= "`n- Prefer compact imperative structure."
    wpptxt .= "`n- Use only relevant sections."
    wpptxt .= "`n- Preferred compact structure: GOAL | CONTEXT | RULES | EXEC | VERIFY | DELIVER."
    wpptxt .= "`n- Use terse bullets, key=value, or workflow notation when the target handles them reliably."
    wpptxt .= "`n- Remove repeated governance language, unnecessary personas, narration, and filler."
    wpptxt .= "`n- Do not use cryptic encodings or custom DSLs unless the target explicitly supports them."

    wpptxt .= "`n`nFINAL REPORT"
    wpptxt .= "`nWhen relevant require only:"
    wpptxt .= "`nstatus | changes | validation | git/PR | blockers | next"
    wpptxt .= "`nNo large logs or repeated context."

    wpptxt .= "`n`nOUTPUT"
    wpptxt .= "`nReturn ONLY the final optimized execution prompt inside one Markdown code block."
    wpptxt .= "`nDo not execute the original task."
    wpptxt .= "`nNo commentary before or after the code block."

    PasteText(wpptxt)
}
```
