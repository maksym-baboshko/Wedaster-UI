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
  theme-default/     Default Wedaster design system package
  theme-obsidian/    Private placeholder for the next design system
  ui-native/         React Native scaffold — RESERVED for future work, do not modify
  tokens/            Internal semantic token foundation used by theme packages
  eslint-config/     Shared ESLint rules (base, react-internal, next)
  typescript-config/ Shared TypeScript configs (base, react-library, nextjs)
```

**Published packages:** `@wedaster/ui-web`, `@wedaster/theme-default`
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
| Component docs | Storybook 10 (react-vite, addon-docs, addon-a11y, addon-themes, test-runner) |
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
packages/ui-web/src/components/<category>/<name>.tsx
packages/ui-web/src/components/<category>/<name>.stories.tsx
packages/ui-web/src/components/<category>/<name>.test.tsx
packages/ui-web/src/components/<name>.ts          ← Optional flat re-export shim for generator compatibility
```

### `data-slot` attributes

Every component and its sub-components include `data-slot="<name>"` on the root element. This is for component identification, debugging, and CSS targeting. Always include it.

### Radix UI wiring

All interactive components wrap Radix UI primitives. Import from `radix-ui`:

```ts
import { Dialog as DialogPrimitive } from "radix-ui"
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

Consumers import styles in three layers:

```tsx
import "@wedaster/theme-default/styles.css"  // active design system
import "@wedaster/ui-web/styles.css"         // component + theme layer
import "@wedaster/ui-web/base.css"           // optional global base layer
```

`@wedaster/ui-web/globals.css` remains available as a compatibility alias for `styles.css` + `base.css`.

`packages/tokens/src/styles.css` is now an internal semantic foundation, not the consumer-facing theme entry. Public `theme-*` packages import that foundation, override the brand-specific values, and publish a bundled `dist/styles.css`.

Token categories: colors (background, foreground, primary, secondary, accent, muted, destructive, card, popover, border, input, ring, sidebar-*, chart-*), radius.

### Current multi-theme structure

```
packages/
  tokens/           ← Internal semantic foundation
  theme-default/    ← Publishable default Wedaster theme
  theme-obsidian/   ← Private placeholder for the next theme
  theme-[name]/     ← Additional themes
  ui-web/           ← Components — no changes needed
```

Each `theme-*` package exports a single bundled CSS file. Use `scripts/build-theme-css.mjs` to inline the internal token foundation into `dist/styles.css` before publishing.

### Dark mode

Dark mode is toggled via `.dark` class on the root element (managed by `next-themes` in the Next.js app). Not via `prefers-color-scheme` media query.

Portal-based components must inherit the active theme from tokens and should not hardcode a `dark` class internally.

---

## How to Add a Component

1. Scaffold with shadcn CLI:
   ```bash
   pnpm dlx shadcn@latest add <name> -c packages/ui-web
   ```

2. Move the implementation into `packages/ui-web/src/components/<category>/<name>.tsx`.

3. Add or update the Storybook story at `packages/ui-web/src/components/<category>/<name>.stories.tsx`.

4. Add or update the Vitest file at `packages/ui-web/src/components/<category>/<name>.test.tsx` for public behavior.

5. Export the component from `packages/ui-web/src/index.ts`.

6. Add the stable category entry to `packages/ui-web/tsup.config.ts`.

7. If the component should work with generator-created flat imports, add a thin shim at `packages/ui-web/src/components/<name>.ts`.

8. Run the full quality gate:
   ```bash
   pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm --filter storybook test:storybook
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
     "type": "module",
     "scripts": {
       "build": "node ../../scripts/build-theme-css.mjs src/styles.css dist/styles.css",
       "dev": "node ../../scripts/build-theme-css.mjs src/styles.css dist/styles.css --watch"
     },
     "dependencies": {
       "@wedaster/tokens": "workspace:*"
     },
     "exports": { "./styles.css": "./dist/styles.css" }
   }
   ```

3. Add to `pnpm-workspace.yaml` (already covered by `packages/*`).

4. Add to `.changeset/config.json` linked array if it should version with `ui-web`.

5. Build the bundled stylesheet before publishing:
   ```bash
   pnpm --filter @wedaster/theme-<name> build
   ```

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
pnpm --filter @wedaster/ui-web test:watch    # Watch mode
pnpm --filter @wedaster/ui-web test:coverage # Coverage report (minimum 80% on statements/branches/functions/lines)
pnpm --filter storybook test:storybook       # Storybook interaction/docs test runner

# Build
pnpm build                         # Build all
pnpm --filter @wedaster/ui-web build         # Library only

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
| `packages/ui-web/src/styles/styles.css` | Component/theme layer (`@theme inline`, Tailwind imports, sources) |
| `packages/ui-web/src/styles/base.css` | Optional global base layer (`body`, `*`) |
| `packages/ui-web/src/styles/globals.css` | Compatibility alias for `styles.css` + `base.css` |
| `packages/tokens/src/styles.css` | Internal semantic token foundation shared by theme packages |
| `packages/theme-default/src/styles.css` | Current default Wedaster theme overrides |
| `packages/theme-obsidian/src/styles.css` | Private scaffold for the next theme |
| `scripts/build-theme-css.mjs` | Bundles theme CSS by inlining the internal token foundation |
| `packages/ui-web/tsup.config.ts` | Library build config (entry points, ESM, declarations) |
| `packages/ui-web/components.json` | shadcn CLI config |
| `turbo.json` | Task dependency graph and caching rules |
| `pnpm-workspace.yaml` | Workspace package globs |
| `.changeset/config.json` | Changesets config — linked publishable packages + public access |
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
- **Changesets access is already canonicalized** — keep `.changeset/config.json` on `"access": "public"` unless there is an explicit repo-wide decision to change the publishing model.
- **Update documentation when behavior or contract changes** — if a task changes package names, public imports/exports, styling entrypoints, testing requirements, release workflow, or other developer-facing behavior, update the relevant docs in the same task (`README.md`, package READMEs, `AGENTS.md`, `CLAUDE.md`, or config-adjacent docs).
- **Update ADRs when architecture changes** — if a task changes an important architectural decision such as package boundaries, theme model, build system, release strategy, testing architecture, or other long-lived repo structure, update the relevant file in `docs/adr/` or add a new ADR when the decision is genuinely new.
- **Keep ADRs concise and decision-focused** — ADRs should stay short, practical records of `Context`, `Decision`, and `Consequences`, not duplicate the full README.
