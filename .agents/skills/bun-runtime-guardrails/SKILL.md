---
name: bun-runtime-guardrails
description: Bun runtime quirks, package manager commands, lockfile management, testing, and native Bun APIs in RezerveHere.
---

# Bun Runtime & Toolchain Guardrails for RezerveHere

## 1. Toolchain & Command Directives
- **Runtime**: Always execute scripts and tasks via **Bun**.
  - Package installation: `bun add <pkg>`, `bun add -d <pkg>`
  - Package removal: `bun remove <pkg>`
  - Lockfile management: Bun v1.2+ uses text-based `bun.lock`. Never commit `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`.
  - Development server: `bun dev` (Next.js with Turbopack).
  - Typecheck: `bun x tsc --noEmit`.
  - Linting: `bun run lint`.
  - Testing: `bun test` (native test runner).
  - Scripts: `bun scripts/<name>.mjs` or `bun scripts/<name>.ts`.
- **Strict Prohibition**: Never run `npm`, `yarn`, `pnpm`, or `npx` directly.

## 2. Module Resolution & TypeScript Execution
- Bun executes TypeScript natively without transpilation steps (`ts-node` or `tsx` are never needed).
- Native top-level `await` is fully supported in all `.ts` and `.mjs` files.
- Path aliases defined in `tsconfig.json` (`@/*` mapping to `./src/*`) resolve cleanly in Bun.

## 3. Native Bun APIs vs npm Packages
- Prefer native Bun built-ins when writing server scripts or internal utilities:
  - Password hashing: `await Bun.password.hash(pw)` / `await Bun.password.verify(pw, hash)`
  - Environment variables: `process.env` or `Bun.env`
  - File reading/writing: `await Bun.file(path).text()` / `await Bun.write(path, data)`
  - Hashing: `Bun.CryptoHasher` / native Web Crypto API
- For web framework code in Next.js Server Components / Route Handlers, maintain Node.js / Web standard compatibility so Vercel Edge/Serverless deployments succeed.
