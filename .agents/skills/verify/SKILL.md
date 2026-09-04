---
name: verify
description: Comprehensive pre-merge verification skill for Antigravity AI agents. Inspects specs, analyzes git diffs, executes TypeScript typechecks, lint/build validations, and verifies requirements before merging.
---

# Verify — Antigravity QA & Verification Skill

Use this skill when you need to perform final quality assurance, acceptance criteria validation, typechecking, and pre-merge verification on implemented features or bugfixes.

---

## The Verification Loop

```
┌────────────────────────────────────────────────────────┐
│ 1. Inspect Spec / Ticket Requirements                  │
│    Ensure all Acceptance Criteria (AC) are met         │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Inspect Git Diff & Untracked Files                  │
│    Verify clean modifications, no leaked secrets       │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Run Automated Static Analysis & Typechecks          │
│    `bun x tsc --noEmit` + Lint & Test execution        │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. Design System & Security Guardrails Check           │
│    No banned CSS classes, no SQL select('*'), RLS check│
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 5. Auto-Remediate Failures (if any)                    │
│    Fix any type, lint, or logic errors & re-verify     │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 6. Generate Verification Report Artifact & Merge Ready │
└────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Instructions

### Step 1: Inspect the Spec & Acceptance Criteria
- Locate the target spec or ticket in `/specs/` or prompt context.
- Verify that every stated requirement, user flow, edge case, and acceptance criterion has been explicitly addressed in code.

### Step 2: Inspect Git Diff & Hygiene
- Run `git status` and `git diff` to review all changed files.
- Ensure:
  - No unintended file modifications or left-over `.orig` / temporary scratch files.
  - No secrets, private API keys, or raw service-role tokens committed.
  - All new files are tracked and committed.

### Step 3: Run Automated Checks
Execute project commands via the Bun runtime:
1. **TypeScript Typecheck**:
   ```bash
   bun x tsc --noEmit
   ```
2. **Lint Checks**:
   ```bash
   bun run lint
   ```
3. **Automated Tests** (if test suites exist):
   ```bash
   bun test
   ```

### Step 4: Validate Project Architecture Guardrails
Check against project guidelines (defined in `AGENTS.md` and design system):
- **Brand Tokens**: Solid `#FFFFFF` backgrounds, `#111827` dark primary tokens, `#F7F7F8` fills. Zero rainbow/purple gradients or `bg-clip-text` slop.
- **Database Safety**: Explicit SQL projection columns (never `select('*')`), pagination limits, and RLS policy compliance.
- **Performance**: Dynamic image compression query parameters (`auto=format&w=480&q=75`), SVG logos, and edge caching headers on read routes.

### Step 5: Fix Failures & Loop
- If any TypeScript error, lint failure, or missing requirement is detected:
  1. Fix the error directly in the source file.
  2. Re-run `bun x tsc --noEmit` and the failing check.
  3. Repeat until all automated and functional checks pass 100% green.

### Step 6: Create Verification Summary
Create a clear verification summary for the user / team:
- ✅ Spec Requirements Satisfied
- ✅ TypeScript: 0 errors
- ✅ Git Diff & Token Hygiene: Clean
- ✅ Merge Recommendation: APPROVED
