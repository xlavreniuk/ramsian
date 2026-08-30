# Before vs. After: Eliminating AI Slop

This guide illustrates the visual and structural transformation when refactoring generic AI-generated code into the **Single-Surface Standard**.

---

## 1. Booking Confirmation View

### ❌ Before: Generic "AI Slop"
* **Structure**: Gray page background (`#F7F7F8`) $\to$ outer white card with heavy shadow $\to$ inner gray box for details $\to$ another inner gray box for calendar options $\to$ white buttons inside the gray box.
* **Typography**: Screaming `font-black text-3xl` and `UPPERCASE BOLD` labels.
* **Feel**: Claustrophobic, heavily framed, template-like.

```tsx
// ❌ 3 Layers of nested boxes
<div className="bg-[#F7F7F8] min-h-screen p-8 flex justify-center">
  <div className="bg-white max-w-md w-full p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
    <div className="bg-[#F7F7F8] p-5 rounded-2xl border border-gray-200 space-y-3">
      <span className="text-xs font-bold uppercase">SERVICE</span>
      <span className="font-extrabold text-sm">Men's Cut</span>
    </div>
    <div className="bg-[#F7F7F8] p-4 rounded-2xl border space-y-2">
      <span className="text-xs font-extrabold uppercase">ADD TO CALENDAR</span>
      <button className="bg-white border rounded-xl p-2 text-xs font-bold">Google</button>
    </div>
  </div>
</div>
```

---

### ✅ After: Single-Surface Standard
* **Structure**: Pure white `#FFFFFF` canvas, open centered layout, single divider list (`divide-y divide-[#ECECEC]`), rounded pill actions.
* **Typography**: Proportional `font-semibold text-2xl` heading, `font-medium` buttons, and `font-normal` metadata.
* **Feel**: Calm, spacious, Apple-quality precision.

```tsx
// ✅ Single flat surface on pure white
<main className="bg-[#FFFFFF] min-h-screen max-w-md mx-auto px-6 py-12 text-center space-y-8">
  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
    <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
  </div>

  <div className="space-y-1">
    <h1 className="font-semibold text-2xl tracking-tight text-[#111827]">Booking Confirmed!</h1>
    <p className="text-sm font-normal text-[#4B5563]">Your appointment is scheduled.</p>
  </div>

  <div className="divide-y divide-[#ECECEC] border-t border-b border-[#ECECEC] text-left text-xs">
    <div className="py-3 flex justify-between">
      <span className="text-[#6B7280]">Service</span>
      <span className="font-semibold text-[#111827]">Men's Precision Cut</span>
    </div>
    <div className="py-3 flex justify-between">
      <span className="text-[#6B7280]">Date & Time</span>
      <span className="font-medium text-[#111827]">Sat, Aug 30 at 10:00</span>
    </div>
  </div>

  <div className="flex gap-2">
    <button className="h-9 px-4 rounded-full bg-[#F7F7F8] hover:bg-[#EBECEE] border border-[#ECECEC] text-[#111827] text-xs font-medium">
      Google Calendar
    </button>
    <button className="h-9 px-4 rounded-full bg-[#F7F7F8] hover:bg-[#EBECEE] border border-[#ECECEC] text-[#111827] text-xs font-medium">
      Apple iCal
    </button>
  </div>
</main>
```
