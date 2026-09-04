---
name: ramsian
description: Universal Apple & Linear single-surface architecture, stroke-free controls, Siri focal pickers, and fluid spring motion design system by rezervehere. Use whenever building, styling, or refactoring UI components for Web, iOS, Android, or React Native.
---

# Ramsian Design System — Master Engineering Standard

> **Origin & Craft Standard**: Developed by **`rezervehere`** and named in honor of **Dieter Rams** (*"Weniger, aber besser / Less, but better"*). This is the universal interface design standard for high-craft digital products across **Web (React/Next.js/Tailwind)**, **iOS (SwiftUI)**, **Android (Jetpack Compose)**, and **React Native**.

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

## 1. Strict Negative Constraints (The Anti-AI-Slop & Craft Ban List)

Any AI agent generating code or UI under this skill must strictly obey these non-negotiable negative constraints:

1. 🚫 **NO Container-in-Container Nesting**:
   * **Never** place gray cards inside white cards inside outer boxed cards.
   * Controls, metrics, lists, and charts sit directly on the flat `#FFFFFF` (or dark `#09090B`) surface.
   * Separate sections using flat hairline dividers (`border-t border-b border-[#ECECEC] dark:border-[#27272A]`) or whitespace, never multiple nested card boundaries.
2. 🚫 **NO Badges (Strict Zero-Badge Policy)**:
   * **Never** use decorative badges, module count pills (e.g. `10 Modules`, `10 Components`), tags, or meta-chips next to headers.
   * Badges are **strictly banned** across the entire UI. The only permissible exception is the functional bipolar percentage trend delta on charts (`+24.6%` / `-8.3%`).
3. 🚫 **NO Yapping & Zero Subtitles**:
   * Section headers must be single-word nouns (`Volume`, `Craft`, `Services`, `Controls`).
   * **Never** write explanatory subtitle sentences (e.g. **NEVER** write *"Ten pure single-surface components with zero container nesting"*). If the design is high craft, the UI speaks for itself.
   * Keep interfaces quiet, direct, and human.
4. 🚫 **NO Ambiguous State Colors (Strict Semantic Polarity: Green ON / Red OFF)**:
   * **Never** make an active switch just turn dark gray/black (`#111827`) or arbitrary cyan.
   * An active/enabled state is **Emerald Green** (`#10B981`).
   * An inactive/disabled/off state is **Rose Red** (`#EF4444`).
   * The rule is universal across all elements with polarity: **Bigger / Higher / Active = Green**; **Smaller / Lower / Inactive = Red**.
5. 🚫 **NO Emojis in UI Controls**:
   * **Never** place emojis (🚀, 🔥, ⚡, ✨, 📈, 💅, 💈, etc.) inside buttons, tabs, input fields, badges, or headers.
   * Always use platform-native monochrome vector icons (Lucide on Web, SF Symbols on iOS, Material Symbols on Android).
6. 🚫 **NO Colored Icon Fills (Monochrome Only)**:
   * Icons in navigation, controls, and theme toggles must be **100% monochrome** (`currentColor` / `#111827` / `#6B7280` / `#FFFFFF`).
   * Color is reserved exclusively for functional state indicators (e.g. emerald status badges, rose error warnings).
7. 🚫 **NO Stroke Rings on Sliders / Tracks**:
   * Sliders, progress rings, and segmented control backgrounds must have **zero outer borders or stroke rings** (`border: none !important`).
8. 🚫 **NO Self-Explaining Redundancy & NO Toast Spam**:
   * **Never** use text to explain what a visual control already communicates on its own.
   * Standalone switches are self-explanatory: **never** add text like `Live`, `ON`, `OFF` or duplicate colored dots adjacent to a switch.
   * **Never trigger floating toast popups on button clicks**: UI actions update their state in-place silently and smoothly without annoying toast banners flashing on screen.
   * Directional controls must use semantic colors: `↑` is Emerald Green (`#10B981`), `↓` is Rose Red (`#EF4444`).
   * Positive magnitude sliders are strictly neutral monochrome (no green/red fill unless representing bipolar profit/loss).
   * **Strict 1-Word Standard**: If an action, category, or metric can be communicated in one word, multiple words are prohibited (`Volume`, `Ticket`, `Rate`, `MRR`, `Service`, `Hair`, `Barber`, `Nails`, `Facial`, `Spa`, `Copy`, `Craft`).
