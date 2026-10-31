# BMP-Google repo guide

## Project overview
This repository is a Vite + React + TypeScript app for configuring and previewing a mobile app wrapper for The Better Man Project. The primary flow is: set app metadata in the configuration form, optionally auto-fill messaging using Gemini, preview the app on a phone mockup, and generate a handoff/spec view for mobile app packaging.

## Key architecture
- `App.tsx`: top-level shell and the two main views: `config` and `handoff`.
- `components/ConfigurationForm.tsx`: editable app settings (URL, name, primary color, tagline, description, platform).
- `components/PhonePreview.tsx`: phone mockup used to visualize branding and content.
- `components/MobileHandoff.tsx`: generated handoff/spec content for Natively and App Store metadata.
- `services/gemini.ts`: AI-driven copy generation using Google GenAI.
- `types.ts`: shared app config and view-mode types.
- `vite.config.ts`: Vite setup; dev server runs on port 3000 with host `0.0.0.0` and injects `GEMINI_API_KEY` into the app.

## Canonical commands
- Install dependencies: `npm install`
- Start the local app: `npm run dev`
- Production build: `npm run build`
- Preview the built app: `npm run preview`

## Environment and runtime setup
- Requires Node.js.
- Local development expects a `GEMINI_API_KEY` in `.env.local` as described in the project README.
- The app code is written to read `GEMINI_API_KEY`; `vite.config.ts` also exposes `process.env.API_KEY` for compatibility with the current code path.

## Validation workflow
- This repo does not define a dedicated lint or test script in `package.json`.
- For a focused validation after changes, use `npm run build` as the canonical project check.
- If you need a type-level check while iterating, use `npx tsc --noEmit`.
- Prefer targeted validation for the area you changed; do not run broad suites for a small UI or config update.

## Repository conventions
- Keep app state and shared types in `types.ts` and reuse the existing `AppConfig` model instead of creating ad hoc structures.
- Keep AI logic in `services/gemini.ts`; do not inline GenAI calls in UI components.
- Preserve the existing `config` vs `handoff` split in `App.tsx` unless a change specifically requires a new top-level view.
- Keep UI changes visually consistent with the current Tailwind-based styling and the existing “Natively”/mobile wrapper branding.
- When fixing a bug or regression, reproduce it before patching and verify with the relevant check (`npm run build` or a targeted TypeScript check).

## MCP / agent guidance
No repo-specific MCP server recommendation is needed for this project. Use the project’s actual toolchain and app structure rather than adding custom tooling assumptions.
