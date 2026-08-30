# Principle 1: The Single-Surface Architecture

## What is Container-in-Container Nesting?
A common anti-pattern in AI-generated frontend code is creating excessive layers of boxed cards:
1. Gray background page (`bg-gray-100`)
2. White card container (`bg-white rounded-3xl border p-8`)
3. Gray nested card for details (`bg-gray-50 rounded-2xl border p-4`)
4. White input card inside the gray card (`bg-white rounded-xl border p-3`)

This produces visual noise, claustrophobic margins, and heavy borders.

---

## The Single-Surface Solution
1. **Elevate to Pure `#FFFFFF` Canvas**: The entire page rests on pure `#FFFFFF`.
2. **Use Subtle Dividers Instead of Boxes**: Separate sections using `divide-y divide-[#ECECEC]` or `border-t border-[#ECECEC]`.
3. **Negative-Margin Hover Fills**: Interactive rows should expand horizontally into the padding on hover (`-mx-3 sm:-mx-4 px-3 sm:px-4 hover:bg-[#F7F7F8] rounded-2xl`).

---

## Code Example

```tsx
// ❌ AI-Slop Boxed Card Nesting
<div className="bg-[#F7F7F8] min-h-screen p-8">
  <div className="bg-white rounded-3xl border border-gray-200 p-6">
    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
      <div className="bg-white rounded-xl border p-2">Item 1</div>
    </div>
  </div>
</div>

// ✅ Single-Surface Standard
<main className="bg-[#FFFFFF] min-h-screen max-w-4xl mx-auto px-6 py-12">
  <h1 className="font-semibold text-2xl text-[#111827]">Available Services</h1>
  <div className="divide-y divide-[#ECECEC] border-t border-b border-[#ECECEC] mt-4">
    <div className="group py-4 px-4 -mx-4 rounded-2xl hover:bg-[#F7F7F8] transition-colors flex justify-between items-center">
      <span>Signature Treatment</span>
      <button className="h-8.5 px-4 rounded-full bg-[#111827] text-white text-xs font-medium">Select</button>
    </div>
  </div>
</main>
```
