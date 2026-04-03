# Wedaster UI

Single-design-system React component library monorepo for Wedaster. Built on [Radix UI](https://radix-ui.com), [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) patterns, and React 19.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Quick Start](#quick-start)
- [Using the Component Library](#using-the-component-library)
- [Component Surface](#component-surface)
- [Styling and Tokens](#styling-and-tokens)
- [Adding a New Component](#adding-a-new-component)
- [Testing](#testing)
- [Commands Reference](#commands-reference)
- [Release Flow](#release-flow)
- [Known Issues / Roadmap](#known-issues--roadmap)
- [Contributing](#contributing)

---

## Architecture Overview

```text
apps/
  web/               Next.js 16 consumer app (primary integration reference)
  storybook/         Storybook 10 docs and visual baseline
  react-smoke/       Vite + React smoke app for non-Next.js usage

packages/
  ui/            Main publishable React component library
  eslint-config/     Shared ESLint configurations
  typescript-config/ Shared TypeScript configurations
```

**Published package:** `@wedaster/ui`

**Key decisions**

- `pnpm` workspaces + Turborepo for monorepo orchestration and caching
- `tsup` for ESM builds with full `.d.ts` output and per-component entry points
- Tailwind CSS v4 + `@theme inline` for semantic utility mapping
- Semantic CSS custom properties in OKLch, kept inside `ui`
- Radix UI underneath interactive primitives
- CVA for type-safe component variants
- Changesets for versioning and changelog automation

---

## Quick Start

```bash
pnpm install
pnpm dev
```

Individual entrypoints:

| Command | URL | Purpose |
|---------|-----|---------|
| `pnpm --filter web dev` | http://localhost:3000 | Next.js consumer app |
| `pnpm --filter storybook dev` | http://localhost:6006 | Storybook docs |
| `pnpm --filter react-smoke dev` | http://localhost:5173 | Plain React smoke app |

**Requirements:** Node `>=20`, pnpm `>=9`.

---

## Using the Component Library

### Installation

```bash
pnpm add @wedaster/ui
```

If your app does not already include Tailwind CSS v4 tooling, also install:

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

### Setup

Import the component stylesheet once at your app entry. Add the optional base layer only if you want shared `body` / `*` defaults.

```tsx
import "@wedaster/ui/styles.css"
import "@wedaster/ui/base.css"
```

`@wedaster/ui/globals.css` remains available as a compatibility alias for `styles.css + base.css`.

If your app compiles the shared stylesheet through PostCSS:

```js
// postcss.config.mjs
export { default } from "@wedaster/ui/postcss.config"
```

### Importing Components

```tsx
import { Button, Card, Input, Badge } from "@wedaster/ui"
```

Stable category-based subpath imports are also available:

```tsx
import { Button } from "@wedaster/ui/components/primitives/button"
```

Generator-created code may use the flat compatibility path:

```tsx
import { Button } from "@wedaster/ui/components/button"
```

### Example

```tsx
import { Button } from "@wedaster/ui"

export function Demo() {
  return <Button>Click me</Button>
}
```

---

## Component Surface

`@wedaster/ui` now covers all **56** official `shadcn` `registry:ui` components, normalized to Wedaster repo conventions.

### Primitives

- `button`
- `checkbox`
- `direction`
- `input`
- `label`
- `separator`
- `textarea`

### Forms

- `calendar`
- `combobox`
- `field`
- `form`
- `input-group`
- `input-otp`
- `native-select`
- `radio-group`
- `select`
- `slider`
- `switch`
- `toggle`
- `toggle-group`

### Layout

- `accordion`
- `aspect-ratio`
- `button-group`
- `card`
- `carousel`
- `collapsible`
- `item`
- `resizable`
- `scroll-area`

### Navigation

- `breadcrumb`
- `command`
- `menubar`
- `navigation-menu`
- `pagination`
- `sidebar`
- `tabs`

### Overlays

- `alert-dialog`
- `context-menu`
- `dialog`
- `drawer`
- `dropdown-menu`
- `hover-card`
- `popover`
- `sheet`
- `tooltip`

### Display

- `avatar`
- `badge`
- `chart`
- `empty`
- `kbd`
- `skeleton`
- `table`

### Feedback

- `alert`
- `progress`
- `sonner` / `toaster`
- `spinner`

---

## Styling and Tokens

Wedaster UI is a **single-design-system library**, not a multi-theme runtime platform.

The public styling contract is:

```tsx
import "@wedaster/ui/styles.css"
import "@wedaster/ui/base.css"
```

Internally:

- `packages/ui/src/styles/tokens.css` contains the active Wedaster semantic tokens
- `packages/ui/src/styles/styles.css` wires tokens into Tailwind via `@theme inline`
- `packages/ui/src/styles/base.css` is the optional global base layer

Components always reference semantic tokens such as `bg-primary`, `text-foreground`, `border-border`, and `ring-ring`. They should never hardcode raw color values in class names.

Dark mode is driven by a `.dark` class on the root element. Portal-based components must inherit that active theme and should not force their own `dark` class.

Consumer apps may still override tokens after importing the stylesheet:

```css
:root {
  --primary: oklch(0.55 0.18 240);
  --radius: 0.5rem;
}
```

---

## Adding a New Component

1. Scaffold with the shadcn CLI:

   ```bash
   pnpm dlx shadcn@latest add <component-name> -c packages/ui
   ```

2. Move the implementation into the correct category:

   ```text
   packages/ui/src/components/<category>/<name>.tsx
   ```

3. Normalize it to repo conventions:
   - use `cn()`
   - keep semantic token classes
   - add `data-slot` attributes
   - adapt icons to `@hugeicons/react`

4. Add or update:
   - Storybook story
   - Vitest test
   - barrel export in `packages/ui/src/index.ts`
   - tsup entry in `packages/ui/tsup.config.ts`
   - optional flat shim in `packages/ui/src/components/<name>.ts`

5. Run the quality gate:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm --filter @wedaster/ui test:coverage
   pnpm build
   pnpm --filter storybook test:storybook
   ```

---

## Testing

Quality gates:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm --filter @wedaster/ui test:coverage`
- `pnpm build`
- `pnpm --filter storybook build`
- `pnpm --filter storybook test:storybook`

Coverage thresholds in `@wedaster/ui` are enforced at **80% minimum** for:

- statements
- branches
- functions
- lines

Storybook is part of the validation surface, not just documentation.

---

## Commands Reference

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
pnpm --filter @wedaster/ui test:watch
pnpm --filter @wedaster/ui test:coverage
pnpm --filter storybook test:storybook

# Build
pnpm build
pnpm --filter @wedaster/ui build
pnpm --filter web build
pnpm --filter react-smoke build

# Release
pnpm changeset
pnpm version
pnpm release
```

---

## Release Flow

Release automation uses Changesets and GitHub Actions.

- `@wedaster/ui` is the only publishable runtime package
- `.changeset/config.json` keeps `"access": "public"` as canonical state
- `release.yml` publishes after versioning/build succeeds

Typical flow:

1. Add changes
2. Run quality gates
3. Create a changeset with `pnpm changeset`
4. Merge
5. Let the release workflow publish

---

## Known Issues / Roadmap

| Status | Item |
|--------|------|
| ACTIVE | Keep the full 56-component `shadcn` parity healthy as upstream evolves |
| ACTIVE | Improve test depth for the newest parity components so coverage stays comfortably above the 80% floor |
| PLANNED | Curate higher-level Wedaster component recipes on top of the current parity foundation |
| PLANNED | Add bundle-size monitoring once the public surface stabilizes further |
| DEFERRED | Revisit multi-design-system support only if there is concrete product demand |

---

## Contributing

- Follow repo conventions from [AGENTS.md](./AGENTS.md)
- Update docs when developer-facing behavior changes
- Update ADRs when long-lived architectural decisions change
- Keep diffs focused: parity work first, design refinements second

License: [MIT](./LICENSE)
