# Principle 8: Interaction Polish Recipes (Emil Kowalski Standards)

This guide documents the micro-interactions that elevate software from "functional" to "delightful".

---

## 1. The Responsive Button Press (`active:scale`)

Buttons must acknowledge the tap on `pointerdown`, not after release:

```tsx
// React + Tailwind
<button className="h-9 px-4 rounded-full bg-[#111827] text-white text-xs font-medium transition-transform duration-100 ease-out active:scale-[0.97] select-none cursor-pointer shadow-2xs">
  Confirm Appointment
</button>
```

---

## 2. Sliding Active Pill (Shared Layout Indicator)

When switching tabs or segmented filters, animate a background pill using `layoutId`:

```tsx
import { motion } from "motion/react";

export function SegmentedControl({ options, active, onChange }: { options: string[]; active: string; onChange: (val: string) => void }) {
  return (
    <div className="flex bg-[#F7F7F8] p-1 rounded-full border border-[#ECECEC]">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-colors z-10 select-none ${
            active === opt ? "text-[#111827]" : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          {active === opt && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white rounded-full shadow-2xs -z-10"
              transition={{ type: "spring", stiffness: 480, damping: 34 }}
            />
          )}
          <span>{opt}</span>
        </button>
      ))}
    </div>
  );
}
```

---

## 3. Popover Scaling from Trigger (`transform-origin`)

Dropdowns should scale directly from the button that spawned them:

```tsx
<div 
  className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-1 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-100"
>
  {/* Menu Items */}
</div>
```

---

## 4. Modal Dialog Entrance

Modals stay centered, starting from `scale(0.95)` with a backdrop blur fade:

```tsx
<div className="fixed inset-0 z-50 bg-[#111827]/40 backdrop-blur-xs flex items-center justify-center p-4">
  <div className="bg-[#FFFFFF] w-full max-w-md p-6 rounded-2xl border border-[#E5E7EB] shadow-[0_12px_36px_rgba(0,0,0,0.12)] space-y-4 animate-in fade-in zoom-in-95 duration-150 text-left">
    {/* Dialog Content */}
  </div>
</div>
```
