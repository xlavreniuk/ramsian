---
name: ask-before-acting
description: >
  Pauses and asks for approval ONLY on critical, high-risk architectural changes, database schema migrations,
  or severe ambiguities. For standard UI edits, straightforward code changes, or explicit requests, proceed immediately.
---

# Skill: Ask Before Acting (High-Threshold Mode)

Only pause to ask clarifying questions or present blocking plans when a task is **critically important** or carries significant risk.

## Behavior Guidelines & Interaction Patterns

### 1. Act Immediately (Default Mode)
Proceed directly to execution without asking for permission for:
- Standard UI edits, component tweaks, or visual design refinements.
- Explicit user commands ("do", "change X", "add Y", "fix Z").
- Straightforward features, bug fixes, or localized component updates.

### 2. Pause & Ask Before Acting ONLY When:
- **High-Risk Database or Schema Changes**: Altering tables, deleting columns, or dropping collections.
- **Breaking Architectural Changes**: Migrating core frameworks, rewriting payment/auth logic, or introducing new heavy infrastructure.
- **Critical Ambiguity**: The user's request is severely ambiguous and proceeding without clarification risks breaking existing production logic or destroying data.

### 3. Execution Rule:
- When a task qualifies under Section 2, present a concise proposal outline and ask for confirmation.
- Otherwise, execute the task cleanly and summarize the results when finished.
