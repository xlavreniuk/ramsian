---
name: single-surface-design
description: Universal Apple & Linear single-surface architecture, stroke-free controls, Siri focal pickers, and fluid spring motion design system by rezervehere. Use whenever building, styling, or refactoring UI components for Web, iOS, Android, or React Native.
---

# Single-Surface Design System — Master Engineering Standard

> **Origin & Craft Standard**: Developed by **`rezervehere`** as the universal interface design standard for high-craft digital products across **Web (React/Next.js/Tailwind)**, **iOS (SwiftUI)**, **Android (Jetpack Compose)**, and **React Native**.

```
+-------------------------------------------------------------------------+
|                       SINGLE FLAT SURFACE (#FFFFFF)                     |
|                                                                         |
|  [ Metric Stats ]  ------------------- Hairline Divider --------------  |
|                                                                         |
|  [ Dual-Trend SVG Chart with Numerical Axes & Live Animated Numerals ]  |
|                                                                         |
|  [ Stroke-Free Slider ]   [ Siri Focal Wheel ]   [ iOS Spring Toggle ]  |
|                                                                         |
|  [ Interactive List Rows with Negative-Margin Background Fills ]        |
+-------------------------------------------------------------------------+
```

---

## 1. Strict Negative Constraints (The "Never" Ban List)

Any AI agent generating code under this skill must strictly obey these negative constraints:

1. 🚫 **NO Container-in-Container Nesting**:
   * **Never** place gray cards inside white cards inside outer boxed cards.
   * Controls and metrics sit directly on the flat `#FFFFFF` (or dark `#09090B`) surface.
   * Use flat divider rows (`divide-y divide-[#ECECEC]` or `border-t border-b border-[#ECECEC]`) instead of separate boxed tiles.
2. 🚫 **NO Yapping & Zero-Slop Text**:
   * **Never** write dramatic fluff or marketing filler (*"Live Radar & Lead Intelligence"*, *"AI Powered Engine Ready"*, *"Next-Gen Analytics Matrix"*, *"Hyper-Fast Autonomous Engine"*).
   * Keep interfaces quiet, direct, and human. Use concise 1-word or 2-word functional tokens (`Wheel`, `Slider`, `Controls`, `Where`, `When`, `Service`, `Transactions`, `Average Ticket`, `Take Rate`, `MRR`).
   * Never scream with all-caps micro-headers (`SUGGESTED DESTINATIONS` ➡️ `Suggested Destinations`).
3. 🚫 **NO Emojis in UI Controls**:
   * **Never** place emojis (🚀, 🔥, ⚡, ✨, 📈, 💅, 💈, etc.) inside buttons, tabs, input fields, badges, or headers.
   * Always use platform-native monochrome vector icons (Lucide on Web, SF Symbols on iOS, Material Symbols on Android).
4. 🚫 **NO Colored Icon Fills (Monochrome Only)**:
   * Icons in navigation, controls, and theme toggles must be **100% monochrome** (`currentColor` / `#111827` / `#6B7280` / `#FFFFFF`).
   * Color is reserved exclusively for functional state indicators (e.g. emerald status badges, rose error warnings).
5. 🚫 **NO Stroke Rings on Sliders / Tracks**:
   * Sliders, progress rings, and segmented control backgrounds must have **zero outer borders or stroke rings** (`border: none !important`).

---

## 2. Typography & Brand Hierarchy

| Role | Font Family | Weight | Casing & Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Logo / Headers** | **`Cabinet Grotesk`** | **800 (ExtraBold) / 700 (Bold)** | Strictly all-lowercase, `-0.025em` tracking | Brand logos (`rezervehere`), editorial hero headers, page titles |
| **UI Body & Controls** | **`Plus Jakarta Sans`** or **`Inter`** | **400 / 500 / 600** | Title/Sentence Case, normal tracking | Form labels, descriptions, button text, search segment prompts |
| **Tabular Numerals** | **`JetBrains Mono`** | **500 (Medium) / 700 (Bold)** | Tabular Figures (`tnum`), `-0.03em` tracking | Financial metrics, GMV numbers, take rates, timestamps, OTP tokens |

### Font Loading (Web)
```html
<!-- Fontshare Cabinet Grotesk -->
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap" rel="stylesheet">
<!-- Google Fonts Plus Jakarta Sans & JetBrains Mono -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
```

---

## 3. Universal Design Tokens Matrix

