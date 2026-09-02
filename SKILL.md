---
name: single-surface-design
description: Universal Apple & Linear single-surface architecture, stroke-free controls, Siri focal pickers, and fluid spring motion design system for Web, iOS, Android, and React Native AI agents.
---

# Single-Surface Design System — Master Engineering Standard

This skill is the universal interface design standard for high-craft digital products across **Web (React/Next.js/Tailwind)**, **iOS (SwiftUI)**, **Android (Jetpack Compose)**, and **Cross-Platform (React Native/Flutter)**.

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

## 1. Core Invariants (Zero Exceptions)

1. **Flat Single-Surface Canvas**:
   * Interfaces sit directly on pure `#FFFFFF` (or dark `#09090B`).
   * **NEVER** nest containers inside containers (no gray cards inside white cards inside outer border cards).
2. **Dividers Over Card Boxes**:
   * Separate sections using hairline dividers (`border-[#ECECEC]` or `divide-y divide-[#ECECEC]`), never individual floating boxes.
3. **Negative-Margin Interactive Rows**:
   * Interactive list items sit edge-to-edge. On hover/press, they expand into negative padding fills (`py-3 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] active:scale-[0.98]`).
4. **Stroke-Free Controls**:
   * Sliders and progress tracks have **zero border strokes** (`border: none !important`).
5. **Fluid Spring Motion**:
   * Physical Apple spring curves on all interactive elements (`cubic-bezier(0.34, 1.56, 0.64, 1)` or SwiftUI `response: 0.35, dampingFraction: 1.0`).
6. **Dual-Trend Data Visualization**:
   * Upward growth: **Emerald Green (`#10B981`)** with glowing gradient fill and `+X%` badge.
   * Downward trend: **Rose Red (`#F43F5E`)** with crimson gradient fill and `-X%` badge.
   * Always include clear numerical Y-axis and X-axis markings.
7. **Live Animated Numbers**:
   * Numerical counters count smoothly between state changes using cubic interpolation (`requestAnimationFrame`).
8. **No Emojis in Production UI**:
   * Always use platform-native iconography (Lucide on Web, SF Symbols on iOS, Material Symbols on Android).

---

## 2. Universal Design Tokens

| Token | Web / Tailwind | iOS (SwiftUI) | Android (Compose) | React Native |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas Background** | `bg-[#FFFFFF]` | `Color.white` | `Color(0xFFFFFFFF)` | `#FFFFFF` |
| **Primary Text** | `text-[#111827]` | `Color(uiColor: .label)` | `Color(0xFF111827)` | `#111827` |
| **Secondary Text** | `text-[#4B5563]` | `Color(uiColor: .secondaryLabel)` | `Color(0xFF4B5563)` | `#4B5563` |
| **Muted Text** | `text-[#6B7280]` | `Color(uiColor: .tertiaryLabel)` | `Color(0xFF6B7280)` | `#6B7280` |
| **Subtle Hairline** | `border-[#ECECEC]` | `Color(uiColor: .systemGray5)` | `Color(0xFFECECEC)` | `#ECECEC` |
| **Hover / Pill Fill** | `bg-[#F7F7F8]` | `Color(uiColor: .systemGray6)` | `Color(0xFFF7F7F8)` | `#F7F7F8` |
| **Success / Trend Up**| `text-[#10B981]` | `Color.green` | `Color(0xFF10B981)` | `#10B981` |
| **Danger / Trend Down**| `text-[#F43F5E]` | `Color.red` | `Color(0xFFF43F5E)` | `#F43F5E` |
| **Standard Button** | `h-9 px-4 rounded-full text-xs font-semibold` | `.frame(height: 36).clipShape(Capsule())` | `Modifier.height(36.dp)` | `height: 36, borderRadius: 18` |

---

## 3. Platform Implementations

### A. Web (React / Next.js / Tailwind CSS)

