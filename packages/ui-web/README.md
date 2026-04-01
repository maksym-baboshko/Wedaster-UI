# @workspace/ui-web

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
import "@workspace/tokens/styles.css"
import "@workspace/ui-web/styles.css"

import { Button, Card, Input } from "@workspace/ui-web"
```

Per-component imports are also available:

```tsx
import { Button } from "@workspace/ui-web/components/button"
```

## Development Notes

- Source lives in `src/components`.
- Stories live next to components as `*.stories.tsx`.
- Tests live next to components as `*.test.tsx`.
- Run `pnpm --filter storybook dev` to inspect the package in Storybook.
