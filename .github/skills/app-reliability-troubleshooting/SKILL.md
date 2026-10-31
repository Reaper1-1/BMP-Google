---
name: app-reliability-troubleshooting
description: "Investigate and fix application code, runtime, build, integration, or UI errors; also diagnose unexpected Copilot Chat behavior from session logs. Use when a failure needs a verified repair or a practical workaround."
argument-hint: "Describe the error, expected behavior, and steps to reproduce it."
---

# Application Reliability Troubleshooting

Use this workflow for application failures and unexpected Copilot Chat behavior. The goal is a verified repair when possible; a diagnosis alone is not a completed code-fix task.

## 1. Identify the problem area

- For a workspace code, runtime, UI, API, or build error, use the repository and supplied error details as the primary evidence.
- For unexpected Copilot Chat behavior (such as a skill not loading, a tool failing, or a slow request), use the relevant session debug logs if available. Start with the target session's `main.jsonl`; follow referenced files only when needed.
- If the supplied evidence is insufficient to identify the relevant project or reproduce a failure, ask for the smallest missing detail. Do not guess at causes.

## 2. Establish and reproduce the failure

1. Record the observed behavior, expected behavior, exact error, and reproduction steps.
2. Inspect the affected code, existing tests, and current worktree changes before editing.
3. Reproduce the failure with the narrowest applicable test or command when practical. If it cannot be reproduced, state that and continue only when the evidence still supports a safe fix.
4. For a cross-area issue, use the `reliability-coordinator` agent; for a contained UI, integration, or build issue, use the matching specialist when available.

## 3. Repair without regressions

1. Trace the error to its cause instead of treating symptoms.
2. Make a minimal complete change and preserve unrelated behavior.
3. Keep errors explicit. Do not add broad catches, silently return defaults, fake successful states, or weaken checks just to hide a failure.
4. If a direct fix is not safe or possible, describe a concrete workaround, its tradeoffs, and what remains unresolved.
5. If the first fix fails validation, continue with a distinct safe approach rather than claiming success.

## 4. Verify and report

- Re-run the reproduction or focused test that demonstrated the failure.
- Run the repository's applicable build and tests; for this project, run `npm run build` after code changes.
- Inspect the final diff and confirm unrelated user changes were preserved.
- State the root cause, files changed, checks and outcomes, and any remaining uncertainty. Do not claim a fix worked unless the relevant validation passed.
- Custom agents are invoked for a task; they do not continuously monitor the application or make background repairs.

## Copilot Chat behavior

When diagnosing a chat or customization issue from logs:

- Search the session log for the relevant request, tool failure, or customization discovery result and correlate only the events needed to explain the behavior.
- Use evidence from the logs; do not infer causality from timing alone.
- Paraphrase log evidence in the report rather than copying full entries or sensitive contents.
- If the target logs are unavailable, request the relevant session logs instead of guessing. For suspected network or authentication problems, ask the user to run **Developer: Chat Diagnostics** and share the report before drawing conclusions.
- For customization format questions, consult the official VS Code documentation for the relevant customization type.
