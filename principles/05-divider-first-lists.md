# Principle 5: Apple/Linear Divider-First Lists

## Why Dividers Beat Boxed Cards
Boxed cards force fixed margins and padding, creating visual fragmentation and repetitive heavy borders.

Apple and Linear instead use **Divider-First Lists**:
* A continuous block of list items separated by 1px subtle divider lines (`divide-y divide-[#ECECEC]`).
* Seamless horizontal negative margin bleed (`-mx-3 sm:-mx-4 px-3 sm:px-4`).
* On hover, individual rows light up with soft `#F7F7F8` fill without shifting surrounding layout.

---

## The Pattern

```tsx
<div className="divide-y divide-[#ECECEC] border-t border-b border-[#ECECEC]">
  {services.map((svc) => (
    <div 
      key={svc.id} 
      className="group py-4 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl hover:bg-[#F7F7F8] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="space-y-1 flex-1 text-left pr-2 sm:pr-6">
        <h3 className="font-semibold text-sm sm:text-base text-[#111827]">
          {svc.name}
        </h3>
        <p className="text-xs font-normal text-[#4B5563] leading-relaxed line-clamp-2">
          {svc.description}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
        <span className="font-semibold text-base sm:text-lg text-[#111827]">
          €{svc.price.toFixed(2)}
        </span>
        <button className="h-8.5 px-4 rounded-full bg-[#111827] hover:bg-[#262626] text-white font-medium text-xs transition-all shadow-2xs active:scale-95">
          Book
        </button>
      </div>
    </div>
  ))}
</div>
```
