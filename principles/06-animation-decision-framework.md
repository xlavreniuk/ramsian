# Principle 6: The Animation Decision Framework

Before implementing any animation, answer these four questions in strict sequence:

---

## Step 1: Should this animate at all?

Ask: **How often will the user encounter this action?**

* **100+ times/day** (keyboard shortcuts, command palette, global tab switching): **NO ANIMATION. EVER.** Instant state change.
* **Tens of times/day** (list item hover, table row selection): **Near-imperceptible** (`100ms - 150ms ease-out` on opacity/transform).
* **Occasional** (modals, drawers, notifications): **Standard animation** (critically damped spring or `200ms ease-out`).
* **Rare / First-time** (onboarding, purchase celebration, verified checkmark): **Delight budget** lives here.

---

## Step 2: What is the purpose of the motion?

Every animation must fulfill at least one valid UX objective:
* **Feedback**: Confirming the system registered the user's intent (e.g. `active:scale-[0.97]` on button press).
* **Spatial Consistency**: Showing where something arrived from (e.g. sheet slides up from bottom).
* **State Indication**: Making a toggle or tab selection visibly morph into place.
* **Preventing Jarring Teleportation**: Smoothing an element that would otherwise snap unnaturally.

> If the only answer is *"because it looks cool"* on a frequently-used element, do not animate.

---

## Step 3: Pick the Right Tool (Cheapest that Works)

| Need | Recommended Tool |
|---|---|
| Hover, active press, color transition | **CSS transition** (`transition: transform 150ms ease-out`) |
| Mount entrance with static trigger | **CSS `@starting-style`** / Tailwind `animate-in` |
| Continuous loading or spinner | **CSS `@keyframes`** (runs off main thread) |
| Layout morphs, gesture drags, exit animations | **Motion (`motion/react`)** |

---

## Step 4: Pick Properties & Easing

* **Properties**: Exclusively `transform` and `opacity`. (Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`).
* **Entrances**: `ease-out` or Critically Damped Spring (`stiffness: 480, damping: 34`).
* **Exits**: `ease-in` or Fast Ease-Out (`150ms ease-out, opacity: 0, scale: 0.95`).
* **Hover**: `ease` or `ease-out` (`100ms - 150ms`).
