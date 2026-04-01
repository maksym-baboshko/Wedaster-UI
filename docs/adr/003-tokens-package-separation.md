# ADR 003: Separate Tokens Package

- Status: Accepted
- Date: 2026-04-01

## Context

The original setup kept CSS variables inside the UI package, which coupled raw design tokens to React components.

## Decision

Move shared CSS custom properties into `@workspace/tokens` and have `@workspace/ui-web` consume them as a dependency.

## Consequences

- Tokens can be reused without importing the React component package.
- The consumer contract becomes explicit: tokens first, component styles second.
- Future platforms such as native or docs tooling can reference the same design language baseline.
