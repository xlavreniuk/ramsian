# Rezervehere — Design System Reference
> Canonical source of truth for all UI. Every page and component must conform.
> Last updated: 2026-08-01

---

## Aesthetic Thesis
**"Clean Airbnb scale — editorial whitespace, high contrast `#111827` on white, Figtree font, zero decorative gradients."**

---

## 1. Color Palette

| Token | Value | Usage |
|---|---|---|
| Background | `#FFFFFF` | Page root, cards, inputs |
| Surface alt | `#F7F7F8` | Hover backgrounds, input bg, category pills |
| Border default | `#E5E7EB` | All borders |
| Border subtle | `#ECECEC` | Header border |
| Border hover | `#D1D5DB` | Hovered borders |
| Foreground | `#111827` | All primary text, buttons, icons |
| Muted | `#6B7280` | Subtitles, placeholders, secondary labels |
| Lighter muted | `#9CA3AF` | Disabled, tertiary metadata |
| Success | `#16A34A` / `emerald-*` | Success states only — not brand |
| Error | `#DC2626` / `red-*` | Error states / inline validation — not brand |
| **BANNED** | ~~`indigo-*`~~ | Replaced with `#111827` / `#262626` |
| **BANNED** | ~~`slate-*`~~ | Use explicit hex tokens instead |

---

## 2. Typography — Figtree (`font-sans`)

Loaded via `next/font/google` with `display: swap` in `layout.tsx`.

| Role | Classes |
|---|---|
| Page H1 | `text-2xl md:text-3xl font-extrabold tracking-tight text-[#111827]` |
| Section heading | `text-lg font-bold text-[#111827]` |
| Card title | `text-xs sm:text-sm font-bold text-[#111827] truncate` |
| Form label | `text-xs font-bold text-[#6B7280] uppercase tracking-wider` |
| Body / meta | `text-xs font-medium text-[#6B7280]` |
| Badge / pill text | `text-[10px] font-bold uppercase tracking-wider` |

---

## 3. Logo & Branding

**Brand name:** `Rezervehere` (capital R, rest lowercase everywhere)

**Header logo markup (all pages):**
```tsx
<Link href="/" className="flex items-center gap-1.5 select-none shrink-0">
  <img src="/logo.svg" alt="rezervehere" className="h-6 w-auto" />
  <span className="font-medium text-xl md:text-2xl text-[#111827] select-none tracking-tight">
    rezervehere
  </span>
</Link>
```

**Rules:**
- SVG icon: `h-6 w-auto` (do not use `h-8` or `h-9`)
- Text: `font-medium` (NOT `font-black` or `font-extrabold`)
- Gap between icon and text: `gap-1.5`
- Text always lowercase: `rezervehere`
- On mobile: same markup, both elements visible
- In AuthModal/AuthForm: same markup, `justify-center`
- Favicon: `src/app/icon.tsx` renders SVG paths via `next/og`

---

## 4. Header / Nav

```tsx
<header className="px-6 md:px-12 border-b border-[#ECECEC] bg-[#FFFFFF] sticky top-0 z-50 flex items-center h-16 shadow-xs">
  <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4">
    {/* Logo — always exact markup from section 3 */}

    {/* Right side */}
    <div className="flex items-center gap-3 shrink-0">
      {/* Primary CTA */}
      <Link href="..." className="h-9 px-4 rounded-full bg-[#111827] text-white font-semibold text-xs hover:bg-[#262626] flex items-center gap-1.5 transition-colors">
        Action
      </Link>
      {/* Ghost / secondary */}
      <Link href="..." className="h-9 px-4 rounded-full text-xs font-semibold bg-[#F7F7F8] hover:bg-[#ECECEC] text-[#111827] border border-[#E5E7EB] flex items-center gap-1.5 transition-colors">
        Secondary
      </Link>
    </div>
  </div>
</header>
```

**Rules:**
- Height: `h-16` always (main page uses `h-20` → shrinks to `h-16` on scroll)
- `bg-[#FFFFFF]` — never translucent (`bg-white/90` is banned)
- No `backdrop-blur-*` on headers
- No `indigo-*` anywhere in nav

---

## 5. Buttons

| Type | Classes |
|---|---|
| Primary (filled dark) | `h-9 px-4 rounded-full bg-[#111827] text-white font-semibold text-xs hover:bg-[#262626] transition-colors` |
| Primary large (form submit) | `w-full h-[46px] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors` + `style={{ backgroundColor: "#111827", color: "#ffffff" }}` |
| Secondary (ghost) | `h-9 px-4 rounded-full bg-[#F7F7F8] hover:bg-[#ECECEC] text-[#111827] border border-[#E5E7EB] text-xs font-semibold` |
| Back / tertiary | `h-[38px] px-4 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280] hover:text-[#111827] text-sm font-semibold flex items-center gap-1.5` |

**Note on large form submit buttons:** Use inline `style` to guarantee dark fill — Tailwind's `bg-[#111827]` can lose to browser UA stylesheet `button { background-color: buttonface }`.

