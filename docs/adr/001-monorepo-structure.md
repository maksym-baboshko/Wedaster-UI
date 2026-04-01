# ADR 001: Monorepo Structure

- Status: Accepted
- Date: 2026-04-01

## Context

Wedaster UI needs one source of truth for tokens and components, plus dedicated consumers for real-world verification and documentation.

## Decision

The repository uses pnpm workspaces and Turborepo with:

- `packages/tokens` for shared CSS variables
- `packages/ui-web` for the buildable React library
- `packages/ui-native` as a reserved scaffold
- `apps/web`, `apps/storybook`, and `apps/react-smoke` as consumers

## Consequences

- Component work happens in one package, not duplicated per app.
- Consumer apps validate Next.js and non-Next.js usage separately.
- Documentation, smoke testing, and package code evolve in one repository.