9. 🚫 **NO Jiggling or Overshooting Motion (Smooth Glides Only)**:
   * **Never** use bouncy, overshooting easing curves (`cubic-bezier(0.34, 1.56, 0.64, 1)` or any curve with value $> 1.0$).
   * Fluid motion must be smooth, friction-based, and non-overshooting (`cubic-bezier(0.16, 1, 0.3, 1)`). Sliding capsules and pills glide directly to their destination without shaking, bouncing, or jiggling.
10. 🚫 **NO Initial Mount Animation Glitches**:
   * On initial page load/mount, segmented pills and sliding tracks must render statically in place without triggering an initial sliding transition from 0. Transitions engage only on subsequent user interaction.
11. 🚫 **NO Non-Uniform SVG Scaling Distortion**:
   * Circular indicators (chart hover dots, node pins) must remain true circles (`1:1` aspect ratio) at any viewport width. Never allow `preserveAspectRatio="none"` to distort circles into ovals.
12. 🚫 **NO Duplicate UI Controls (Diverse Scale Mandate)**:
   * **Never** clone the same UI pattern multiple times in different skins (e.g. having multiple segmented slider controls).
   * Showcase completely distinguishable, high-craft components across three distinct architectural scales:
     * **Big**: Full Month Calendar & Booking Widget, Day Agenda Timeline Widget.
     * **Medium**: Multi-channel hardware level fader console, Station floorplan availability matrix, Flat transaction ledger.
     * **Small**: Braun rotary dial knob, LED VU decibel level meter, Split action pill, Token dismiss cluster, Hairline detail disclosure.
13. 🚫 **NO Warped Non-Concentric Radii (The Concentric Corner Radius Law)**:
    * Whenever elements are nested with padding $P$, the corner radii **MUST** satisfy:
      $$R_{\text{inner}} = \max(0, R_{\text{outer}} - P) \quad \text{or} \quad R_{\text{outer}} = R_{\text{inner}} + P$$
    * **Never** use mismatched radii that pinch or bulge (e.g. `p-3` (12px padding) with `rounded-2xl` (16px) wrapping `rounded-xl` (12px) is geometrically warped: $16 - 12 = 4 \neq 12$). With 12px padding and 12px inner elements, outer radius MUST be 24px (`rounded-[24px]` or `rounded-3xl`).
    * For insets (like the center focus box inside the wheel track with 2px inset): $R_{\text{focus}} = R_{\text{track}} - \text{inset} = 12\text{px} - 2\text{px} = 10\text{px}$ (`rounded-[10px]`).
14. 🚫 **NO Low-Contrast or Washed-Out Text (WCAG AA/AAA & Apple HIG Contrast Rule)**:
    * All UI text must maintain uncompromising readability and contrast against its background:
      * **Canvas Text**: Primary `#111827` (16.6:1), Secondary `#1F2937` (13.0:1), Muted `#4B5563` (7.0:1 on canvas, 6.6:1 on surface in light mode; `#A1A1AA` 7.8:1 in dark mode).
      * **Metadata / Subtitle Text**: Minimum `11px font-medium`, never microscopic or washed-out gray.
15. 🚫 **NO Meaningless "All" Category Filters**:
    * Never prepend an arbitrary "All" pill before category filters. Present the domain categories directly (`Hair`, `Barber`, `Nails`, `Facial`, `Spa`) and activate the primary relevant category directly.
16. 🚫 **NO Jarring Blank States or Layout Shifts (Bare-Bone Skeleton Standard)**:
    * Under high latency or bad connectivity, never display blank voids, jarring layout jumps, or distracting spinners.
    * Maintain exact spatial stability with concentric, theme-aware sweeping gradient skeletons.
    * Always maintain a persistent bare-bone loading preview element in the component catalog ("one which doesn't disappear") alongside global simulation toggles.
17. 🚫 **NO Oversized or Pitch-Black Progress Lines (The Contained Ground Standard)**:
    * A progress line (horizontal bar or radial arc) must **never be wider or thicker than the ground track itself** (`max-width: 100%`, `overflow-hidden`, and stroke width strictly contained within track path width).
    * In-line progress indicators advancing from left to right must be **slightly darker than the ground behind them** (e.g. `linear-gradient(90deg, #A1A1AA 0%, #71717A 100%)` on `#EBECEE` ground in light mode; `linear-gradient(90deg, #3F3F46 0%, #52525B 100%)` in dark mode), strictly avoiding pitch-black `#111827` or inverted blackboard fills.

