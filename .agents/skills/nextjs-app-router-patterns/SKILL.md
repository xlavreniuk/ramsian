---
name: nextjs-app-router-patterns
description: Next.js App Router best practices, Server/Client component boundary rules, dynamic imports, SEO metadata, and bundle optimization in RezerveHere.
---

# Next.js App Router Patterns for RezerveHere

## 1. Server vs Client Boundaries
- **Server Components (Default)**: Use for static landing pages, pricing cards, sitemaps, and initial layouts. Keep them asynchronous without `"use client"`.
- **Client Components (`"use client"`)**: Use only when interactive React hooks (`useState`, `useEffect`, `useCallback`, `useRef`), browser APIs (`window`, `localStorage`, `navigator.geolocation`), or motion animations (`motion/react`) are strictly required.
- Keep Client Component leaves small — push `"use client"` as far down the component tree as possible.

## 2. Dynamic Component Lazy-Loading
Non-critical modals or heavyweight third-party widgets must be loaded dynamically with `ssr: false` to minimize initial JavaScript bundle size and optimize First Contentful Paint (FCP):
```tsx
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("@/components/AuthModal"), { ssr: false });
const RoleSelectionModal = dynamic(() => import("@/components/RoleSelectionModal"), { ssr: false });
const GoogleMapView = dynamic(() => import("@/components/GoogleMapView"), { ssr: false });
```

## 3. Hydration & State Rules
- Never access `window`, `localStorage`, or `document` during the initial render phase.
- Gate browser-specific values behind `useEffect` or `useSyncExternalStore` to avoid SSR hydration mismatches.

## 4. Performance & Core Web Vitals
- **Hero Image Preloading**: Top viewport hero images must specify `loading="eager"`, `fetchPriority="high"`, and proper `sizes` attribute.
- **Unsplash Optimization**: Always append `w=480&q=75&auto=format` (or `w=800` for hero) on Unsplash CDN images to serve lightweight WebP assets.
- **Font Optimization**: Use `next/font/google` or `next/font/local` with `display: 'swap'` and preload configuration in `layout.tsx`.

## 5. Route Handlers & Edge Caching
- Set explicit `Cache-Control` headers on public feeds or iCal endpoints (`s-maxage=300, stale-while-revalidate=600`).
- Apply rate limiting via `src/utils/rateLimit.ts` on all paid or state-modifying API routes.
