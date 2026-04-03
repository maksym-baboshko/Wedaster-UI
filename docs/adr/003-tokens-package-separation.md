# ADR 003: Single Runtime Package With Internal Styling Tokens

- Status: Accepted
- Date: 2026-04-03

## Context

The earlier multi-theme package model added extra runtime packages and a split consumer contract before there was real product demand for multiple design systems. The repo focus is now full `shadcn` parity and one strong Wedaster design system.

## Decision

Keep the active semantic tokens and public stylesheet entrypoints inside `@wedaster/ui-web`. Consumers import `@wedaster/ui-web/styles.css` and optionally `@wedaster/ui-web/base.css`. The token file remains internal implementation detail inside the package.

## Consequences

- The public styling contract becomes simpler and easier to onboard: one runtime package, one stylesheet entrypoint family.
- Component code stays token-driven without exposing a separate token package to consumers.
- Future multi-design-system support is not ruled out, but it now requires a new explicit architecture decision instead of living as dormant scaffolding.