#### 1. Interactive Flat Divider List
```tsx
<div className="divide-y divide-[#ECECEC] w-full">
  {items.map((item) => (
    <div
      key={item.id}
      onClick={() => handleSelect(item)}
      className="py-3.5 px-3 -mx-3 rounded-2xl hover:bg-[#F7F7F8] active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-between"
    >
      <div>
        <h4 className="font-semibold text-xs text-[#111827]">{item.title}</h4>
        <p className="text-[11px] text-[#6B7280]">{item.subtitle}</p>
      </div>
      <span className="font-mono font-bold text-xs text-[#111827]">{item.value}</span>
    </div>
  ))}
</div>
```

#### 2. Stroke-Free Apple Range Slider
```css
input[type=range] {
  -webkit-appearance: none;
  appearance: none;
  background: #EBECEE;
  height: 6px;
  border-radius: 9999px;
  outline: none;
  border: none !important;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #111827;
  border-radius: 50%;
  border: 2px solid #FFFFFF !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}
input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.18); }
input[type=range]::-webkit-slider-thumb:active { transform: scale(0.92); }
```

#### 3. Live Animated Count-Up Number (TypeScript)
```ts
function animateValue(element: HTMLElement, start: number, end: number, duration = 400, prefix = '$') {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = start + (end - start) * easeProgress;
    element.innerText = prefix + (Number.isInteger(end) ? Math.round(current).toLocaleString() : current.toFixed(2));
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}
```

---

### B. iOS (SwiftUI)

#### 1. Flat Single-Surface List Row
```swift
struct SingleSurfaceRow: View {
    let title: String
    let subtitle: String
    let value: String

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(Color(uiColor: .label))
                Text(subtitle)
                    .font(.system(size: 11, weight: .regular))
                    .foregroundColor(Color(uiColor: .secondaryLabel))
            }
            Spacer()
            Text(value)
                .font(.system(size: 13, weight: .bold, design: .monospaced))
                .foregroundColor(Color(uiColor: .label))
        }
        .padding(.vertical, 10)
        .padding(.horizontal, 12)
        .background(Color.white)
        .contentShape(Rectangle())
    }
}
```

#### 2. Apple Spring Scale Button Style
```swift
struct SpringScaleButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.spring(response: 0.35, dampingFraction: 1.0), value: configuration.isPressed)
    }
}

// Usage:
Button("Confirm") {
    // Action
}
.buttonStyle(SpringScaleButtonStyle())
.frame(height: 36)
.padding(.horizontal, 16)
.background(Color(uiColor: .label))
.foregroundColor(.white)
.clipShape(Capsule())
```

---

### C. Android (Jetpack Compose)

#### 1. Single-Surface Divider Row
```kotlin
@Composable
fun SingleSurfaceItemRow(
    title: String,
    subtitle: String,
    value: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = ripple(color = Color(0xFFF7F7F8)),
                onClick = onClick
            )
            .padding(horizontal = 12.dp, vertical = 10.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
            Text(
                text = title,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color(0xFF111827)
            )
            Text(
                text = subtitle,
                fontSize = 11.sp,
                fontWeight = FontWeight.Normal,
                color = Color(0xFF6B7280)
            )
        }
        Text(
            text = value,
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Monospace,
            color = Color(0xFF111827)
        )
    }
}
```

---

### D. React Native / Expo

```tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function SingleSurfaceButton({ title, onPress }: { title: string; onPress: () => void }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95, { damping: 15, stiffness: 200 }))}
      onPressOut={() => (scale.value = withSpring(1, { damping: 15, stiffness: 200 }))}
      onPress={onPress}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
```

---

## 4. Prompting Guide for Other AI Agents

When instructing another AI coding agent (e.g. Gemini, Claude, Cursor, Copilot, ChatGPT) to design an interface, prompt it with:

> *"Follow the single-surface-design standard: flat #FFFFFF canvas with zero nested card containers, hairline dividers, stroke-free sliders, Siri 3-item focal wheels, animated counting numerals, and Apple spring physics. Never use emojis in UI controls."*
