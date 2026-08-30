# Principle 4: Hardware GPU Motion & Siri Focal Pickers

## 1. Hardware GPU Compositing
On mobile browsers, `backdrop-filter: blur(...)` combined with fixed positioning can trigger high CPU draw and frame stutter during fast scrolls.

**Solution**:
Force the browser to allocate a dedicated GPU rasterization layer by adding `[transform:translateZ(0)]`:
```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md [transform:translateZ(0)] border-b border-[#ECECEC] h-16 flex items-center shadow-2xs">
  {/* Content */}
</header>
```

---

## 2. Siri 3-Item Windowed Focal Wheel Pickers
* **Focal Scope**: Display only 3 items (previous adjacent step, center focus, next adjacent step).
* **Spring Animation Physics**: Use `motion/react` spring physics:
  ```ts
  transition: { type: "spring", stiffness: 480, damping: 34 }
  ```
* **Directional Sliding**: Forward clicks slide right-to-left; backward clicks slide left-to-right.
* **Direct Value Typing**: Center focus pill allows typing custom decimal values with instant bidirectional state recalculation.
