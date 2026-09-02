# Single-Surface Design System

> Universal Apple & Linear single-surface architecture, stroke-free controls, Siri focal pickers, and fluid spring motion design system by **[rezervehere](https://rezervehere.com)** for **Web**, **iOS (SwiftUI)**, **Android (Jetpack Compose)**, and **React Native** AI agents.

[![Live Showroom](https://img.shields.io/badge/Live_Showroom-GitHub_Pages-black?style=flat-square&logo=github)](https://xlavreniuk.github.io/single-surface-design/)
[![Skill Spec](https://img.shields.io/badge/AI_Skill-SKILL.md-emerald?style=flat-square)](SKILL.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

![Single-Surface Design System Preview](assets/preview.png)

---

## ⚡ 2-Command Quickstart

### 1. View Interactive Showroom (Instant)
View live on GitHub Pages: **[https://xlavreniuk.github.io/single-surface-design/](https://xlavreniuk.github.io/single-surface-design/)**

Or run locally with Bun:
```bash
bun run dev
```

---

### 2. Install as Skill for AI Coding Agents

Install the master `SKILL.md` into any AI workspace (Antigravity, Claude Code, Cursor, Codex):

```bash
# Antigravity / Gemini CLI
curl -sSL https://raw.githubusercontent.com/xlavreniuk/single-surface-design/main/SKILL.md -o .agents/skills/single-surface-design/SKILL.md

# Claude Code
mkdir -p .claude/skills/single-surface-design && curl -sSL https://raw.githubusercontent.com/xlavreniuk/single-surface-design/main/SKILL.md -o .claude/skills/single-surface-design/SKILL.md
```

Once installed, prompt your AI agent:
> *"Build the settings screen using the single-surface-design skill."*

---

## 🏛️ Core Design Invariants & Strict Negative Constraints

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

1. 🚫 **Zero Container Nesting**: Never place gray cards inside white cards inside outer boxed cards. Controls sit directly on flat `#FFFFFF` (or dark `#09090B`).
2. 🚫 **No Yapping / Zero-Slop Text**: Ban dramatic marketing fluff (*"Live Radar & Lead Intelligence"*). Use 1-word direct functional tokens (`Wheel`, `Slider`, `Controls`, `Where`, `When`, `Service`).
3. 🚫 **Zero Emojis in UI**: Never use emojis in buttons, tabs, badges, or controls. Platform-native vector icons only (Lucide, SF Symbols, Material Symbols).
4. 🚫 **Monochrome Icons Only**: 100% monochrome vector strokes (`currentColor`). Color is strictly reserved for functional state badges (emerald for growth, rose for downturns).
5. 🔤 **Authentic Brand Typography**: Brand logo and display headers use **`Cabinet Grotesk`** (800/700 weight, strictly all-lowercase, `-0.025em` tracking). Tabular numerals use **`JetBrains Mono`**. UI body uses **`Plus Jakarta Sans`** or **`Inter`**.
6. 🔍 **60px Search Bar Composer**: 3-step auto-advance sequence (`Where` ➡️ `When` ➡️ `Type of service`) with physical sliding highlight pill and interactive month calendar / city popups.
7. 🎡 **Siri 3-Item Focal Wheel**: Centered $z\text{-index } 0$ focus box with $z\text{-index } 10$ sliding numeral track following $\text{translateX} = 60\text{px} - (i \times 60\text{px})$.
8. 📈 **Dual-Trend High-Contrast Data**: Emerald (`#047857`) / Rose (`#BE123C`) status badges with subpixel precision hover curve tracking.

---

## 📸 Automated Screenshot Utility

Capture pixel-perfect 2x Retina screenshots anytime:
```bash
bun run screenshot
```

---

## 📱 Multi-Platform Matrix

| Platform | Framework | Core Implementation |
| :--- | :--- | :--- |
| **Web** | React / Next.js / Tailwind | `divide-y divide-[#ECECEC]`, `-mx-3 px-3 py-3 hover:bg-[#F7F7F8]`, stroke-free sliders |
| **iOS** | SwiftUI | `.background(Color.white)`, `.buttonStyle(SpringScaleButtonStyle())`, Apple springs |
| **Android** | Jetpack Compose | `Surface(color = Color.White)`, `HorizontalDivider()`, `spring(dampingRatio = ...)` |
| **Cross-Platform** | React Native / Expo | `reanimated` spring physics, stroke-free sliders, flat divider lists |

---

## 📄 License
MIT © [Andrii Lavreniuk](https://github.com/xlavreniuk)
