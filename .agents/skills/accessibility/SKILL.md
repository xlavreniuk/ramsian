---
name: accessibility
description: Accessibility (a11y) standards, WCAG 2.1 AA compliance, keyboard navigation, ARIA attributes, and screen reader optimization for RezerveHere.
---

# Accessibility (a11y) & WCAG 2.1 AA Guidelines for RezerveHere

## 1. Keyboard Navigation
All interactive custom elements must be fully operable via keyboard:
- **Search Island & Capsule**: `Tab` cycles through input fields; `Escape` closes expanded popovers; `Enter` executes search.
- **Time Range Slider**: `ArrowLeft` / `ArrowRight` increments or decrements active range; `Home` / `End` jumps to first or last step.
- **Modals & Dialogs**: Traps focus inside modal while open; `Escape` closes modal; returns focus to trigger button upon close.
- **Dropdowns & Tabs**: `Arrow` keys move between tabs; `Enter` or `Space` selects tab.

## 2. Screen Reader Labels & ARIA
Icon-only buttons and graphical controls must always provide accessible text:
```tsx
// ❌ WRONG: Inaccessible to screen readers
<button onClick={handlePrev}><ChevronLeft className="w-4 h-4" /></button>

// ✅ CORRECT: Explicit aria-label and title
<button 
  onClick={handlePrev} 
  aria-label="Previous time range" 
  title="Previous Range"
>
  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
</button>
```

## 3. High-Contrast Focus Rings
Never remove the default browser focus ring without providing a custom high-contrast replacement:
```css
/* Tailwind high-contrast focus ring */
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2
```

## 4. Contrast Ratios & Visual Independence
- Maintain at least **4.5:1** contrast ratio for standard body text and **3:1** for large text (18pt+) and UI borders against `#FFFFFF` / `#F7F7F8` backgrounds.
- High-contrast secondary text token: `#4B5563` or `#6B7280` on pure white `#FFFFFF`.
- Never rely on color alone to convey critical state — pair color with an icon or descriptive label (e.g. `✓ Active` or `✕ Error`).

## 5. Reduced Motion Support
Respect OS-level `prefers-reduced-motion` settings. Disable or shorten physics-based spring animations when motion reduction is requested:
```tsx
import { useReducedMotion } from "motion/react";

const shouldReduceMotion = useReducedMotion();

<motion.div
  transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 450, damping: 32 }}
/>
```
