# Wedaster UI

Wedaster UI is a pnpm workspace/Turborepo monorepo for a buildable React component library based on shadcn/ui, Tailwind CSS 4, React 19, and Next.js 16.

## Quick Start

```bash
pnpm install
pnpm dev
```

Useful app entrypoints:

- `pnpm --filter web dev` starts the Next.js consumer app.
- `pnpm --filter storybook dev` starts the component docs app on port `6006`.
- `pnpm --filter react-smoke dev` starts the plain React/Vite smoke app.

## Monorepo Structure

```text
apps/
  web/           Next.js consumer app
  storybook/     Storybook docs and visual baseline app
  react-smoke/   Vite consumer for cross-framework smoke checks
packages/
  tokens/        Shared CSS custom properties
  ui-web/        Buildable React web component library
  ui-native/     Future React Native scaffold
  eslint-config/ Shared ESLint config
  typescript-config/ Shared TypeScript config
docs/
  adr/           Architecture decision records
```

## Consuming The Library

The expected consumer contract is:

```tsx
import "@workspace/tokens/styles.css"
import "@workspace/ui-web/styles.css"

import { Button, Card, Input } from "@workspace/ui-web"
```

If a consumer app compiles the exported Tailwind 4 stylesheet, point PostCSS at the shared config:

```js
export { default } from "@workspace/ui-web/postcss.config"
```

## Adding A New Component

1. Run the shadcn CLI against `packages/ui-web`.
2. Export the component from `packages/ui-web/src/index.ts`.
3. Add a Storybook story in `packages/ui-web/src/components`.
4. Add a Vitest file for the component if it affects the public surface.
5. Re-run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.

Example:

```bash
pnpm dlx shadcn@latest add tooltip -c packages/ui-web
```

## Commands

| Command                           | Purpose                                    |
| --------------------------------- | ------------------------------------------ |
| `pnpm build`                      | Build every workspace package/app          |
| `pnpm lint`                       | Run ESLint across the workspace            |
| `pnpm typecheck`                  | Run TypeScript checks across the workspace |
| `pnpm test`                       | Run workspace tests via Turbo              |
| `pnpm --filter storybook build`   | Build Storybook statically                 |
| `pnpm --filter react-smoke build` | Verify the library works in Vite           |

## Release Flow

1. Add a changeset with `pnpm changeset`.
2. Review generated markdown inside `.changeset/`.
3. Run `pnpm version` to apply version bumps and changelog updates.
4. Run `pnpm release` when the packages are ready to publish.