---

## 2. Typography & Brand Hierarchy

| Role | Font Family | Weight | Casing & Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Logo / Headers** | **`Cabinet Grotesk`** | **800 (ExtraBold) / 700 (Bold)** | Strictly all-lowercase, `-0.025em` tracking | Brand logos (`rezervehere`, `ramsian`), editorial hero headers, page titles |
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
| **Secondary Text** | `#1F2937` | `#E4E4E7` | `text-[#1F2937] dark:text-[#E4E4E7]` | `Color(uiColor: .secondaryLabel)` | `Color(0xFF1F2937)` / `Color(0xFFE4E4E7)` |
| **Muted Text** | `#4B5563` | `#A1A1AA` | `text-[#4B5563] dark:text-[#A1A1AA]` | `Color(uiColor: .tertiaryLabel)` | `Color(0xFF4B5563)` / `Color(0xFFA1A1AA)` |
| **Hairline Divider** | `#E5E7EB` | `#27272A` | `border-[#E5E7EB] dark:border-[#27272A]` | `Color(uiColor: .separator)` | `Color(0xFFE5E7EB)` / `Color(0xFF27272A)` |
| **Subtle Hover Track**| `#EBECEE` | `#27272A` | `bg-[#EBECEE] dark:bg-[#27272A]` | `Color(uiColor: .systemGray6)` | `Color(0xFFEBECEE)` / `Color(0xFF27272A)` |
| **Active Surface** | `#FFFFFF` | `#18181B` | `bg-white dark:bg-[#18181B]` | `Color(uiColor: .secondarySystemBackground)` | `Color(0xFFFFFFFF)` / `Color(0xFF18181B)` |
| **State Active / ON** | `#10B981` (Emerald) | `#059669` (Dark Emerald) | `bg-emerald-500 text-emerald-700` | `Color.green` / `Color(hex: 0x10B981)` | `Color(0xFF10B981)` |
| **State Inactive / OFF** | `#EF4444` (Rose Red) | `#F43F5E` (Dark Rose) | `bg-rose-500 text-rose-700` | `Color.red` / `Color(hex: 0xEF4444)` | `Color(0xFFEF4444)` |
| **Trend Up / Bigger** | Text `#047857`, Bg `#ECFDF5`, Border `#A7F3D0` | Text `#34D399`, Bg `rgba(6,78,59,0.4)`, Border `rgba(6,95,70,0.6)` | `text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0]` | `Color(hex: 0x047857)` | `Color(0xFF047857)` |
| **Trend Down / Smaller** | Text `#BE123C`, Bg `#FFF1F2`, Border `#FECDD3` | Text `#FB7185`, Bg `rgba(136,19,55,0.4)`, Border `rgba(159,18,57,0.6)`| `text-[#BE123C] bg-[#FFF1F2] border border-[#FECDD3]` | `Color(hex: 0xBE123C)` | `Color(0xFFBE123C)` |

---

### 3.1 The Semantic Polarity Standard ("Bigger = Green, Smaller = Red")

In Ramsian design, color is **never decorative** — it is strictly functional. Every visual element that communicates state, direction, or delta follows unified semantic polarity:

1. **Binary Controls (Switches / Toggles)**:
   * **Active / ON**: Emerald Green track (`#10B981`).
   * **Inactive / OFF**: Rose Red track (`#EF4444`). Never black/gray darkening.
   * **Standalone**: A switch is self-explanatory; never append redundant explanatory labels.
2. **Directional Arrows & Trend Actions**:
   * Upward directional indicators: **Emerald Green** arrow `↑` (`#10B981`).
   * Downward directional indicators: **Rose Red** arrow `↓` (`#EF4444`).
3. **Sliders & Range Controls (Neutral Magnitude Standard)**:
   * **Positive Range Controls**: When a slider controls a positive magnitude (e.g. 50 to 2,000 Units), the track and fill are **strictly neutral monochrome** (`#EBECEE` track, `#111827` thumb). Do **not** tint positive magnitudes green or red.
   * Semantic color on sliders is reserved strictly for bipolar controls with positive vs. negative centers (e.g., -100% to +100%).
