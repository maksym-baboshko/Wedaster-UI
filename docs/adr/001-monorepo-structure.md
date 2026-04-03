# ADR 001: Monorepo Structure

- Status: Accepted
- Date: 2026-04-03

## Context

Wedaster UI needs one source of truth for component code, verification apps, and shared tooling. The current product focus is one active Wedaster design system delivered through one runtime package, while still validating the library in multiple consumer environments.

## Decision

The repository uses pnpm workspaces and Turborepo with:

- `packages/ui-web` as the single publishable runtime package
- `packages/eslint-config` and `packages/typescript-config` as shared infra
- `apps/web`, `apps/storybook`, and `apps/react-smoke` as verification consumers

## Consequences

- Runtime library work stays concentrated in one package instead of being split across theme packages.
- Shared linting and TypeScript rules remain reusable without polluting the runtime surface.
- Next.js, Storybook, and plain React usage are validated separately inside one repository.
- If multi-design-system support is ever revisited, it should be recorded as a new architectural decision rather than assumed by default.