| Token | Light Mode (Pure White) | Dark Mode (OLED Black) | Web / Tailwind | iOS (SwiftUI) | Android (Compose) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Canvas Background** | `#FFFFFF` | `#09090B` | `bg-[#FFFFFF] dark:bg-[#09090B]` | `Color.white` / `Color(hex: 0x09090B)` | `Color(0xFFFFFFFF)` / `Color(0xFF09090B)` |
| **Primary Element** | `#111827` | `#FFFFFF` | `text-[#111827] dark:text-white` | `Color(uiColor: .label)` | `MaterialTheme.colorScheme.onBackground` |
| **Secondary Text** | `#374151` | `#E4E4E7` | `text-[#374151] dark:text-[#E4E4E7]` | `Color(uiColor: .secondaryLabel)` | `Color(0xFF374151)` / `Color(0xFFE4E4E7)` |
| **Muted Text** | `#6B7280` | `#A1A1AA` | `text-[#6B7280] dark:text-[#A1A1AA]` | `Color(uiColor: .tertiaryLabel)` | `Color(0xFF6B7280)` / `Color(0xFFA1A1AA)` |
| **Hairline Divider** | `#ECECEC` | `#27272A` | `border-[#ECECEC] dark:border-[#27272A]` | `Color(uiColor: .separator)` | `Color(0xFFECECEC)` / `Color(0xFF27272A)` |
| **Subtle Hover Track**| `#EBECEE` | `#27272A` | `bg-[#EBECEE] dark:bg-[#27272A]` | `Color(uiColor: .systemGray6)` | `Color(0xFFEBECEE)` / `Color(0xFF27272A)` |
| **Active Surface** | `#FFFFFF` | `#18181B` | `bg-white dark:bg-[#18181B]` | `Color(uiColor: .secondarySystemBackground)` | `Color(0xFFFFFFFF)` / `Color(0xFF18181B)` |
| **Trend Up Badge** | Text `#047857`, Bg `#ECFDF5`, Border `#A7F3D0` | Text `#34D399`, Bg `rgba(6,78,59,0.4)`, Border `rgba(6,95,70,0.6)` | `text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0]` | `Color(hex: 0x047857)` | `Color(0xFF047857)` |
| **Trend Down Badge** | Text `#BE123C`, Bg `#FFF1F2`, Border `#FECDD3` | Text `#FB7185`, Bg `rgba(136,19,55,0.4)`, Border `rgba(159,18,57,0.6)`| `text-[#BE123C] bg-[#FFF1F2] border border-[#FECDD3]` | `Color(hex: 0xBE123C)` | `Color(0xFFBE123C)` |

---

## 4. Component Blueprints & Mathematical Recipes

### A. Authentic 3-Step Search Bar Composer (60px)
* **Architecture**: Strict auto-advance sequence: `Where` ➡️ `When` ➡️ `Type of service`.
* **Dimensions**: Height `60px`, `rounded-full`, floating shadow `0 8px 30px rgba(0,0,0,0.08)` (Light) / `0 8px 30px rgba(0,0,0,0.35)` (Dark).
* **Sliding Highlight Pill**: Physical gliding white capsule (`bg-white dark:bg-[#27272A] shadow-[0_8px_24px_rgba(0,0,0,0.14)] z-5`).
* **Dividers**: Automatically hide (`opacity-0`) when adjacent segment is active.
* **Dropdown Popups**:
  * `Where`: Detect current location button + destination suggestions with pin icon and country subtitle.
  * `When`: **Interactive Month Calendar Grid** (1–31) + horizontal time slot pills (`09:00`, `10:00`, `11:30`, `14:00`, `16:30`, `18:00`) + `Apply` action.
  * `Type of service`: Service directory categories.

