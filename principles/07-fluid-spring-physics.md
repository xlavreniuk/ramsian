# Principle 7: Apple WWDC Fluid Spring Physics

## The Core Philosophy (WWDC 2018: Designing Fluid Interfaces)
An interface feels alive when motion:
1. Starts from the **current presentation value** (never the target value).
2. Inherits the user's **gesture velocity**.
3. Projects **momentum** forward naturally.
4. Is **100% interruptible and redirectable** at any millisecond without visual stutter.

---

## 1. Damping vs Response Parameters

Apple frames spring physics using two intuitive parameters:

1. **Damping Ratio ($\zeta$)**:
   * $\zeta = 1.0$ (**Critically Damped**): Reaches target as quickly as possible with zero bounce or overshoot. **Default for 90% of UI**.
   * $\zeta = 0.8$ (**Underdamped / Physical**): Slight natural overshoot. **Use only when gesture carried momentum (swipes, flicks, drag releases)**.
2. **Response ($T$)**:
   * Time in seconds to complete the primary motion path (typically `0.3s - 0.4s`).

---

## 2. Web Mapping (Motion / Framer Motion)

```ts
// 1. Standard UI Spring (Critically Damped — Clean & Professional)
export const springCriticallyDamped = {
  type: "spring",
  stiffness: 480,
  damping: 34,
  mass: 1,
};

// 2. Momentum-Driven Spring (Flick / Swipe Release)
export const springWithMomentum = {
  type: "spring",
  stiffness: 400,
  damping: 26,
  mass: 1,
};

// 3. Snappy Micro-Interactions (Toggles, Badges)
export const springSnappy = {
  type: "spring",
  stiffness: 550,
  damping: 30,
  mass: 0.8,
};
```

---

## 3. The Rules of Fluid Motion

* **Never lock out input during a transition**: Users must be able to tap or reverse direction while an animation is playing.
* **Never use fixed-duration CSS transitions on gesture releases**: A flicked drawer should coast on its release velocity, not slam into a 300ms linear ease.
* **Decompose 2D motion**: Animate X and Y springs independently so diagonal velocity doesn't distort.