---

## 6. Form Inputs

```tsx
<label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">
  Field Label
</label>
<input
  className={`w-full h-[46px] px-4 rounded-xl border text-sm font-medium text-[#111827]
    placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 transition-all ${
    hasError
      ? "border-red-400 bg-red-50 focus:ring-red-400"
      : "border-[#E5E7EB] bg-[#F7F7F8] focus:ring-[#111827]"
  }`}
/>
{hasError && <p className="text-[11px] text-red-500 font-semibold mt-1">{errorMsg}</p>}
```

- Focus ring: `focus:ring-[#111827]` — never `focus:ring-indigo-*`
- Input bg: `bg-[#F7F7F8]` — never `bg-slate-50`
- Border: `border-[#E5E7EB]` — never `border-slate-200`
- Error state: border + bg + ring all red (`red-400`, `red-50`)

---

## 7. Auth UI (AuthForm + AuthModal)

`AuthForm` is the single source of truth for all auth UI. Used in both modal and `/login` page.

```tsx
// Modal usage
<AuthModal onClose={() => setShowAuthModal(false)} />

// Page usage (login/page.tsx)
<AuthForm />  // no onClose prop needed
```

**AuthModal dimensions:** `w-[440px] h-[440px]` square, `rounded-2xl`, `shadow-xl`, `overflow-y-auto`

**Turnstile:** Renders automatically when `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` is set. Gates the Continue button.

---

## 8. Cards

```tsx
<div className="group flex flex-col space-y-2 cursor-pointer select-none">
  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-[#F7F7F8]">
    <img className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
  </div>
  <div className="space-y-0.5 px-0.5">
    <h3 className="text-xs sm:text-sm font-bold truncate text-[#111827]" />
    <p className="text-[11px] text-[#6B7280] truncate" />
  </div>
</div>
```

---

## 9. Form Section Panels

```tsx
<div className="space-y-4 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E7EB]">
  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111827] border-b border-[#E5E7EB] pb-2">
    Section Title
  </h3>
</div>
```

---

## 10. Alerts / Status Banners

```tsx
{/* Error */}
<div className="p-3 text-xs font-semibold rounded-xl bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
  <span>{msg}</span>
</div>
{/* Success */}
<div className="p-3 text-xs font-semibold rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2">
  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
  <span>{msg}</span>
</div>
```

---

## 11. Page Layout Wrapper

```tsx
<div className="min-h-screen bg-[#FFFFFF] text-[#111827] font-sans flex flex-col">
  <header>...</header>
  <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 py-8">
    ...
  </main>
  <footer>...</footer>
</div>
```

---

## 12. Loading / Spinner States

```tsx
<main className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] text-[#111827]">
  <Loader2 className="h-6 w-6 animate-spin text-[#111827]" />
  <p className="text-xs text-[#9CA3AF] font-semibold">Loading...</p>
</main>
```

Spinner color: `text-[#111827]` — never `text-indigo-600`

---

## 13. Badge / Pill Components

```tsx
{/* Neutral */}
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F7F7F8] border border-[#E5E7EB] text-[10px] font-bold text-[#6B7280]">Label</span>
{/* Success */}
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">Active</span>
{/* Dark promo */}
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#111827] text-[10px] font-bold text-white">−20%</span>
```

---

## 14. Banned Patterns — Full Replacement Table

| Banned | Replace with |
|---|---|
| `bg-slate-50` | `bg-[#F7F7F8]` |
| `bg-slate-100` | `bg-[#F3F4F6]` |
| `border-slate-200` | `border-[#E5E7EB]` |
| `border-slate-100` | `border-[#F3F4F6]` |
| `text-slate-900` / `text-slate-800` | `text-[#111827]` |
| `text-slate-700` / `text-slate-600` | `text-[#6B7280]` |
| `text-slate-500` / `text-slate-400` | `text-[#9CA3AF]` |
| `bg-indigo-600` | `bg-[#111827]` |
| `hover:bg-indigo-700` | `hover:bg-[#262626]` |
| `text-indigo-600` / `text-indigo-700` | `text-[#111827]` |
| `bg-indigo-50` / `bg-indigo-50/50` | `bg-[#F7F7F8]` |
| `border-indigo-100` / `border-indigo-200` | `border-[#E5E7EB]` |
| `fill-indigo-600` | `fill-[#111827]` |
| `focus:ring-indigo-600` / `focus:ring-indigo-500` | `focus:ring-[#111827]` |
| `shadow-indigo-200` | remove |
| `bg-white/90 backdrop-blur-md` | `bg-[#FFFFFF]` |
| `rounded-lg` (buttons) | `rounded-full` (nav) or `rounded-xl` (forms) |
| `font-black text-2xl` (logo text) | `font-medium text-xl md:text-2xl` |
| Logo as text-only string | `<img src="/logo.svg" h-6 w-auto> + <span>rezervehere</span>` |
