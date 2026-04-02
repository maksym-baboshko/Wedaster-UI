# ADR 003: Internal Token Foundation With Public Theme Packages

- Status: Accepted
- Date: 2026-04-02

## Context

The original setup moved CSS variables out of the UI package, but apps still imported the token package directly. Wedaster UI now needs a clearer multi-theme model where component code stays theme-agnostic, themes can be published independently, and the lowest-level token foundation remains internal.

## Decision

Keep shared semantic CSS custom properties in `@wedaster/tokens` as an internal foundation package. Publish concrete design systems as `theme-*` packages such as `@wedaster/theme-default`, and have apps import a public theme package together with `@wedaster/ui-web`.

## Consequences

- Component code remains independent from brand-specific visual values.
- The consumer contract becomes explicit: choose a `theme-*` package first, then import `@wedaster/ui-web` styles.
- `@wedaster/tokens` can evolve as a shared semantic foundation without becoming a public app-facing theme contract.
- Additional themes can be scaffolded without changing component implementation.