4. **Charts & Spline Paths**:
   * Ascending / growth trajectories render in **Emerald Green** with green fill gradient.
   * Descending / reduction trajectories render in **Rose Red** with red fill gradient.
5. **Badges & Live Indicators**:
   * Positive delta (`+X%`) or growth: Emerald green text, soft green surface.
   * Negative delta (`-X%`) or decline: Rose red text, soft rose surface.

---

### 3.2 Selected Value Reveal Standard (Apple & Google Stroke-Free Elevation)

Never render active selected values with harsh solid black boxes ("blackboard") or heavy black outline strokes. In adherence with Apple Human Interface Guidelines and Google Material 3:
1. **Sliding Segmented Controls (`apple-seg-track`)**:
   * Outer track: Subtle recessed background (`var(--bg-track)`), stroke-free, `rounded-full`.
   * Sliding reveal pill (`apple-seg-pill`): Elevated surface (`var(--card-active)`), physical spring motion (`cubic-bezier(0.16, 1, 0.3, 1)`), soft ambient shadow (`box-shadow: 0 2px 8px rgba(0,0,0,0.14)`), and **strictly no border**.
   * Active option: `var(--text-primary)` (font-weight 600). Inactive options: `var(--text-muted)` (font-weight 500).
2. **Focal Wheel & Picker Highlights**:
   * Center focus box uses stroke-free soft elevation (`border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.12)`).
3. **Calendar Grids & Discrete Options**:
   * Selected day/slot: Elevated active card surface with soft shadow and dark primary text. Avoid harsh inverse black fills.

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

### C. Stroke-Free Apple Range Slider & Semantic Dynamic Binding
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

### C.0 Dynamic Procedural Financial Spline & Intensity Volatility Standard ("Zimmer")
* **Principle**: Real financial graphs (Bloomberg, Stripe, TradingView) are never static 3-point toy curves. They feature multi-frequency harmonic movements across timeline periods (7D, 30D, 90D).
* **Slider as Granularity / Volatility ("Zimmer") Controller**:
  * **Low Intensity (e.g. 50 Units)**: The curve renders as a pure, smooth macro trendline with calm, macroeconomic curvature.
  * **High Intensity (e.g. 2,000 Units)**: The curve reveals intricate micro-fluctuations ("Zimmer" / jitter / daily trading volatility) with intraday peaks and troughs, faithfully mimicking authentic financial markets.
* **Mathematical Synthesis Model**:
  1. **Macro Secular Trend**: $Y_{\text{macro}}(t) = Y_{\text{start}} \pm \Delta Y \cdot \frac{1 - \cos(\pi t)}{2}$.
  2. **Harmonic Multi-Octave Noise**: $N(t) = \sum_{k=1}^4 w_k \sin(\omega_k \cdot \text{seed} \cdot t + \phi_k)$, deterministic and stable across slider scrubbing.
  3. **Continuous $C^1$ Cubic Bezier Interpolation**: Points are converted to SVG paths using smooth cubic bezier control points $(cp_1, cp_2)$, guaranteeing continuous curvature without angular kinks.
  4. **Sub-Pixel Peak Tracking**: Crosshair dot and tooltip track the generated path dynamically using SVG `getPointAtLength()`, reflecting exact revenue values at every peak or valley.

---

### C.1 Semantic iOS Toggle Switch (Green ON / Red OFF)
* **Design Mandate**: Never darken an active switch to gray/black. An enabled state is positive/active (**Emerald Green**), an inactive state is muted/off (**Rose Red**).

```css
/* iOS Physical Spring Switch with Semantic Polarity */
.ios-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}
.ios-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
/* OFF State: Rose Red */
.ios-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #EF4444; /* Rose Red when OFF */
  transition: background-color 0.2s ease;
  border-radius: 9999px;
}
.ios-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0,0,0,0.25);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 50%;
}
/* ON State: Emerald Green */
input:checked + .ios-slider {
  background-color: #10B981; /* Emerald Green when ON */
}
input:checked + .ios-slider:before {
  transform: translateX(20px);
}
```

---

### C.2 Ten Pure Single-Surface Element Blueprints

