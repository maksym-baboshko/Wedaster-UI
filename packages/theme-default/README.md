# @wedaster/theme-default

Default Wedaster design system package.

## Usage

```tsx
import "@wedaster/theme-default/styles.css"
import "@wedaster/ui-web/styles.css"
import "@wedaster/ui-web/base.css"
```

This package is the canonical default theme for Wedaster UI consumers.

Use it together with `@wedaster/ui-web`; the theme package only provides design-system token values and does not include component styles by itself.

- `@wedaster/ui-web/base.css` is optional and only needed if you want the shared global base layer.
- For the full consumer setup, see the [root README](../../README.md#using-the-component-library) or [@wedaster/ui-web README](../ui-web/README.md).
