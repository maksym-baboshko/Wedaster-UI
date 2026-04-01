# Wedaster UI

A multi-brand React component library monorepo. Built on [Radix UI](https://radix-ui.com), [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) patterns, and React 19. Designed to support multiple independent design systems (themes) on top of a single shared component foundation.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Quick Start](#quick-start)
- [Using the Component Library](#using-the-component-library)
- [Theming System](#theming-system)
- [Adding a New Component](#adding-a-new-component)
- [Adding a New Theme](#adding-a-new-theme)
- [Testing](#testing)
- [Commands Reference](#commands-reference)
- [Release Flow](#release-flow)
- [Known Issues / Roadmap](#known-issues--roadmap)
- [Contributing](#contributing)

---

## Architecture Overview

```
apps/
  web/               Next.js 16 consumer app (primary integration reference)
  storybook/         Storybook 10 — component docs and visual baseline
  react-smoke/       Vite + React smoke app — validates non-Next.js usage
packages/
  ui-web/            Buildable React component library (main package)
  ui-native/         React Native scaffold (reserved for future work)
  tokens/            Base CSS custom properties (design tokens foundation)
  eslint-config/     Shared ESLint configurations
  typescript-config/ Shared TypeScript configurations
```

**Key design decisions:**

- **pnpm workspaces + Turborepo** — monorepo orchestration with caching
- **tsup** — ESM build with full `.d.ts` output, per-component entry points
- **Tailwind CSS v4** with `@theme inline` — maps CSS custom properties to utility classes
- **CSS custom properties (OKLch)** — all visual tokens are CSS variables, enabling zero-JS theme switching
- **Radix UI** — headless accessible primitives underneath every interactive component
- **CVA (class-variance-authority)** — type-safe component variant definitions
- **Changesets** — versioning and changelog automation

---

## Quick Start

```bash
# Install all dependencies
pnpm install

# Start all dev servers in parallel
pnpm dev
```

Individual app entrypoints:

| Command | URL | Purpose |
|---------|-----|---------|
| `pnpm --filter web dev` | http://localhost:3000 | Next.js consumer app |
| `pnpm --filter storybook dev` | http://localhost:6006 | Component docs |
| `pnpm --filter react-smoke dev` | http://localhost:5173 | Vite smoke tests |

**Requirements:** Node >= 20, pnpm >= 9.

---

## Using the Component Library

### Installation (external consumers)

```bash
pnpm add @wedaster/ui-web @wedaster/tokens
```

### Setup

Import the tokens and the component stylesheet once in your app entry:

```tsx
// 1. Base design tokens (CSS custom properties)
import "@wedaster/tokens/styles.css"

// 2. Component styles (Tailwind utilities + base layer)
import "@wedaster/ui-web/styles.css"
```

If your app uses Tailwind CSS v4 and needs to compile the shared stylesheet via PostCSS:

```js
// postcss.config.mjs
export { default } from "@wedaster/ui-web/postcss.config"
```

### Importing Components

```tsx
import { Button, Card, Input, Badge } from "@wedaster/ui-web"

// Or via sub-path imports (better tree-shaking in some bundlers)
import { Button } from "@wedaster/ui-web/components/primitives/button"
```

### Example Usage

```tsx
import { Button } from "@wedaster/ui-web"

export function Demo() {
  return (
    <Button variant="default" size="default">
      Click me
    </Button>
  )
}
```

---

## Theming System

Wedaster UI is built around **CSS custom properties as the single source of truth** for all visual tokens. This enables multiple independent design systems (brands/themes) on top of one shared component codebase — a multi-brand architecture used by IBM Carbon, Shopify Polaris, and Atlassian Design System.

### How It Works

Components reference tokens like `bg-primary`, `text-foreground`, `border-border` — not hardcoded colors. The tokens are defined in CSS files. Swap the CSS file, swap the entire visual design. No component changes needed.

### Current Token Structure

```
packages/tokens/src/styles.css   ← Base CSS custom properties
```

Tokens are defined for both light mode (`:root`) and dark mode (`.dark`) using OKLch colors:

```css
:root {
  --primary: oklch(0.527 0.154 150.069);
  --primary-foreground: oklch(0.982 0.018 155.826);
  --background: oklch(1 0 0);
  --radius: 0.5rem;
  /* ... */
}

.dark {
  --primary: oklch(0.448 0.119 151.328);
  /* ... */
}
```

### Planned Multi-Theme Architecture

```
packages/
  tokens/           ← Base/reset values (minimal, consumed internally)
  theme-default/    ← First design system (current green brand)
  theme-[brand-x]/  ← Future: completely different visual language
  ui-web/           ← Components — zero per-theme code
```

Each theme package:
- Exports a single `styles.css` with CSS variable overrides
- Requires no build step
- Consumer imports only their theme:

```tsx
// Instead of @wedaster/tokens/styles.css:
import "@wedaster/theme-default/styles.css"
import "@wedaster/ui-web/styles.css"
```

### Runtime Theme Switching (Optional)

If a single app needs to switch between themes at runtime, scope each theme under a class:

```css
/* packages/theme-default/styles.css */
.theme-default {
  --primary: oklch(0.527 0.154 150.069);
}

/* packages/theme-corporate/styles.css */
.theme-corporate {
  --primary: oklch(0.4 0.08 240);
}
```

```tsx
<html className="theme-default">
  {/* All components inherit the active theme */}
</html>
```

No JavaScript theme provider needed for color-only themes.

### Customizing Tokens in a Consumer App

Override any token after importing the stylesheet:

```css
:root {
  --primary: oklch(0.5 0.2 260); /* override to purple */
  --radius: 0.25rem;             /* tighter radius */
}
```

---

## Adding a New Component

1. Run the shadcn CLI to scaffold the component into `packages/ui-web`:

   ```bash
   pnpm dlx shadcn@latest add <component-name> -c packages/ui-web
   ```

2. Move the generated file into the appropriate category directory:

   ```
   packages/ui-web/src/components/
     primitives/   → Button, Input, Label, Textarea, Checkbox
     forms/        → Select, RadioGroup, Switch
     layout/       → Card
     navigation/   → Tabs
     overlays/     → Dialog, Sheet, Popover, DropdownMenu, Tooltip
     display/      → Badge, Skeleton, Table
     feedback/     → Toaster
   ```

3. Export the component from the barrel file:

   ```ts
   // packages/ui-web/src/index.ts
   export { MyComponent } from "./components/category/my-component/my-component"
   ```

4. Add a Storybook story file:

   ```
   packages/ui-web/src/components/category/my-component/my-component.stories.tsx
   ```

5. Add a Vitest test file for any interactive behavior or public API:

   ```
   packages/ui-web/src/components/category/my-component/my-component.test.tsx
   ```

6. Verify everything passes:

   ```bash
   pnpm lint && pnpm typecheck && pnpm test && pnpm build
   ```

---

## Adding a New Theme

> This workflow will be finalized when the first `theme-*` package is extracted.

1. Create a new package:

   ```
   packages/theme-[name]/
     src/styles.css      ← Override CSS custom properties
     package.json
   ```

2. `package.json` for the theme:

   ```json
   {
     "name": "@wedaster/theme-[name]",
     "version": "0.0.1",
     "exports": {
       "./styles.css": "./src/styles.css"
     }
   }
   ```

3. Define the token overrides in `src/styles.css`:

   ```css
   @import "@wedaster/tokens/styles.css";

   :root {
     --primary: oklch(/* your color */);
     /* override any token */
   }
   ```

4. Add to `.changeset/config.json` linked packages if it should version together with `ui-web`.

---

## Testing

### Unit Tests (Vitest + React Testing Library)

```bash
pnpm test                          # Run all tests once
pnpm --filter ui-web test:watch    # Watch mode for component development
pnpm --filter ui-web test:coverage # Generate coverage report (lcov + text)
```

Tests live alongside components:
```
button/
  button.tsx
  button.stories.tsx
  button.test.tsx
```

### Visual Testing (Storybook)

```bash
pnpm --filter storybook dev        # Interactive component explorer
pnpm --filter storybook build      # Build static site for deployment
```

Storybook is configured with:
- `@storybook/addon-docs` — auto-generated component docs
- `@storybook/addon-a11y` — accessibility audits per story
- `@storybook/addon-themes` — light/dark theme toggle

### Cross-Framework Smoke Test

```bash
pnpm --filter react-smoke dev      # Verify library works in plain Vite/React
pnpm --filter react-smoke build
```

---

## Commands Reference

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start all dev servers in parallel |
| `pnpm build` | Build every package and app |
| `pnpm lint` | ESLint across the workspace |
| `pnpm format` | Prettier format across the workspace |
| `pnpm typecheck` | TypeScript checks across the workspace |
| `pnpm test` | Run Vitest tests across the workspace |
| `pnpm --filter storybook dev` | Start Storybook on port 6006 |
| `pnpm --filter storybook build` | Build Storybook static site |
| `pnpm --filter react-smoke build` | Verify library compiles in Vite |
| `pnpm changeset` | Create a new changeset for release |
| `pnpm version` | Apply version bumps + update changelogs |
| `pnpm release` | Build and publish to npm |

---

## Release Flow

Releases are managed with [Changesets](https://github.com/changesets/changesets).

**Publishable packages:** `@wedaster/ui-web`, `@wedaster/tokens`
**Apps are not published:** `web`, `storybook`, `react-smoke`

### Steps

1. After completing a feature or fix, create a changeset:

   ```bash
   pnpm changeset
   ```

   Follow the interactive prompts to select which packages changed and write a summary.

2. Commit the generated `.changeset/*.md` file alongside your code changes.

3. On merge to `main`, the GitHub Actions `release.yml` workflow automatically:
   - Creates a "Version Packages" PR with bumped versions and updated changelogs
   - Publishes to npm when that PR is merged

### First-Time npm Setup

Before publishing for the first time:

1. Set `"access": "public"` in `.changeset/config.json` (currently set to `"restricted"` — **must be changed for public npm packages**).
2. Add `NPM_TOKEN` as a GitHub repository secret.

---

## Known Issues / Roadmap

| Status | Item |
|--------|------|
| TODO | `changesets` access must be changed from `"restricted"` to `"public"` before first npm publish |
| TODO | Pre-push git hook runs full build+test+typecheck — consider moving heavy checks to CI only |
| TODO | No coverage thresholds enforced in CI |
| TODO | `test:storybook` not yet wired into CI pipeline |
| TODO | Bundle size not monitored — no CI check for regressions |
| TODO | ESM-only output — evaluate adding CJS for legacy toolchain support |
| TODO | No peer dependency declared for `tailwindcss` |
| PLANNED | Extract `packages/theme-default` from current `packages/tokens` |
| PLANNED | React Native components in `packages/ui-native` |

---

## Contributing

### Prerequisites

- Node >= 20
- pnpm >= 9

### Setup

```bash
git clone <repo-url>
cd wedaster-ui
pnpm install
```

### Code Quality Gates

Git hooks enforce quality automatically:

- **pre-commit:** `pnpm lint`
- **pre-push:** `pnpm typecheck && pnpm lint && pnpm test && pnpm build`

### Conventions

- All components use the `cn()` utility from `packages/ui-web/src/lib/utils.ts` for class composition
- Component variants are defined with CVA (`class-variance-authority`)
- All components include a `data-slot` attribute for identification
- Stories use `autodocs` tags — documentation is auto-generated from component props
- Tests use React Testing Library with `@testing-library/user-event` for interactions

---

## License

MIT