#### 1. Discrete Numeric Stepper
```tsx
<div className="flex items-center gap-1.5 border rounded-full p-1 bg-white dark:bg-[#09090B] border-[#ECECEC] dark:border-[#27272A]">
  <button onClick={() => step(-1)} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold active:scale-95 transition-transform">-</button>
  <span className="w-6 text-center text-xs font-bold font-mono">{count}</span>
  <button onClick={() => step(1)} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold active:scale-95 transition-transform">+</button>
</div>
```

#### 2. Segmented Radio Group (1-Word Tokens)
```tsx
<div className="inline-flex p-1 rounded-full bg-[#EBECEE] dark:bg-[#27272A] gap-1">
  {['Auto', 'Manual', 'Off'].map(mode => (
    <button key={mode} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${active === mode ? 'bg-white dark:bg-[#18181B] shadow-sm text-[#111827] dark:text-white' : 'text-[#6B7280]'}`}>
      {mode}
    </button>
  ))}
</div>
```

#### 3. Capacity Fill Gauge (Linear Bar)
```tsx
<div className="w-full space-y-1.5">
  <div className="flex justify-between text-xs font-mono font-medium">
    <span className="text-[#6B7280] dark:text-[#A1A1AA]">Capacity</span>
    <span className="font-bold text-[#111827] dark:text-white">74%</span>
  </div>
  {/* The progress line must NEVER be wider than the track ground: contained bounds, max-width: 100%, stroke-free */}
  <div className="w-full h-1.5 bg-[#EBECEE] dark:bg-[#27272A] rounded-full overflow-hidden">
    <div
      style={{
        width: '74%',
        maxWidth: '100%',
        background: 'linear-gradient(90deg, #A1A1AA 0%, #71717A 100%)'
      }}
      className="h-full rounded-full transition-all duration-300 dark:bg-gradient-to-r dark:from-[#3F3F46] dark:to-[#52525B]"
    />
  </div>
</div>
```

#### 4. Horizontal Weekday Strip
```tsx
<div className="flex gap-1.5 overflow-x-auto">
  {DAYS.map(d => (
    <button key={d.day} className={`flex flex-col items-center py-2 px-3 rounded-2xl border transition-all ${d.selected ? 'bg-[#111827] text-white border-transparent' : 'bg-[#F7F7F8] border-[#ECECEC] text-[#6B7280]'}`}>
      <span className="text-[10px] uppercase font-semibold">{d.name}</span>
      <span className="text-sm font-mono font-bold mt-0.5">{d.date}</span>
    </button>
  ))}
</div>
```

#### 5. Token Tag Cluster
```tsx
<div className="flex flex-wrap gap-1.5">
  {tags.map(tag => (
    <span key={tag} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F7F7F8] dark:bg-[#18181B] border border-[#ECECEC] dark:border-[#27272A] text-[#111827] dark:text-white">
      <span>{tag}</span>
      <button onClick={() => removeTag(tag)} className="hover:opacity-75">×</button>
    </span>
  ))}
</div>
```

#### 6. Discrete Rating Scale (1 to 5)
```tsx
<div className="flex items-center gap-1">
  {[1, 2, 3, 4, 5].map(score => (
    <button key={score} onClick={() => setRating(score)} className={`w-7 h-7 rounded-full text-xs font-mono font-bold transition-all ${score <= rating ? 'bg-[#111827] text-white dark:bg-white dark:text-black' : 'bg-[#EBECEE] text-[#6B7280]'}`}>
      {score}
    </button>
  ))}
</div>
```

#### 7. Spatial Breadcrumb Bar
```tsx
<div className="flex items-center gap-2 text-xs select-none">
  <span className="font-semibold text-[#111827] dark:text-white">Workspace</span>
  <span className="text-[#6B7280]">/</span>
  <span className="font-semibold text-[#111827] dark:text-white">Billing</span>
  <span className="text-[#6B7280]">/</span>
  <span className="text-[#6B7280]">Invoices</span>
</div>
```

#### 8. Micro-Sparkline Inline Row
```tsx
<div className="flex items-center justify-between py-2 border-b border-[#ECECEC] dark:border-[#27272A]">
  <span className="text-xs font-semibold text-[#111827] dark:text-white">Volume</span>
  <svg className="w-20 h-5" viewBox="0 0 80 20">
    <path d="M0,15 Q20,18 40,8 T80,4" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
  <span className="font-mono text-xs font-bold text-[#111827] dark:text-white">$14.2k</span>
