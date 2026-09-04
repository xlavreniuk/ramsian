---
name: security-audit
description: Security review checklists for authentication, rate-limiting, Stripe webhook signatures, RLS verification, Cloudflare Turnstile bot defense, CORS/CSP, and input validation in RezerveHere.
---

# Security Audit & Defensive Engineering for RezerveHere

## 1. Rate Limiting Strategy & Serverless Tradeoffs
All public API endpoints that trigger third-party paid costs or database mutations must use rate limiting:
- `/api/notifications/reminders`: Max 5 requests/min per IP (protects Twilio SMS and Resend email quotas).
- `/api/stripe/checkout`: Max 10 requests/min per IP (blocks card-testing and session flooding).
- `/api/stripe/connect` & `/api/stripe/subscribe`: Max 5 requests/min per IP.
- `/api/calendar/ical`: Max 30 requests/min per IP with CDN caching (`s-maxage=300`).

> [!IMPORTANT]
> **Serverless Limitation**: `src/utils/rateLimit.ts` uses an in-memory `Map` with sliding window tracking. On serverless hosts (Vercel Lambdas), memory is isolated per lambda instance and resets on cold starts.
> **Defense-in-Depth**: In-memory rate limiting is the *first line of defense*, combined with **Cloudflare Turnstile bot verification** on all public forms to prevent automated distributed attacks. For strict global rate limits, integrate Upstash Redis.

## 2. API Contract & Schema Validation (Zod)
Never trust raw `req.json()` payloads. Always parse through strict Zod schemas at the start of Route Handlers:
```ts
import { z } from "zod";

const BookingPayloadSchema = z.object({
  salonId: z.string().uuid(),
  serviceId: z.string().uuid(),
  staffId: z.string().uuid().optional(),
  startTime: z.string().datetime(),
  guestName: z.string().min(2).max(100),
  guestEmail: z.string().email(),
  turnstileToken: z.string().min(1),
});

export async function POST(req: Request) {
  const raw = await req.json().catch(() => null);
  const parsed = BookingPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.error.format() }, { status: 400 });
  }
  const data = parsed.data;
}
```

## 3. Stripe Webhook Verification
Never trust unverified Stripe webhook payloads. Always verify signatures using raw body buffers:
```ts
const body = await req.text();
const sig = req.headers.get("stripe-signature");

let event: Stripe.Event;
try {
  event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
} catch (err: any) {
  return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
}
```

## 4. Bot Defense & Cloudflare Turnstile
Forms with OTP dispatch, public user registration, or guest booking creation must verify Cloudflare Turnstile tokens server-side before executing mutations:
```ts
const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: `secret=${process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY}&response=${token}`,
});
const outcome = await verifyRes.json();
if (!outcome.success) {
  return NextResponse.json({ error: "Invalid bot challenge token" }, { status: 403 });
}
```

## 5. Supabase Secret Isolation & RLS
- **Zero Client Leaks**: Never expose `SUPABASE_SERVICE_ROLE_KEY` to client components. Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe in public bundles.
- **Admin Verification**: Never rely on client-supplied headers (e.g. `x-admin-role: true`) for administrative routes. The server must verify user session JWT against `ADMIN_EMAILS` or verified database role metadata.

## 6. Input Validation & Body Size Caps
- Reject requests with payloads exceeding 100KB for standard endpoints.
- Sanitize user-provided strings (e.g. booking notes, salon descriptions, bug report descriptions) to prevent stored XSS or HTML injection.
