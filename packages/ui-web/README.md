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
import "@wedaster/tokens/styles.css"
import "@wedaster/ui-web/styles.css"
import "@wedaster/ui-web/base.css"

import { Button, Card, Input } from "@wedaster/ui-web"
```

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