</div>
```

#### 9. Detail Disclosure Row (Hairline Accordion)
```tsx
<div className="border-b border-[#ECECEC] dark:border-[#27272A] py-3">
  <button onClick={() => toggle()} className="w-full flex items-center justify-between text-xs font-semibold text-[#111827] dark:text-white">
    <span>Details</span>
    <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>↓</span>
  </button>
  {isOpen && <p className="text-[11px] text-[#6B7280] mt-1.5 leading-relaxed">Flat hairline disclosure with zero container nesting.</p>}
</div>
```

#### 10. Tactile In-Place Action Pill
```tsx
<button className="h-8 px-4 rounded-full border text-xs font-semibold bg-white dark:bg-[#18181B] border-[#ECECEC] dark:border-[#27272A] text-[#111827] dark:text-white shadow-2xs active:scale-95 transition-transform flex items-center gap-1.5">
  <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
  <span>Saved</span>
</button>
```

---

### C.3 Bare-Bone Skeleton Loading Standard ("Bad Connection" Shimmer)

Real-world mobile networks fluctuate. Under poor cellular connectivity or high latency, interfaces must never flash empty voids, jarring spinners, or shifting layouts. Skeletons must precisely match the dimensions, typography scale, and concentric radii of the actual UI.

#### 1. The Token-Driven Sweeping Gradient Engine
The shimmer sweeps across CSS custom properties (`--bg-track` and `--card-active`), automatically rendering with perfect contrast in light mode (`#FFFFFF`) and dark mode (`#09090B`) with zero hardcoded colors:

```css
@keyframes ramsianShimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 0.10) 50%,
    transparent 100%
  ) var(--bg-track);
  background-size: 200% 100%;
  animation: ramsianShimmer 2.8s ease-in-out infinite;
}
html.dark .skeleton-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.10) 50%,
    transparent 100%
  ) var(--bg-track);
  background-size: 200% 100%;
}
```

#### 2. Concentric Geometric Blueprint (Persistent Preview Card)
The design system must maintain a **permanent showcase element** ("one which doesn't disappear") so designers and engineers can inspect and verify skeleton anatomy without artificial network throttling:

```tsx
{/* Concentric Outer Box: p-3.5 (14px padding), rounded-[24px] -> inner radius = 10px */}
<div className="p-3.5 rounded-[24px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col justify-between h-[160px]">
  <div className="flex items-center justify-between">
    <span className="text-xs font-semibold text-[var(--text-primary)]">Skeleton</span>
    <button
      onClick={toggleSimulate}
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
    >
      Simulate
    </button>
  </div>

  <div className="space-y-2 py-1">
    {/* Identity Bar */}
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full skeleton-shimmer shrink-0" />
      <div className="space-y-1.5 flex-1">
        <div className="h-3 w-4/5 rounded skeleton-shimmer" />
        <div className="h-2 w-1/2 rounded skeleton-shimmer" />
      </div>
    </div>
    {/* Content Placeholder */}
    <div className="h-7 w-full rounded-xl skeleton-shimmer mt-1" />
  </div>

  {/* Pill Footers */}
  <div className="flex items-center gap-2">
    <div className="h-5 w-14 rounded-full skeleton-shimmer" />
    <div className="h-5 w-20 rounded-full skeleton-shimmer" />
  </div>
</div>
```

#### 3. Global Bad-Connection Simulation Overlay
To test and simulate network degradation across active application metrics without altering DOM layout:

