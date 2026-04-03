# Wedaster UI Design System

This directory contains the Pencil source for the **Wedaster UI** design system.

The design system is the visual source of truth for the dark-mode direction of `@wedaster/ui`. It is developed in design first, then integrated into code separately.

## Files

| File | Purpose |
| --- | --- |
| `wedaster-ui.pen` | Main Pencil document for the Wedaster UI system |

## Quick Overview

| Aspect | Details |
| --- | --- |
| System name | `Wedaster UI` |
| Design tool | Pencil |
| Design file | `./wedaster-ui.pen` |
| Theme direction | Dark-first |
| Component target | Full `shadcn`-aligned `@wedaster/ui` surface |
| Icon direction | Hugeicons |
| Typography direction | Geist-compatible hierarchy |

## Visual Direction

Wedaster UI builds on the premium dark visual language established in the earlier Obsidian explorations, but the active system name is now **Wedaster UI**.

Core traits:

- deep dark surfaces with clear elevation
- premium contrast and restrained accent usage
- glass panels with a dark backing layer, so they remain stable on mixed or lighter backgrounds
- subtle material effects instead of flat styling
- restrained glow, blur, rim light, and shadow depth
- optional fine noise on glass where it improves material feel without hurting readability

## Scope

The goal of this design file is to cover the full Wedaster UI component surface at a level comparable to `shadcn`, including:

- actions
- forms and inputs
- layout
- navigation
- overlays
- display and data
- feedback

That means the design system should be able to serve as a direct handoff source for the full component library, not just a moodboard or marketing layer.

## Working Rules

When extending this file:

- treat `wedaster-ui.pen` as the active source file
- keep the system name as `Wedaster UI`
- prefer creating new iterative frames for major redesign passes instead of destructively rewriting historical exploration frames
- validate visual changes with screenshots and layout checks
- keep the design aligned with the component structure and coverage expected by `shadcn`
- use the local `[$shadcn](/Users/boshmax/.agents/skills/shadcn/SKILL.md)` skill as the reference for component families, composition rules, and coverage expectations

## Notes

- Older references to `Obsidian`, `theme-obsidian`, or `docs/theme-obsidian.pen` are obsolete in this folder.
- This directory documents the design system itself, not a standalone runtime theme package.
- Code integration, token mapping, and implementation details belong to the library workstream, not this README.
