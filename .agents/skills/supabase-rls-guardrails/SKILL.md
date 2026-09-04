---
name: supabase-rls-guardrails
description: Best practices for Supabase PostgreSQL, Row-Level Security (RLS), query optimization, data privacy, and egress cost reduction in RezerveHere.
---

# Supabase & PostgreSQL RLS Guardrails for RezerveHere

## 1. Zero `select('*')` Policy
Never fetch all columns across public or authenticated tables. Always name explicit fields to minimize ingress/egress latency, prevent memory bloat, and prevent leaking sensitive data:
```ts
// ❌ WRONG: Wastes bandwidth, leaks metadata
const { data } = await supabase.from("businesses").select("*");

// ✅ CORRECT: Explicit projection
const { data } = await supabase
  .from("businesses")
  .select("id, name, slug, category, address, phone, stripe_account_id, is_active");
```

## 2. Row-Level Security (RLS) Rules
All public tables in `rezervehere` have RLS enabled:
- `profiles`: Users can read public fields, edit ONLY their own profile (`auth.uid() = id`).
- `businesses`: Anyone can read active businesses (`is_active = true`), owners can edit (`owner_id = auth.uid()`).
- `services` & `staff`: Public can read for active businesses, owners can manage.
- `bookings`: Guests can read their own bookings (`user_id = auth.uid()` or guest token), salon owners can read their salon's bookings (`business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())`).
- `bug_reports`: Anyone can insert; only administrators can select or update.

## 3. Server vs Client Supabase Client Boundary
- **Client Components**: Use standard `@/utils/supabase` client (runs in browser with user JWT).
- **Route Handlers / Admin Actions**: 
  - To verify admin rights: inspect server session and compare against `ADMIN_EMAILS` or `account_role = 'admin'`.
  - When service role key is required for super-admin telemetry or system maintenance, ensure the request has passed Turnstile and admin authentication checks first.

## 4. Query Batching & Indexing
- Never construct N+1 loops (e.g. fetching services inside a `map` of businesses).
- Batch queries via `Promise.all` or join relations:
```ts
const { data } = await supabase
  .from("businesses")
  .select("id, name, services (id, name, price, duration_minutes)")
  .eq("is_active", true);
```
- Always paginate list endpoints (`.limit(N)`, `.range(from, to)`).

## 5. Storage CDN URLs
- Always serve images/files directly via Supabase Storage public CDN URLs.
- Do not stream large binary blobs through Next.js Serverless Route Handlers.