```css
/* Zero-Shift Metric Overlay */
body.skeleton-active .skeleton-target {
  position: relative !important;
  color: transparent !important;
  user-select: none !important;
  pointer-events: none !important;
  border-radius: 6px !important;
}
body.skeleton-active .skeleton-target::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    var(--bg-track) 0%,
    var(--card-active) 50%,
    var(--bg-track) 100%
  );
  background-size: 200% 100%;
  animation: ramsianShimmer 1.8s ease-in-out infinite;
}
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

### F. Concentric Corner Radius Mathematical Geometry

In high-craft physical and digital design (Apple HIG, Google Material 3, Dieter Rams' industrial hardware), nested rounded shapes must share a **common center of curvature**. When an outer rounded container holds an inner rounded element, unequal curvature radii produce visual pinching or bulging.

#### The Fundamental Law of Concentric Radii:
$$R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$$
$$R_{\text{outer}} = R_{\text{inner}} + P$$
Where $P$ is the uniform internal padding or inset distance between outer and inner bounding boxes.

#### Concentric Scale Matrix:
| Outer Padding ($P$) | Desired Inner Radius ($R_{\text{inner}}$) | Required Outer Radius ($R_{\text{outer}}$) | Tailwind Classes |
| :--- | :--- | :--- | :--- |
| `12px` (`p-3`) | `12px` (`rounded-xl`) | `24px` | `p-3 rounded-[24px]` wrapping `rounded-xl` |
| `16px` (`p-4`) | `12px` (`rounded-xl`) | `28px` | `p-4 rounded-[28px]` wrapping `rounded-xl` |
| `8px` (`p-2`) | `8px` (`rounded-lg`) | `16px` | `p-2 rounded-2xl` wrapping `rounded-lg` |
| `2px` inset | `10px` (`rounded-[10px]`) | `12px` (`rounded-xl`) | Track `rounded-xl`, Focus box `rounded-[10px]` |

If $R_{\text{outer}} \le P$, the inner element does not curve with the outer corner and should have $R_{\text{inner}} = 0$.

---

### G. Apple & Google Design Foundations: Web Translation

Digital craftsmanship bridges Apple’s tactile physical fluid interfaces and Google’s accessible, systematic design tokens:

1. **Instant Response on Pointerdown (Apple HIG)**:
   * Feedback must occur on pointer-down (`:active`), never on click release. Waiting for pointer-up creates an illusion of latency.
   * `.spring-press:active { transform: scale(0.96); }`.
2. **Direct 1:1 Manipulation & Interruptibility (Apple HIG)**:
   * Interactive objects stay glued to the pointer during dragging and scrolling.
   * Motion must be interruptible mid-flight without locking input.
   * Easing curves use non-overshooting friction (`cubic-bezier(0.16, 1, 0.3, 1)`) with `damping: 1.0` so transitions glide smoothly into place without jiggling.
3. **Rigorous Contrast & Optical Sizing (Google M3 & WCAG AAA)**:
   * Text contrast must never be sacrificed for aesthetic minimalism:
     * Primary Text: `#111827` on `#FFFFFF` (16.6:1 AAA) / `#FFFFFF` on `#09090B` (19.8:1 AAA).
     * Secondary Text: `#1F2937` on `#FFFFFF` (13.0:1 AAA) / `#E4E4E7` on `#09090B` (15.2:1 AAA).
     * Muted Text: `#4B5563` on `#FFFFFF` (7.0:1 AAA) and on `#F7F7F8` (6.6:1 AA) / `#A1A1AA` in dark mode (7.8:1 AAA).
     * Metadata & Subtitles: Minimum `11px font-medium` or `font-semibold`.
4. **Restraint & Elimination of Noise (Dieter Rams & Chanel Principle)**:
   * *"Weniger, aber besser"* / *"Before leaving the house, look in the mirror and remove one accessory."*
   * Eliminate meaningless labels (no artificial "All" filters before real categories).
   * Eliminate zero-value badges, subtitles, decorative cards, and toast popups.

---

## 5. Multi-Platform Native Recipes

