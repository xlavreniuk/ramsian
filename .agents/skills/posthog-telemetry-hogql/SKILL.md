---
name: posthog-telemetry-hogql
description: PostHog HogQL querying, telemetry ingestion, custom funnel events, Web Vitals monitoring, and rage click analytics for RezerveHere.
---

# PostHog Telemetry & HogQL Guidelines for RezerveHere

## 1. HogQL Query Construction
When querying PostHog via the `/api/admin/data` route handler, always parameterize intervals and use HogQL aggregation primitives:
```sql
-- Pageview totals and unique visitor counts
SELECT 
  count() as total_events, 
  count(CASE WHEN event = '$pageview' THEN 1 END) as views, 
  count(DISTINCT distinct_id) as visitors 
FROM events 
WHERE timestamp >= now() - INTERVAL {intervalDays} DAY;

-- Daily trend breakdown
SELECT 
  toDate(timestamp) as day, 
  count(CASE WHEN event = '$pageview' THEN 1 END) as views, 
  count(DISTINCT distinct_id) as visitors 
FROM events 
WHERE timestamp >= now() - INTERVAL {intervalDays} DAY 
GROUP BY day 
ORDER BY day ASC;
```

## 2. Standard Event Names
Use consistent naming conventions for custom tracking across `rezervehere`:
- `$pageview` / `$pageleave` — standard PostHog web navigation.
- `salon_card_clicked` — user opened a salon preview or detail page.
- `service_selected` — user added a service to booking intent.
- `booking_slot_picked` — user selected a calendar day/time.
- `checkout_initiated` — user clicked Stripe checkout button.
- `booking_confirmed` — successful payment / appointment creation.
- `rageclick` — auto-detected repeated frustrated clicks on UI elements.
- `$web_vitals` — Core Web Vitals captures (LCP, FID/INP, CLS).

## 3. Privacy & Sensitive Field Sanitization
- Never pass cleartext passwords, OTP tokens, or full credit card numbers to `posthog.capture()` or `posthog.identify()`.
- Identify users by their Supabase UUID (`auth.uid()`) and pass safe user properties (`account_role`, `created_at`, `email`).

## 4. Error Handling & Circuit Breaking
- Wrap PostHog HogQL API calls in resilient `try/catch` blocks.
- If PostHog API keys are not configured or rate-limited, fall back smoothly to empty datasets without crashing the `/admin` console or user dashboards.
