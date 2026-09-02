# Principle 3: Anti-AI-Slop Checklist

Before completing any frontend component or view, verify against this 10-point checklist:

---

## 🛑 The Strict Anti-AI-Slop Rules

| # | Anti-Pattern | Rule to Enforce |
|---|---|---|
| **1** | **Nested Card Frames** | Never put gray cards inside white cards inside outer card frames. |
| **2** | **Gimmicky Status Badges** | Never add fake "Engine Ready", pulsing green dots, or "AI Powered" badges. |
| **3** | **Cheesy Jargon / Slop Text** | Avoid marketing fluff like "Live Radar & Lead Intelligence", "Radar Idle". Use clean labels (`Scan`, `City`, `Market Overview`). |
| **4** | **Boxed Metric Tiles** | Never put 4 separate gray cards side-by-side for numbers. Use a single flat divider row (`py-4 border-t border-b border-[#ECECEC]`). |
| **5** | **Screaming Uppercase Labels** | Replace `1. CONTACT DETAILS` or `POPULAR DESTINATIONS` with sentence/title case (`Your details`). |
| **6** | **Solid White Input Cutouts** | Use `!bg-transparent` in search capsules so inputs never show a solid white rectangle over hover fills. |
| **7** | **Outer Capsule Padding** | Set `p-0` on search capsule forms so segment hover fills cover 100% of the capsule height. |
| **8** | **Duplicated Subtitles** | Never repeat title on the right side of the same row (e.g. `Haircut · Haircut`). |
| **9** | **Heavy Multi-Border Divides** | Avoid stacked `border-t` and `border-b` around floating popups or menus. |
| **10** | **Nested Accordion Cards** | Sub-items and details expand into flat borderless divider lines (`divide-y divide-[#ECECEC]`), never inner boxed cards. |
| **11** | **Exaggerated Font Weights** | Avoid `font-black` (900) or `font-extrabold` (800) in headings; use clean `font-semibold` (600). |
| **12** | **Mobile Scroll Jitter** | Always use `[transform:translateZ(0)]` on sticky and fixed backdrop-blur headers. |