### 1. iOS (SwiftUI) Recipe
```swift
import SwiftUI

struct RamsianView: View {
    @State private var takeRateIndex: Int = 3
    let rates = [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 3.00]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Brand Header
                HStack(spacing: 6) {
                    Text("ramsian")
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
fun RamsianScreen() {
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
                text = "ramsian",
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

## 6. Sibling Craft Skills Ecosystem

This master skill is designed to work in synergy with the verified skills in `.agents/skills/`:

| Skill | Role & Domain | Authority & Standard |
| :--- | :--- | :--- |
| **`frontend-design`** | Anti-AI-slop, intentional restraint, avoiding templated card kits, Chanel rule ("remove one accessory") | Anthropic Claude Official Standard |
| **`apple-design`** | Fluid physical motion, instant response on pointerdown, 1:1 direct tracking, interruptibility | Apple WWDC *Designing Fluid Interfaces* |
| **`emil-design-eng`** | Unseen details compound, micro-interactions, frequency-based animation decisions, markdown review tables | Emil Kowalski ([animations.dev](https://animations.dev)) |
| **`single-surface-design`** | Flat `#FFFFFF` canvas, hairline dividers over cards, negative-margin interactive rows | Rezervehere Single-Surface Standard |
| **`writing-for-agents`** | Context pointers, leading words, high-demand checkable completion bounds, no-op pruning | Matt Pocock ([mattpocock/skills](https://github.com/mattpocock/skills)) |
| **`verify`** | Testing discipline, observable gates, zero unverified claims | Agent Verification Standard |
| **`bun-runtime-guardrails`** | High-performance HTTP server, zero runtime warnings, clean asset serving | Bun Runtime Standard |

---

## 7. AI Agent Pre-Flight Self-Audit Checklist

Before outputting code, verify that:
* [ ] Consulted relevant sibling skills (`frontend-design`, `apple-design`, `emil-design-eng`, `writing-for-agents`).
* [ ] The background is a single flat surface (`#FFFFFF` in light mode, `#09090B` in dark mode).
* [ ] Zero containers are nested inside cards. All metrics and services sit directly on the flat surface.
* [ ] **Strict Zero-Badge Policy**: zero decorative badges, module count pills (e.g. no `10 Modules`), tags, or meta-chips. Only the functional chart trend delta badge is permitted.
* [ ] **Strict Zero-Yapping**: section headers are 1-word titles only (`Volume`, `Craft`, `Services`, `Controls`), with zero explanatory subtitle sentences.
* [ ] **Zero Toast Spam**: never trigger floating toast notification banners on button clicks.
* [ ] Brand logo is strictly `rezervehere` / `ramsian` in all-lowercase bold `Cabinet Grotesk` aligned on the baseline.
* [ ] Zero emojis (🚀, 📈, ✨) appear anywhere in the UI.
* [ ] All icons are monochrome vector strokes (`currentColor`).
* [ ] Strict Semantic Polarity: switches are **Green when ON** (`#10B981`) and **Red when OFF** (`#EF4444`). Never black/gray darkening.
* [ ] "Bigger = Green, Smaller = Red" logic applied consistently across all metric deltas, sliders, and chart trends.
* [ ] Zero Self-Explaining Redundancy: switches have zero adjacent `ON`/`OFF` duplicate text or dots; trend buttons use directional arrows without redundant dots.
* [ ] Strict 1-Word Standard: all categories, metrics, and actions use concise 1-word tokens (`Volume`, `Ticket`, `Rate`, `Service`, `Copy`, `Craft`).
* [ ] Diverse Architectural Scale: includes big widgets (Full Month Calendar & Schedule), medium consoles (Level faders, Station matrix, Ledger), and small tactile controls.
* [ ] Search capsule adheres to the 60px height with sliding highlight pill and auto-advance flow (`Where` ➡️ `When` ➡️ `Service`).
* [ ] Siri focal wheel translation follows $\text{translateX} = 60\text{px} - (i \times 60\text{px})$ with $z\text{-index } 0$ focus box and $z\text{-index } 10$ numbers.
* [ ] Sliders and progress bars have zero stroke borders (`border: none !important`).
* [ ] Trend badges use high-contrast emerald (`#047857`) / rose (`#BE123C`) tokens without muddy colors.
* [ ] **Concentric Corner Radius Law**: Verified that $R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$ for all nested elements (e.g. 24px outer - 12px padding = 12px inner; 28px outer - 16px padding = 12px inner). Zero pinched corners.
* [ ] **High-Contrast Typography (WCAG AA/AAA)**: All text meets minimum 4.5:1 (primary 16:1, secondary 13:1, muted 7:1; dark mode 7.8:1). Subtitles/metadata minimum 11px font-medium.
* [ ] **No Meaningless "All" Pill**: Category filters present domain categories directly without an artificial "All" pill.
* [ ] **Bare-Bone Skeleton Loading Standard**: Layouts provide concentric theme-aware sweeping skeletons with zero blank voids or layout shifts, plus a permanent showcase element ("one which doesn't disappear") in the catalog.
* [ ] **Contained Progress Line Standard**: Progress lines are never wider or thicker than their ground track (`max-width: 100%`, `overflow-hidden`), progressing from left to right with subtle dark contrast (slightly darker than ground, zero pitch-black `#111827`).


