# ADR 001: Monorepo Structure

- Status: Accepted
- Date: 2026-04-02

## Context

Wedaster UI needs one source of truth for component code, theme packages, and verification apps. The repository also needs dedicated consumers for real-world validation and documentation so library changes are exercised outside the package itself.

## Decision

The repository uses pnpm workspaces and Turborepo with:

- `packages/tokens` for the internal semantic token foundation
- `packages/theme-default` for the publishable default Wedaster theme
- `packages/theme-obsidian` as a private scaffold for the next design system
- `packages/ui-web` for the buildable React component library
- `packages/ui-native` as a reserved scaffold
- `apps/web`, `apps/storybook`, and `apps/react-smoke` as consumers

## Consequences

- Component work happens in one package instead of being duplicated per app or per theme.
- Theme work can evolve independently from the component implementation.
- Consumer apps validate Next.js, Storybook, and plain React usage separately.
- Documentation, smoke testing, theme packages, and package code evolve in one repository.
