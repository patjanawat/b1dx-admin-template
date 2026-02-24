# UI Core

This document summarizes the reusable UI components exposed by `@b1dx/ui`, along with guidance for RHF integration and theming.

## Component List

Core UI
- `Badge`
- `Button`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Input`
- `Table`, `TableHeader`, `TableHead`, `TableBody`, `TableRow`, `TableCell`, `TableFooter`
- `AppButton`
- `AppDialogConfirm`
- `AppEmptyState`

Forms
- `Form`
- `FormField`
- `RHFNumberInput`
- `RHFDecimalInput`
- `RHFDatePicker`

Overlays
- `Modal`
- `ConfirmDialog`

Feedback
- `ErrorBanner`

Utilities
- `cn`
- `formatCurrency`, `formatDecimal`
- `parseDecimalInput`, `clampNumber`, `toNumberOrNull`

## RHF Usage Examples

### FormField (manual errors)

```tsx
import { Form, FormField, Input } from '@b1dx/ui';
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors, submitCount } } = useForm();

<Form onSubmit={handleSubmit(() => {})}>
  <FormField
    label="Email"
    required
    error={errors.email?.message}
    errorMode="tooltip"
    touched={Boolean(errors.email)}
    submitCount={submitCount}
  >
    <Input type="email" {...register('email')} />
  </FormField>
</Form>
```

### RHFNumberInput

```tsx
import { RHFNumberInput } from '@b1dx/ui';

<RHFNumberInput
  name="quantity"
  control={control}
  label="Quantity"
  min={0}
  max={99}
/>
```

### RHFDecimalInput (currency)

```tsx
import { RHFDecimalInput } from '@b1dx/ui';

<RHFDecimalInput
  name="amount"
  control={control}
  label="Amount"
  format="currency"
  currency="THB"
  scale={2}
/>
```

### RHFDatePicker

```tsx
import { RHFDatePicker } from '@b1dx/ui';

<RHFDatePicker
  name="startDate"
  control={control}
  label="Start Date"
/>
```

## errorMode: Inline vs Tooltip

- `inline`: renders error text beneath the control (role=`alert`).
- `tooltip`: renders an error icon and tooltip popover.
  - Auto-show when `error` exists AND (`touched === true` OR `submitCount > 0`).
  - Always opens on hover or focus.

## Currency (THB/USD)

`formatCurrency` and `RHFDecimalInput` support `currency: "THB" | "USD"`.
Defaults:
- THB locale `th-TH`
- USD locale `en-US`
- default fraction digits: 2 (overrideable via options/props)

## Theming Rules

- Do not hardcode product colors in app code. Use semantic tokens (CSS variables) and Tailwind utilities mapped to those tokens.
- Prefer CSS variables from `@b1dx/theme/styles/base.css` for background/foreground/primary/border.
- If a component needs new semantic colors, extend tokens first instead of embedding literal hex values.
- Components in `@b1dx/ui` should remain theme-agnostic and rely on tokens where possible.
