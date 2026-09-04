---
name: frontend-design
description: >
  Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one.
  Helps with aesthetic direction, typography, and making choices that don't read as generic AI slop.
  Official Anthropic Claude frontend design standard adapted for Rezervehere and Ramsian.
---

# Frontend Design

Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified.

**Canonical Design System Reference:**
See [`./DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for local color tokens, component patterns, and banned patterns.

---

## Ground your designs in the subject matter

If the brief does not identify what the product or subject matter is, identify it yourself before designing, and confirm with the client. You can come up with one concrete subject, the design's audience, and the design's primary job, as a proposal. If there's any information in your memory about the client's preferences or context about what they're building, use that as a hint. The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from — a design for a toy for girls aged 8–11 will be very aesthetically different from a dashboard for financial analysts. Build with the brief's real content and subject matter throughout.

---

## Design principles

For web designs, the hero is the first thing viewers will see. Open with the most characteristic thing in the subject's world, in the form that is most appropriate: a headline, an image, an animation, a live demo, an interactive moment, or other treatments. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option.

Typography carries the personality of the page. You don't need a different typeface for display or headline text and body content: use one family or two, and if two, make them clearly distinct.

Choose your typefaces deliberately, not the default families you would reach for on any other project, and set a clear type scale following the default guidance of The Elements of Typographic Style with intentional weights, widths, and spacing. When type is used as a headline or visual element, use the type treatment itself as an active part of the design, not a neutral delivery vehicle for the content.

Default to line lengths of less than 80 characters. Serif typefaces can have slightly longer line lengths; give serif body text slightly more line-height than a sans-serif.

### Anti-AI-Slop Typographic Checklist:
Avoid these default typographic treatments; they are the commonest tells of a generated page:
- **Accenting just a single word or phrase in a headline**, like putting one word in italic/bold or a different color.
- **Using all caps for labels** or tracked-out ALL-CAPS eyebrow labels above every heading.
- **Adding unnecessary typographic labels or subtitles above content** (e.g. meta descriptions, "10 Modules", "Overview").
- **Meta strings joined with middle dots** ('A · B · C').
- **Labels built as 'WORD — fragment'** with a spaced em dash.
- **Numbered markers (01 / 02 / 03)** unless the content actually is a strict chronological sequence.

Visual structure is information. Structural devices like outlines, borders, numbering, eyebrows, dividers, labels, etc., encode useful information about the content rather than decorate it.

Use non-user-triggered motion sparingly and deliberately, only to draw attention. A single orchestrated moment — one page-load sequence or one reveal — lands better than scattered effects; fade-and-slide-up entrances on each section and hover transitions on every card are the generic default and read as AI-generated. Motion that answers a person's action (opening, expanding, confirming) is welcome when it shows what changed.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy and placeholder content. Copy can make a design feel as templated as the design itself. See the below section on writing for more guidance.

---

## Process: plan, review against the brief, build, critique

For calibration, AI-generated design right now clusters around some traits:
1. A warm cream background (near `#F4F1EA`) with a high-contrast serif display and a terracotta or warm-clay accent (often near `#D97757`);
2. A near-black background with a single bright acid-green or vermilion accent;
3. A broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns;
4. **The SaaS-card kit**: content chopped into identical rounded cards, container-in-container nesting, one border-radius on everything regardless of hierarchy, the same soft grey shadow (`rgba(0,0,0,.1)`) under each, and gradient washes as decoration;
5. Template chrome that appears whatever the subject: tracked-out ALL-CAPS eyebrows, middle dots, artificial badges, tinted near-black (`#0B0B0B`) standing in for black, a monospace face for small data labels, a '→' appended to button text.

Where the brief pins down a visual direction, follow it exactly — the brief's own words always win. Where it leaves an axis free, don't spend that freedom on one of these defaults.

Work in two passes. First, brainstorm a short design plan based on the client's design brief: create a compact token system with color, type, layout, and principles.
- **Color**: describe the core base palette as 4–6 named hex values.
- **Type**: the typefaces and their roles.
- **Layout**: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare.
- **Principles**: the high-level guidance for what makes this page unique.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page rather than a choice made for this specific brief — revise that part, say what you changed and why.

---

## Restraint and self-critique

Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected, visually accessible, harmonious color palettes.

Consider Chanel's advice: **before leaving the house, take a look in the mirror and remove one accessory.**

---

## Writing in design

Words appear in a design for one reason: to make it easier to understand and use. They are design content, not decoration. Bring the same intentionality and minimalism to copywriting that you would bring to spacing and color.

- **Write from the end user's perspective.** Name things by what users understand in simple language, not by system architecture.
- **Use active voice as default.** A CTA says exactly what happens: "Save changes", not "Submit".
- **Strict 1-Word Tokens:** If an action, category, or metric can be communicated in one word, multiple words are prohibited (`Volume`, `Ticket`, `Rate`, `MRR`, `Service`, `Copy`).
- **Treat failure and emptiness as moments for direction, not mood.** Explain what went wrong and how to fix it plainly. Errors don't apologize.
- **Zero Toast Spam:** Actions complete in-place silently or with tactile button response; never pop up floating banners on every click.
