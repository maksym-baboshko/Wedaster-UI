# Wedaster UI — Agent Context

This document is the primary context file for AI coding agents working in this repository. Read this before making any changes.

---

## What This Repo Is

**Wedaster UI** is a pnpm + Turborepo monorepo containing a React component library (`packages/ui-web`) and supporting infrastructure. The library is built on Radix UI primitives, Tailwind CSS v4, and shadcn/ui patterns. It is designed to support **multiple independent design systems (themes)** on top of a single shared component foundation — no component code changes needed when switching themes.

The library is **public open-source**, versioned with Changesets, and targets React 19.

---

## Repository Map

```
apps/
  web/               Next.js 16 app — primary consumer reference
  storybook/         Storybook 10 — component docs and visual baseline
  react-smoke/       Vite + React — smoke tests for non-Next.js usage

packages/
  ui-web/            Main component library (the publishable package)
  ui-native/         React Native scaffold — RESERVED for future work, do not modify
  tokens/            Base CSS custom properties (design tokens)
  eslint-config/     Shared ESLint rules (base, react-internal, next)
  typescript-config/ Shared TypeScript configs (base, react-library, nextjs)
```

**Published packages:** `@wedaster/ui-web`, `@wedaster/tokens`
**Apps are private** and never published.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Package manager | pnpm 9 |
| Monorepo orchestration | Turborepo 2 |
| Framework | React 19 |
| Component primitives | Radix UI (`radix-ui` v1.4) |
| Styling | Tailwind CSS v4 + PostCSS |
| Variant management | class-variance-authority (CVA) |
| Class utilities | clsx + tailwind-merge (via `cn()`) |
| Design tokens | CSS custom properties, OKLch color format |
| Icons | @hugeicons/react |
| Animations | tw-animate-css |
| Toasts | sonner |
| Validation (future) | zod |
| Library build | tsup (ESM only, full `.d.ts`) |
| Testing | Vitest 4 + React Testing Library + jsdom |
| Component docs | Storybook 10 (react-vite, addon-docs, addon-a11y, addon-themes) |
| Linting | ESLint + Prettier (prettier-plugin-tailwindcss) |
| Git hooks | Husky (pre-commit: lint; pre-push: typecheck+lint+test+build) |
| Versioning | Changesets |
| CI/CD | GitHub Actions (ci.yml, release.yml) |

---

## Key Patterns

### `cn()` — className composition

All components use `cn()` from `packages/ui-web/src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Always use `cn()` for merging Tailwind classes. Never concatenate strings directly.

### CVA — component variants

Variant components define their variants with CVA:

```ts
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "...", ghost: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
})

// Component extends VariantProps<typeof buttonVariants>
```

Export the variants object as well as the component (consumers may need it for composition).

### Component structure convention

```
packages/ui-web/src/components/<category>/<name>/
  <name>.tsx            Component implementation
  <name>.stories.tsx    Storybook stories
  <name>.test.tsx       Vitest tests (for components with public API/behavior)
```

### `data-slot` attributes

Every component and its sub-components include `data-slot="<name>"` on the root element. This is for component identification, debugging, and CSS targeting. Always include it.

### Radix UI wiring

All interactive components wrap Radix UI primitives. Import from `radix-ui`:

```ts
import { Root, Trigger, Content } from "radix-ui/react-dialog"
```

### OKLch design tokens

All colors are defined as CSS custom properties in OKLch format. Components reference semantic tokens (e.g. `--primary`, `--background`, `--border`) via Tailwind's `@theme inline` mapping — never hardcode color values in component classes.

---

## Component Categories

```
primitives/   Button, Checkbox, Input, Label, Textarea
forms/        RadioGroup, Select, Switch
layout/       Card (compound: CardHeader, CardContent, CardFooter, etc.)
navigation/   Tabs
overlays/     Dialog, Sheet, Popover, DropdownMenu, Tooltip
display/      Badge, Skeleton, Table
feedback/     Toaster (sonner wrapper)
```

---

## Theming Architecture

**Core principle:** components reference CSS custom properties → changing token values changes the entire visual design → no component code changes needed.

### Current state

All tokens are in `packages/tokens/src/styles.css`. Light mode in `:root`, dark mode in `.dark`.

Token categories: colors (background, foreground, primary, secondary, accent, muted, destructive, card, popover, border, input, ring, sidebar-*, chart-*), radius.

### Planned multi-theme structure

```
packages/
  tokens/           ← Base/neutral values
  theme-default/    ← First design system (current green brand)
  theme-[name]/     ← Additional themes
  ui-web/           ← Components — no changes needed
