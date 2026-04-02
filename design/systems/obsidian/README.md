# Theme Obsidian

**Premium dark design system for Wedaster UI.**

Obsidian is a visually distinct theme built on top of the existing shadcn/ui component library in this monorepo. It does not replace any components — it reskins them through CSS custom properties and layered visual effects.

---

## Quick overview

| Aspect | Details |
|--------|---------|
| Package | `@wedaster/theme-obsidian` (planned) |
| Design file | `docs/theme-obsidian.pen` |
| Color model | OKLch (CSS native) |
| Fonts | Inter Display (headings), Inter (body), Geist Mono (code) |
| Accent | Gold `#EEBF3F` on deep dark canvas `#07090D` |
| Dark mode | Dark-only by design (no light variant) |

## Visual identity

Obsidian is inspired by **Apple Liquid Glass**, **Linear**, and **Vercel/Geist**. Three words define the brand:

- **Premium** — every element is intentional and polished
- **Material** — surfaces behave like glass and metal
- **Alive** — interactions feel physically grounded

### Signature effects

- **Liquid Glass** — 3-layer glass composition: backdrop blur + specular highlight + rim lighting
- **Neumorphic shadows** — single-direction (bottom-right) shadows mimicking a top-left light source
- **Platinum gradients** — metallic gradient text for headings (platinum-gold, pure platinum, gold)
- **Primary glow** — gold `box-shadow` halo on hover and focus states

## Color tokens

### Brand palette

| Token | Hex | Role |
|-------|-----|------|
| `--color-canvas` | `#07090D` | Deepest background |
| `--color-surface` | `#0F141C` | Cards, panels |
| `--color-surface-elevated` | `#141B25` | Popovers, elevated cards |
| `--color-surface-overlay` | `#192130` | Modals |
| `--color-primary` | `#EEBF3F` | Accent, buttons, active states |
| `--color-primary-light` | `#F5D06A` | Hover |
| `--color-primary-dark` | `#C89020` | Active/pressed |
| `--color-foreground` | `#F8FAFC` | Primary text |
| `--color-muted` | `#94A3B8` | Secondary text |

### Semantic colors

`--color-success` `#22C55E` · `--color-warning` `#F59E0B` · `--color-error` `#EF4444` · `--color-info` `#3B82F6`

Each semantic color has a `-muted` variant for tinted surface backgrounds.

### Glass & overlay

| Token | Value | Usage |
|-------|-------|-------|
| `--color-glass-base` | `rgba(15,20,28,0.60)` | Standard glass surface |
| `--color-glass-elevated` | `rgba(20,27,37,0.70)` | Elevated glass (modals) |
| `--color-border` | `rgba(248,250,252,0.10)` | Standard borders |
| `--color-border-emphasis` | `rgba(248,250,252,0.18)` | Focus/active borders |
| `--color-specular` | `rgba(248,250,252,0.12)` | Top-edge highlight |

## Typography scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | 72px | 800 | Hero headings (gradient) |
| H1 | 48px | 700 | Page headings |
| H2 | 36px | 700 | Section headings |
| H3 | 28px | 600 | Subsections |
| H4 | 22px | 600 | Card headings |
| Body | 16px | 400 | Default text |
| Body SM | 14px | 400 | Secondary text |
| Caption | 12px | 400 | Labels, metadata |
| Label | 11px | 500 | Uppercase labels (`letter-spacing: 0.08em`) |

## Spacing & radii

**Spacing** uses an 8px base: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`

**Border radii:**

| Token | px | Usage |
|-------|-----|-------|
| `--radius-sm` | 6 | Inputs, small buttons |
| `--radius-md` | 8 | Default buttons |
| `--radius-lg` | 12 | Cards |
| `--radius-xl` | 16 | Large cards, modals |
| `--radius-3xl` | 28 | Glass cards (signature) |
| `--radius-full` | 9999 | Pills, avatars |

## Component coverage

The design file documents the following components with variants and states:

- **Actions** — Button (Primary, Secondary, Ghost, Glass, Destructive, Link) in 4 sizes and 5 states
- **Forms** — Input, Textarea, Select, Checkbox, Radio, Toggle (all states)
- **Surfaces** — Card (Default, Glass, Glass Primary), Modal/Dialog, Alert/Toast (4 semantic types)
- **Navigation** — Tabs (Line, Pills, Glass), Badge (7 variants), Avatar (4 sizes + group), Tooltip
- **Data** — Skeleton loading, Stat Metrics
- **Premium** — Glass Hero Card, Gradient Heading Block, Bento Feature Cards, Pricing Cards

## Glass surface recipe

```css
/* Standard glass */
background: rgba(15, 20, 28, 0.60);
backdrop-filter: blur(12px) saturate(160%);
border: 1px solid rgba(248, 250, 252, 0.08);
box-shadow:
  5px 6px 20px rgba(0, 0, 0, 0.72),
  inset 0 1px 0 rgba(248, 250, 252, 0.10);
border-radius: 28px;
```

## Shadow system

Single-direction neumorphic shadows (bottom-right), 4 levels:

| Level | Offset | Blur | Usage |
|-------|--------|------|-------|
| SM | 3px 3px | 8px | Small elements |
| MD | 5px 6px | 16px | Cards, buttons |
| LG | 8px 10px | 28px | Elevated cards |
| XL | 12px 16px | 48px | Hero, featured |

## Architecture

Obsidian follows the multi-theme architecture described in [CLAUDE.md](../../CLAUDE.md):

```
packages/
  tokens/              Base/neutral token values
  theme-obsidian/      Obsidian CSS variable overrides (planned)
  ui-web/              Components — no changes needed
```

The theme works by overriding CSS custom properties. Components in `ui-web` remain untouched.

## Design file structure

Open `docs/theme-obsidian.pen` in Pencil to explore:

1. **Cover** — Brand identity
2. **Color System** — Full token palette with swatches
3. **Typography** — Type scale with live samples
4. **Effects & Materials** — Glass, shadows, glow, radii
5. **Surfaces & Cards** — Card variants, modal, alerts
6. **Navigation & Data** — Tabs, badges, avatars, tooltips, skeletons
7. **Forms** — Inputs, textarea, controls, selects
8. **Actions** — Button variants, sizes, states
9. **Premium** — Signature components (hero, pricing, stats, bento)
