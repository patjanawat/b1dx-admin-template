# Design System

## Layering Model
- Tokens
- shadcn primitives
- App DS
- Feature
- Pages

## Import Rules
- Apps import UI only from `@b1dx/ui`.
- No deep imports from UI internals or shadcn primitives.

## Naming Conventions
- App-facing components use the `App*` prefix.
- Internal primitives live under `components/ui` and are not imported by apps.

## Contribution Checklist
- A11y: role/aria/keyboard behavior validated.
- Tokens: uses design tokens or CSS variables where applicable.
- Variants: variants and sizes documented and exported via `@b1dx/ui`.