```

Each `theme-*` package exports a single CSS file with variable overrides. No build step required.

### Dark mode

Dark mode is toggled via `.dark` class on the root element (managed by `next-themes` in the Next.js app). Not via `prefers-color-scheme` media query.

---

## How to Add a Component

1. Scaffold with shadcn CLI:
   ```bash
   pnpm dlx shadcn@latest add <name> -c packages/ui-web
   ```

2. Move to the correct category directory under `packages/ui-web/src/components/<category>/<name>/`.

3. Export from `packages/ui-web/src/index.ts`.

4. Add story file (`<name>.stories.tsx`) with `tags: ["autodocs"]` and at minimum a `Default` and `AllVariants` story.

5. Add test file (`<name>.test.tsx`) covering rendering, keyboard interaction, and disabled states if applicable.

6. Run the full quality gate:
   ```bash
   pnpm lint && pnpm typecheck && pnpm test && pnpm build
   ```

---

## How to Add a Theme Package

1. Create `packages/theme-<name>/src/styles.css` with CSS variable overrides:
   ```css
   @import "@wedaster/tokens/styles.css";
   :root {
     --primary: oklch(/* value */);
     /* override any token */
   }
   .dark {
     --primary: oklch(/* dark value */);
   }
   ```

2. Create `packages/theme-<name>/package.json`:
   ```json
   {
     "name": "@wedaster/theme-<name>",
     "version": "0.0.1",
     "exports": { "./styles.css": "./src/styles.css" }
   }
   ```

3. Add to `pnpm-workspace.yaml` (already covered by `packages/*`).

4. Add to `.changeset/config.json` linked array if it should version with `ui-web`.

---

## Build & Test Commands

```bash
# Development
pnpm dev                           # Start all dev servers
pnpm --filter storybook dev        # Storybook only (port 6006)
pnpm --filter web dev              # Next.js only
pnpm --filter react-smoke dev      # Vite smoke app only

# Quality
pnpm lint                          # ESLint workspace
pnpm format                        # Prettier workspace
pnpm typecheck                     # TypeScript workspace
pnpm test                          # Vitest workspace
pnpm --filter ui-web test:watch    # Watch mode
pnpm --filter ui-web test:coverage # Coverage report

# Build
pnpm build                         # Build all
pnpm --filter ui-web build         # Library only

# Release
pnpm changeset                     # Create changeset
pnpm version                       # Bump versions + update changelogs
pnpm release                       # Build + publish to npm
```

---

## Critical Files Reference

| File | Purpose |
|------|---------|
| `packages/ui-web/src/index.ts` | Barrel export — all public components exported here |
| `packages/ui-web/src/lib/utils.ts` | `cn()` utility |
| `packages/ui-web/src/styles/globals.css` | Tailwind imports, `@theme inline` mapping, base layer |
| `packages/tokens/src/styles.css` | All CSS custom property token definitions |
| `packages/ui-web/tsup.config.ts` | Library build config (entry points, ESM, declarations) |
| `packages/ui-web/components.json` | shadcn CLI config |
| `turbo.json` | Task dependency graph and caching rules |
| `pnpm-workspace.yaml` | Workspace package globs |
| `.changeset/config.json` | Changesets config — **`access` must be `"public"` for npm** |
| `.github/workflows/ci.yml` | CI pipeline (typecheck → lint → test → build) |
| `.github/workflows/release.yml` | Release automation via Changesets action |
| `.husky/pre-push` | Pre-push gate: typecheck + lint + test + build |

---

## Important Constraints

- **Do not modify `packages/ui-native`** — reserved for future React Native work.
- **Do not remove `zod`** from `packages/ui-web` dependencies — reserved for future use.
- **Always use `cn()`** for className composition in components.
- **Never hardcode colors** in component classes — always use semantic token-mapped Tailwind classes.
- **Every component must have `data-slot` attributes** on its root element and sub-components.
- **ESM only** — the library builds to ESM. Do not add CJS output without explicit discussion.
- **React 19 peer dependency** — do not downgrade.
- Before publishing to npm, `"access"` in `.changeset/config.json` must be set to `"public"`.
