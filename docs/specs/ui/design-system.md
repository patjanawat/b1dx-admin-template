# Design System

## Layering Model
- Tokens
- shadcn primitives
- App DS
- Feature
- Pages
  App DS renders shared layout and shell UI only.

## Import Rules
- Apps import UI only from `@b1dx/ui`.
- No deep imports from UI internals or shadcn primitives.
  This includes `@b1dx/ui/*`, `@b1dx/ui/src/*`, and `packages/ui/**`.

## Shell Config Pattern
- Apps own config and data (menus, labels, handlers, mock data, routing).
- `@b1dx/ui` renders the shell and dropdowns purely from props/config.
- App wiring lives in app-local files like `apps/*/src/appShellConfig.tsx`.

## Naming Conventions
- App-facing components use the `App*` prefix.
- Internal primitives live under `components/ui` and are not imported by apps.

## Contribution Checklist
- A11y: role/aria/keyboard behavior validated.
- Tokens: uses design tokens or CSS variables where applicable.
- Variants: variants and sizes documented and exported via `@b1dx/ui`.
  Shell: config-driven pattern used (apps own data/config; `@b1dx/ui` renders).