#### Web (React + Tailwind) Implementation
```tsx
<div className="w-full h-[60px] p-0 rounded-full flex items-center relative transition-all overflow-hidden border bg-[#EBECEE] dark:bg-[#27272A] border-[#ECECEC] dark:border-[#27272A] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
  {/* Sliding Active Pill */}
  <div
    style={{ transform: `translateX(${activeLeft}px)`, width: `${activeWidth}px` }}
    className="absolute top-0 bottom-0 bg-white dark:bg-[#18181B] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all duration-300 pointer-events-none z-0"
  />

  {/* Segment 1: Where */}
  <button onClick={() => setSegment('where')} className="flex-1 self-stretch flex flex-col justify-center px-6 text-left relative z-10">
    <span className="text-[11px] font-semibold text-[#111827] dark:text-white leading-tight">Where</span>
    <span className="text-xs text-[#6B7280] dark:text-[#A1A1AA] truncate mt-0.5">{whereQuery || 'Search destinations'}</span>
  </button>

  <div className={`w-px h-6 bg-[#ECECEC] dark:bg-[#27272A] my-auto transition-opacity ${activeSegment === 'where' || activeSegment === 'when' ? 'opacity-0' : 'opacity-100'}`} />

  {/* Segment 2: When */}
  <button onClick={() => setSegment('when')} className="flex-1 self-stretch flex flex-col justify-center px-6 text-left relative z-10">
    <span className="text-[11px] font-semibold text-[#111827] dark:text-white leading-tight">When</span>
    <span className="text-xs text-[#6B7280] dark:text-[#A1A1AA] truncate mt-0.5">{whenQuery || 'Add dates'}</span>
  </button>

  <div className={`w-px h-6 bg-[#ECECEC] dark:bg-[#27272A] my-auto transition-opacity ${activeSegment === 'when' || activeSegment === 'service' ? 'opacity-0' : 'opacity-100'}`} />

  {/* Segment 3: Service */}
  <button onClick={() => setSegment('service')} className="flex-1 self-stretch flex flex-col justify-center px-6 text-left relative z-10">
    <span className="text-[11px] font-semibold text-[#111827] dark:text-white leading-tight">Type of service</span>
    <span className="text-xs text-[#6B7280] dark:text-[#A1A1AA] truncate mt-0.5">{serviceQuery || 'Add service'}</span>
  </button>

  {/* Search Action Magnifier */}
  <div className="pr-2 z-20">
    <button className="w-11 h-11 rounded-full bg-[#111827] dark:bg-white text-white dark:text-black flex items-center justify-center shadow-sm active:scale-95 transition-transform">
      <Search className="w-4 h-4 stroke-[2.2]" />
    </button>
  </div>
</div>
```

---

### B. Siri 3-Item Windowed Focal Wheel
* **Mathematical Translation Formula**:
  * Viewport width: `180px` (3 visible items $\times$ `60px`).
  * Item width: `60px`.
  * Center focus box: `left: 60px; width: 60px; z-index: 0; pointer-events: none;`.
  * Track translation formula to place item $i$ dead-center:
    $$\text{translateX} = 60\text{px} - (i \times 60\text{px}) = -(i - 1) \times 60\text{px}$$
  * Layering: Center focus box sits at `z-0` (background), track sits at `z-10` (foreground) so active bold text is never obscured.

```tsx
<div className="p-3 rounded-2xl border flex items-center justify-between gap-1 relative bg-[#F7F7F8] dark:bg-[#18181B] border-[#ECECEC] dark:border-[#27272A]">
  <button onClick={() => step(-1)} className="w-8 h-8 rounded-full border bg-white dark:bg-[#09090B] border-[#ECECEC] dark:border-[#27272A] flex items-center justify-center z-30 shrink-0">
    <ChevronLeft className="w-3.5 h-3.5" />
  </button>

  <div className="relative w-[180px] h-9 overflow-hidden rounded-xl">
    {/* Center Focus Box */}
    <div className="absolute left-[60px] top-0.5 bottom-0.5 w-[60px] rounded-xl border bg-white dark:bg-[#18181B] border-[#111827] dark:border-white shadow-2xs pointer-events-none z-0" />

    {/* Sliding Track */}
    <div
      style={{ transform: `translateX(${60 - activeIdx * 60}px)` }}
      className="absolute top-0 bottom-0 left-0 flex items-center z-10 transition-transform duration-300"
    >
      {STEPS.map((step, idx) => (
        <div
          key={step}
          onClick={() => setActiveIdx(idx)}
          className={`w-[60px] h-9 flex items-center justify-center font-mono text-xs cursor-pointer transition-all ${
            idx === activeIdx ? 'text-[#111827] dark:text-white font-bold text-[13.5px]' : 'text-[#6B7280] dark:text-[#A1A1AA] font-medium'
          }`}
        >
          {step.toFixed(2)}%
        </div>
      ))}
    </div>
  </div>

  <button onClick={() => step(1)} className="w-8 h-8 rounded-full border bg-white dark:bg-[#09090B] border-[#ECECEC] dark:border-[#27272A] flex items-center justify-center z-30 shrink-0">
    <ChevronRight className="w-3.5 h-3.5" />
  </button>
</div>
```

---

### C. Stroke-Free Apple Range Slider
```css
/* Minimalist Stroke-Free Slider */
input[type=range] {
  -webkit-appearance: none;
  appearance: none;
  background: var(--bg-track);
  height: 6px;
  border-radius: 9999px;
  outline: none;
  border: none !important;
  box-shadow: none !important;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--text-primary);
  border-radius: 50%;
  cursor: pointer;
  border: none !important;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}
