# Reliability workflow

- When a build, runtime, integration, or UI error is reported or encountered, investigate the failing behavior and make a focused fix when the cause is clear; do not stop at diagnosis alone.
- For cross-area issues, use the `reliability-coordinator` agent. For a contained issue, use the matching specialist agent and review its changes.
- Reproduce the issue when practical, preserve unrelated behavior, and run the relevant checks. At minimum, run `npm run build` after code changes.
- Report the cause, files changed, checks run, and any remaining uncertainty. Never claim an error is fixed unless the relevant check passed.
- Workspace agents run when invoked; they do not continuously monitor the app or repair errors in the background.
