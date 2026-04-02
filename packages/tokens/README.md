# @wedaster/tokens

Internal semantic token foundation for Wedaster UI theme packages.

## What Lives Here

- `:root` and `.dark` custom properties
- semantic surface colors such as `--background`, `--foreground`, `--card`
- neutral baseline values for semantic tokens such as `--primary` and `--destructive`
- layout values such as `--radius`
- chart and sidebar support tokens

## Intended Usage

```css
@import "@wedaster/tokens/styles.css";
```

This package is an internal foundation layer for `theme-*` packages. App consumers should import a concrete theme package such as `@wedaster/theme-default/styles.css`, not `@wedaster/tokens/styles.css`.

## Overriding Tokens In A Theme Package

Theme packages can import the foundation and then override semantic values:

```css
:root {
  --primary: oklch(0.58 0.16 155);
  --radius: 0.75rem;
}
```
