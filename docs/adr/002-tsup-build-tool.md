# ADR 002: tsup For Library Builds

- Status: Accepted
- Date: 2026-04-01

## Context

`@workspace/ui-web` must ship compiled JavaScript and TypeScript declarations instead of raw `.tsx` sources so it can be consumed outside Next.js.

## Decision

Use `tsup` as the build tool for `@workspace/ui-web` to generate ESM output, declaration files, and per-component entrypoints.

## Consequences

- The library gets a predictable `dist/` contract.
- React and React DOM remain peer dependencies and are not bundled into the package output.
- Consumer apps can rely on exported build artifacts instead of `transpilePackages`.
