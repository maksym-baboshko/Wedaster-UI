# Wedaster UI — Agent Context

This is the primary context file for AI coding agents working in this repository.

---

## What This Repo Is

**Wedaster UI** is a pnpm + Turborepo monorepo centered on a single publishable React component library: `@wedaster/ui-web`.

The library is built on:

- React 19
- Radix UI primitives
- Tailwind CSS v4
- shadcn/ui patterns

The current repository focus is:

1. keep `@wedaster/ui-web` aligned with the official `shadcn` `registry:ui` surface
2. build Wedaster’s own design language on top of that shared component foundation

This repo is **public open-source**, versioned with Changesets, and currently targets **one active Wedaster design system**.

---

## Repository Map

```text
apps/
  web/               Next.js 16 app — primary integration reference
  storybook/         Storybook 10 — docs and visual baseline
  react-smoke/       Vite + React — non-Next.js smoke app

packages/
  ui-web/            Main publishable component library
  eslint-config/     Shared ESLint rules
  typescript-config/ Shared TypeScript configs
```

**Published package:** `@wedaster/ui-web`

Apps are private and never published.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Package manager | pnpm 9 |
| Monorepo orchestration | Turborepo 2 |
| Framework | React 19 |
| Component primitives | `radix-ui` v1.4 |
| Styling | Tailwind CSS v4 + PostCSS |
| Variant management | class-variance-authority |
| Class utilities | clsx + tailwind-merge via `cn()` |
| Tokens | CSS custom properties in OKLch |
| Icons | `@hugeicons/react` |
| Charts | `recharts` |
| Forms | `react-hook-form`, `@hookform/resolvers` |
| Library build | tsup (ESM only, full `.d.ts`) |
| Testing | Vitest 4 + React Testing Library + jsdom |
| Component docs | Storybook 10 + test-runner |
| Linting | ESLint + Prettier |
| Versioning | Changesets |

---

## Key Patterns

### `cn()`

All class composition goes through `packages/ui-web/src/lib/utils.ts`.

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Never hand-roll conditional class string concatenation.

### CVA

Variant-heavy components use CVA and export their variants object alongside the component.

### Component structure

```text
packages/ui-web/src/components/<category>/<name>.tsx
packages/ui-web/src/components/<category>/<name>.stories.tsx
packages/ui-web/src/components/<category>/<name>.test.tsx
packages/ui-web/src/components/<name>.ts
```

The flat `src/components/<name>.ts` file is only a thin generator-compat re-export shim.

### `data-slot`

Every component root and major compound part must expose a `data-slot="<name>"` attribute.

### Styling

- use semantic token classes such as `bg-primary`, `text-foreground`, `border-border`
- never hardcode raw colors in component classes
- do not manually force a `dark` class inside portal content

---

## Component Surface

`@wedaster/ui-web` currently mirrors all **56** official `shadcn` `registry:ui` components.

### Categories

- `primitives`: button, checkbox, direction, input, label, separator, textarea
- `forms`: calendar, combobox, field, form, input-group, input-otp, native-select, radio-group, select, slider, switch, toggle, toggle-group
- `layout`: accordion, aspect-ratio, button-group, card, carousel, collapsible, item, resizable, scroll-area
- `navigation`: breadcrumb, command, menubar, navigation-menu, pagination, sidebar, tabs
- `overlays`: alert-dialog, context-menu, dialog, drawer, dropdown-menu, hover-card, popover, sheet, tooltip
- `display`: avatar, badge, chart, empty, kbd, skeleton, table
- `feedback`: alert, progress, sonner, spinner

---

## Styling Architecture

The public consumer contract is:

```tsx
import "@wedaster/ui-web/styles.css"
import "@wedaster/ui-web/base.css"
```

`@wedaster/ui-web/globals.css` remains a compatibility alias for `styles.css + base.css`.

Internal styling files:

- `packages/ui-web/src/styles/tokens.css` — active Wedaster semantic tokens
- `packages/ui-web/src/styles/styles.css` — Tailwind imports, sources, `@theme inline`
- `packages/ui-web/src/styles/base.css` — optional global base layer

Dark mode is driven by a `.dark` class on the root element.

There is no active multi-theme runtime architecture at the moment. Do not introduce new theme packages or split styling into new runtime packages without an explicit repo-wide decision.

---

## How to Add a Component

1. Scaffold with shadcn CLI:

   ```bash
   pnpm dlx shadcn@latest add <name> -c packages/ui-web
   ```

2. Move the implementation into the right category.
3. Normalize it to repo conventions:
   - `cn()`
   - semantic token classes
   - `data-slot`
   - Hugeicons instead of `lucide-react`
4. Add or update:
   - Storybook story
   - Vitest test
   - `src/index.ts`
   - `tsup.config.ts`
   - flat shim if generator compatibility matters
5. Run the full quality gate:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm --filter @wedaster/ui-web test:coverage
   pnpm build
   pnpm --filter storybook test:storybook
   ```

When a user asks for official `shadcn` parity work, keep APIs as close to upstream as practical and avoid mixing that work with Wedaster-specific redesign in the same step.

---

## Build & Test Commands

```bash
# Development
pnpm dev
pnpm --filter web dev
pnpm --filter storybook dev
pnpm --filter react-smoke dev

# Quality
pnpm lint
pnpm format
pnpm typecheck
pnpm test
pnpm --filter @wedaster/ui-web test:watch
pnpm --filter @wedaster/ui-web test:coverage
pnpm --filter storybook test:storybook

# Build
pnpm build
pnpm --filter @wedaster/ui-web build
pnpm --filter web build
pnpm --filter react-smoke build

# Release
pnpm changeset
pnpm version
pnpm release
```

Coverage thresholds for `@wedaster/ui-web` are a hard minimum of **80%** on statements, branches, functions, and lines.

---

## Critical Files Reference

| File | Purpose |
|------|---------|
| `packages/ui-web/src/index.ts` | Public barrel export |
| `packages/ui-web/src/lib/utils.ts` | `cn()` utility |
| `packages/ui-web/src/styles/tokens.css` | Internal Wedaster semantic tokens |
| `packages/ui-web/src/styles/styles.css` | Public component stylesheet |
| `packages/ui-web/src/styles/base.css` | Optional global base layer |
| `packages/ui-web/src/styles/globals.css` | Compatibility alias |
| `packages/ui-web/tsup.config.ts` | Package build entrypoints |
| `packages/ui-web/components.json` | shadcn CLI config |
| `packages/ui-web/vitest.config.ts` | Test and coverage config |
| `turbo.json` | Task graph and caching rules |
| `.changeset/config.json` | Changesets config |
| `.github/workflows/ci.yml` | CI pipeline |
| `.github/workflows/release.yml` | Release workflow |

---

## Important Constraints

- Do not introduce new runtime packages for themes, tokens, or native surfaces without an explicit repo-wide architectural decision.
- Keep `@wedaster/ui-web` ESM-only unless the repo explicitly decides to support CJS.
- Do not remove `zod` from `packages/ui-web`; it remains reserved for future API work.
- Always use `cn()` for class composition.
- Every component and major sub-component must keep `data-slot` attributes.
- Never hardcode colors in component classes; use semantic token-mapped utilities.
- Update documentation in the same task when package names, imports/exports, stylesheet entrypoints, testing requirements, or release workflow change.
- Update ADRs when architecture changes in a long-lived way.
- Keep ADRs concise and decision-focused.

If a task changes an important architectural decision, update `docs/adr/` or add a new ADR when needed.
