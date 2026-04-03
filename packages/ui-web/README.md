# @wedaster/ui-web

Buildable React component library for the Wedaster design system.

## Installation

```bash
pnpm add @wedaster/ui-web
```

If your app does not already include Tailwind CSS v4 tooling, also install:

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

## Usage

```tsx
import "@wedaster/ui-web/styles.css"
import "@wedaster/ui-web/base.css"

import { Button, Card, Input } from "@wedaster/ui-web"
```

`@wedaster/ui-web/base.css` is optional. Use it only if you want the shared global `body` / `*` base layer.

If you prefer the compatibility alias:

```tsx
import "@wedaster/ui-web/globals.css"
```

If your app compiles the shared stylesheet through PostCSS:

```js
export { default } from "@wedaster/ui-web/postcss.config"
```

## Component Surface

This package now covers all **56** official `shadcn` `registry:ui` components.

- `primitives`: button, checkbox, direction, input, label, separator, textarea
- `forms`: calendar, combobox, field, form, input-group, input-otp, native-select, radio-group, select, slider, switch, toggle, toggle-group
- `layout`: accordion, aspect-ratio, button-group, card, carousel, collapsible, item, resizable, scroll-area
- `navigation`: breadcrumb, command, menubar, navigation-menu, pagination, sidebar, tabs
- `overlays`: alert-dialog, context-menu, dialog, drawer, dropdown-menu, hover-card, popover, sheet, tooltip
- `display`: avatar, badge, chart, empty, kbd, skeleton, table
- `feedback`: alert, progress, sonner, spinner

## Imports

Root imports:

```tsx
import { Button } from "@wedaster/ui-web"
```

Stable category-based imports:

```tsx
import { Button } from "@wedaster/ui-web/components/primitives/button"
```

Generator-compatible flat imports:

```tsx
import { Button } from "@wedaster/ui-web/components/button"
```

## Requirements

- React 19
- Tailwind CSS v4
- `@tailwindcss/postcss` if your app compiles shared CSS through PostCSS

For full consumer setup and release workflow, see the [root README](../../README.md).

## Development Notes

- Source lives in `src/components`
- Stories live next to components as `*.stories.tsx`
- Tests live next to components as `*.test.tsx`
- Coverage minimum is **80%** on statements, branches, functions, and lines
