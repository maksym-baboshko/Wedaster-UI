# @wedaster/tokens

Shared CSS design tokens for Wedaster UI packages and consumer apps.

## What Lives Here

- `:root` and `.dark` custom properties
- semantic surface colors such as `--background`, `--foreground`, `--card`
- brand and feedback colors such as `--primary` and `--destructive`
- layout values such as `--radius`
- chart and sidebar support tokens

## Usage

```tsx
import "@wedaster/tokens/styles.css"
```

## Overriding Tokens

Consumer apps can override tokens after importing the default stylesheet:

```css
:root {
  --primary: oklch(0.58 0.16 155);
  --radius: 0.75rem;
}
```
