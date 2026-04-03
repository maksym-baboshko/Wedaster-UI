# ADR 002: tsup For Library Builds

- Status: Accepted
- Date: 2026-04-02

## Context

`@wedaster/ui` must ship compiled JavaScript and TypeScript declarations instead of raw `.tsx` sources so it can be consumed outside Next.js and outside this monorepo. The package also exposes stable root imports, category-based subpath imports, and generator-compatible flat subpaths.

## Decision

Use `tsup` as the build tool for `@wedaster/ui` to generate ESM output, declaration files, and per-component entrypoints from the component source.

## Consequences

- The library gets a predictable `dist/` contract.
- React and React DOM remain peer dependencies and are not bundled into the package output.
- Consumer apps can rely on exported build artifacts instead of `transpilePackages`.
- The public component surface stays explicit because exports are generated from curated entrypoints rather than arbitrary source paths.
