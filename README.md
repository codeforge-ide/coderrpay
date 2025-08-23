# CoderrPay

CoderrPay is a modern Next.js application that provides a marketplace and collaboration platform for developers, projects, organizations, and grant-style bounties. It combines traditional OAuth and optional Web3-driven authentication options while using Appwrite for core backend services (database, storage, and sessions).


## Authentication model

- Appwrite-centric: Appwrite is used for persistence and is expected to manage user records and sessions.
- Pluggable auth frontends:
  - Email / password / Appwrite OAuth flows are supported via Appwrite SDK and existing UI.
  - Civic (GitHub + embedded Web3 wallet) is an optional, modular integration; enable with `NEXT_PUBLIC_INTEGRATION_CIVIC=true`.
  - A fallback integration allows running without Civic while keeping the same user-facing UX.

> Note: Some server-side glue (custom auth token exchange between Civic and Appwrite, secure JWT minting) is scaffolded but requires secret configuration and Appwrite server SDK usage to complete.

## Environment & configuration

- Example env variables (see `env.sample`):
  - `NEXT_PUBLIC_INTEGRATION_CIVIC` — "true" to enable Civic integration UI/features
  - `NEXT_PUBLIC_CIVIC_CLIENT_ID` — Civic client id for OAuth flows (client-side)
  - `NEXT_PUBLIC_WEB3_WALLET_URL` — optional external wallet popup provider for fallback flows
  - `NEXT_PUBLIC_APPWRITE_ENDPOINT` — Appwrite API endpoint
  - `NEXT_PUBLIC_APPWRITE_PROJECT_ID` — Appwrite project identifier
  - `APPWRITE_API_KEY` — server-side secret for Appwrite (do not expose in client)

Local dev:
- Copy `env.sample` to `.env.local` and fill in the values required by your environment.
- Civic and Web3 features are optional; set `NEXT_PUBLIC_INTEGRATION_CIVIC` to "false" to disable them during local development if you don't have credentials.

## Development workflow

- Install dependencies:
  - Run `npm install`.
  - If enabling Civic/Web3 features, install additional packages such as `@civic/auth-web3`, `wagmi`, `viem`, and `@tanstack/react-query`.
- Start development server:
  - `npm run dev`
  - Open http://localhost:3000
- Linting & type checks:
  - Run `npm run build` / `tsc` to validate types
  - Run ESLint if configured: `npm run lint`

## Testing and validation

- Test authentication flows with and without Civic enabled.
- With Civic disabled, verify Appwrite email/OAuth and fallback wallet flows.
- With Civic enabled, confirm the UI surfaces and (once configured) the Civic redirect/callback flows to the Next.js auth route.
- Protect routes by using `ProtectedRoute` or checking the auth context in server components where required.

## Notes, caveats, and TODOs

- Civic integration is modular: enabling it requires installing additional SDKs and configuring secrets. The codebase contains scaffolding and docs (`CIVIC_INTEGRATION.md`) but runtime wiring—particularly server-side token exchange to mint Appwrite sessions—requires secure server credentials.
- The Appwrite custom-auth bridging functions are present as scaffolds. Production deployment should ensure server-side secrets (Appwrite API keys) are present only on the server and never committed.
- The project includes legacy static templates under `stitch/`. These are useful for migration or quick previews but the preferred runtime is the React + Next app router in `src/app`.
- Keep environment-specific flags (`NEXT_PUBLIC_*`) set appropriately in production to avoid accidentally enabling integrations that are not ready or not configured.

## Where to find things quickly

- Home page and app entry: `src/app/page.tsx`
- Main layout & theme: `src/app/layout.tsx`, `src/theme.ts`, `src/components/Layout.tsx`
- Authentication UI: `src/components/AuthDrawer.tsx`, `src/integrations/IntegrationAuthButtons.tsx`
- Civic integration code (optional): `src/integrations/civic`
- Appwrite bridge and utilities: `src/integrations/appwrite`
- Global contexts: `src/contexts/AuthContext.tsx`
- Store hooks: `src/store/useAppStore.ts`, `src/store/useThemeStore.ts`

## Completion summary

This README provides an overview of CoderrPay's goals, architecture, key files, and operational notes. It emphasizes the Appwrite-first backend, a pluggable Civic/Web3 integration, and where to configure and test the project. For integration-specific details, see `CIVIC_INTEGRATION.md` and source under `src/integrations/`.
