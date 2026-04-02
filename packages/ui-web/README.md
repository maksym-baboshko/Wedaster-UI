# @wedaster/ui-web

Buildable React web component library for Wedaster UI.

## Available v1 Components

- `badge`
- `button`
- `card`
- `checkbox`
- `dialog`
- `dropdown-menu`
- `input`
- `label`
- `popover`
- `radio-group`
- `select`
- `sheet`
- `skeleton`
- `sonner`
- `switch`
- `table`
- `tabs`
- `textarea`
- `tooltip`

## Usage

```tsx
import "@wedaster/theme-default/styles.css"
import "@wedaster/ui-web/styles.css"
import "@wedaster/ui-web/base.css"

import { Button, Card, Input } from "@wedaster/ui-web"
```

## Requirements

- Install `tailwindcss` and `@tailwindcss/postcss` if your app does not already use Tailwind CSS v4.
- Import a concrete theme package such as `@wedaster/theme-default/styles.css` before `@wedaster/ui-web/styles.css`.
- `@wedaster/ui-web/base.css` is optional and only needed if you want the shared global `body` / `*` base layer.
- For the full consumer setup, see the [root README](../../README.md#using-the-component-library).

Per-component imports are also available:

```tsx
import { Button } from "@wedaster/ui-web/components/primitives/button"
```

Generator-compatible flat imports are also available for generated code:

```tsx
import { Button } from "@wedaster/ui-web/components/button"
```

## Development Notes

- Source lives in `src/components`.
- Stories live next to components as `*.stories.tsx`.
- Tests live next to components as `*.test.tsx`.
- Run `pnpm --filter storybook dev` to inspect the package in Storybook.