input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.18); }
input[type=range]::-webkit-slider-thumb:active { transform: scale(0.92); }
```

---

### D. Subpixel Precision SVG Curve Dot Tracking
* When hovering an SVG financial path, find the exact dot coordinate $(x, y)$ using **binary search** on `SVGPathElement.getPointAtLength()`:

```js
function getExactCurvePoint(pathElement, targetSvgX) {
  let low = 0;
  let high = pathElement.getTotalLength();
  let bestPt = pathElement.getPointAtLength(0);

  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2;
    const pt = pathElement.getPointAtLength(mid);
    if (pt.x < targetSvgX) {
      low = mid;
    } else {
      high = mid;
    }
    bestPt = pt;
  }
  return bestPt; // { x, y } perfectly anchored on the path
}
```

---

### E. Pure Typography Divider Services List
* Replaces clunky button cards with pure Apple/Linear divider rows:

```tsx
<div className="divide-y divide-[#ECECEC] dark:divide-[#27272A] w-full">
  {services.map((s) => (
    <div key={s.id} className="py-3.5 flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-xs text-[#111827] dark:text-white">{s.name}</h4>
        <p className="text-[11px] text-[#6B7280] dark:text-[#A1A1AA]">{s.description} · {s.duration} min</p>
      </div>
      <div className="text-right shrink-0">
        <span className="font-bold text-xs font-mono text-[#111827] dark:text-white">${s.price}</span>
        {s.discount && <p className="text-[10px] text-emerald-600 font-semibold">-{s.discount}% off</p>}
      </div>
    </div>
  ))}
</div>
```

---

## 5. Multi-Platform Native Recipes

### 1. iOS (SwiftUI) Recipe
```swift
import SwiftUI

struct SingleSurfaceView: View {
    @State private var takeRateIndex: Int = 3
    let rates = [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 3.00]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Brand Header
                HStack(spacing: 6) {
                    Text("single-surface-design")
                        .font(.system(size: 15, weight: .medium))
                    Text("by")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                    Text("rezervehere")
                        .font(.custom("CabinetGrotesk-Bold", size: 18))
                        .textCase(.lowercase)
                }
                
                // Flat Metric Divider Row
                HStack {
                    VStack(alignment: .leading) {
                        Text("Transactions").font(.caption).foregroundColor(.secondary)
                        Text("1,248").font(.system(.title2, design: .monospaced)).bold()
                    }
                    Spacer()
                    VStack(alignment: .trailing) {
                        Text("Take Rate").font(.caption).foregroundColor(.secondary)
                        Text("1.75% + $0.30").font(.system(.title2, design: .monospaced)).bold()
                    }
                }
                .padding(.vertical, 12)
                .overlay(Rectangle().frame(height: 1).foregroundColor(Color(uiColor: .separator)), alignment: .top)
                .overlay(Rectangle().frame(height: 1).foregroundColor(Color(uiColor: .separator)), alignment: .bottom)
            }
            .padding(24)
        }
        .background(Color.white)
    }
}
```

### 2. Android (Jetpack Compose) Recipe
```kotlin
@Composable
fun SingleSurfaceScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFFFFFFF))
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        // Brand Header
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Text(
                text = "single-surface-design",
                fontSize = 15.sp,
                fontWeight = FontWeight.Medium,
                color = Color(0xFF111827)
            )
            Text(
                text = "by",
                fontSize = 12.sp,
                color = Color(0xFF6B7280)
            )
            Text(
                text = "rezervehere",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = CabinetGrotesk,
                color = Color(0xFF111827)
            )
        }

        // Flat Divider Metric Row
        HorizontalDivider(color = Color(0xFFECECEC), thickness = 1.dp)
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                Text("Transactions", fontSize = 12.sp, color = Color(0xFF6B7280))
                Text("1,248", fontSize = 22.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
            }
            Column(horizontalAlignment = Alignment.End) {
                Text("Take Rate", fontSize = 12.sp, color = Color(0xFF6B7280))
                Text("1.75% + $0.30", fontSize = 22.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
            }
        }
        HorizontalDivider(color = Color(0xFFECECEC), thickness = 1.dp)
    }
}
```

---

## 6. AI Agent Pre-Flight Self-Audit Checklist

Before outputting code, verify that:
* [ ] The background is a single flat surface (`#FFFFFF` in light mode, `#09090B` in dark mode).
* [ ] Zero containers are nested inside cards. All metrics and services sit directly on the flat surface.
* [ ] Brand logo is strictly `rezervehere` in all-lowercase bold `Cabinet Grotesk`.
* [ ] Zero emojis (🚀, 📈, ✨) appear anywhere in the UI.
* [ ] All icons are monochrome vector strokes (`currentColor`).
* [ ] Search capsule adheres to the 60px height with sliding highlight pill and auto-advance flow (`Where` ➡️ `When` ➡️ `Type of service`).
* [ ] Siri focal wheel translation follows $\text{translateX} = 60\text{px} - (i \times 60\text{px})$ with $z\text{-index } 0$ focus box and $z\text{-index } 10$ numbers.
* [ ] Sliders and progress bars have zero stroke borders (`border: none !important`).
* [ ] Trend badges use high-contrast emerald (`#047857`) / rose (`#BE123C`) tokens without muddy colors.
