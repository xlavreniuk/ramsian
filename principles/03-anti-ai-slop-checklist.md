# Principle 3: Anti-AI-Slop Checklist

Before completing any frontend component or view, verify against this 10-point checklist:

---

## 🛑 The 10 Strict Anti-AI-Slop Rules

| # | Anti-Pattern | Rule to Enforce |
|---|---|---|
| **1** | **Nested Card Frames** | Never put gray cards inside white cards inside outer card frames. |
| **2** | **Screaming Uppercase Labels** | Replace `1. CONTACT DETAILS` or `POPULAR DESTINATIONS` with title case (`Your Details`). |
| **3** | **Solid White Input Cutouts** | Use `!bg-transparent` in search capsules so inputs never show a solid white rectangle over hover fills. |
| **4** | **Outer Capsule Padding** | Set `p-0` on search capsule forms so segment hover fills cover 100% of the capsule height. |
| **5** | **Duplicated Subtitles** | Never repeat title on the right side of the same row (e.g. `Haircut · Haircut`). |
| **6** | **Heavy Multi-Border Divides** | Avoid stacked `border-t` and `border-b` around floating popups or menus. |
| **7** | **Exaggerated Font Weights** | Avoid `font-black` (900) or `font-extrabold` (800) in headings; use clean `font-semibold` (600). |
| **8** | **Boxed Accordions** | Prefer borderless Apple-style divider accordions (`divide-y divide-[#ECECEC]`) over individual floating cards. |
| **9** | **Mobile Scroll Jitter** | Always use `[transform:translateZ(0)]` on sticky and fixed backdrop-blur headers. |
| **10** | **Artificial Card Spacing** | Avoid forced equal-height grid cards with awkward blank space; use natural height list rows. |
