# UI Foundation (Phase 1)

## Goals
- Enforce a single public UI import surface: `@b1dx/ui`.
- Vendorize shadcn-style primitives inside `packages/ui`.
- Provide a stable app-layer wrapper namespace for apps.

## UI Layering
- `packages/ui/src/primitives/*`
  - Vendorized shadcn primitives.
  - These are internal to the UI package and not imported by apps.
- `packages/ui/src/components/*`
  - App-layer wrappers around primitives.
  - These are the only UI modules that apps should consume.
- `packages/ui/src/index.ts`
  - Public export surface for `@b1dx/ui`.

## Import Rules (Guardrails)
- Apps must import UI components only from `@b1dx/ui`.
- Do not import from:
  - `b1dx/ui` (legacy alias)
  - `@b1dx/ui/*` (deep imports)
  - `packages/ui/*` (direct file imports)

## Adding/Updating UI Components
1. Add or update the primitive in `packages/ui/src/primitives`.
2. Add or update the wrapper in `packages/ui/src/components`.
3. Export the wrapper from `packages/ui/src/index.ts`.
4. Run lint/typecheck to ensure guardrails pass.

## Rationale
- Centralizes UI decisions and avoids divergence across apps.
- Keeps primitives vendorized and replaceable without app churn.
- Keeps the app-facing API stable and easy to police.
