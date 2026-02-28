# Style Guide — b1dx-admin-template

Established from `chore/style-consistency` (Feb 2026). Apply these rules to all new components and pages.

---

## 1. Design Tokens — ใช้ Semantic Tokens เสมอ

อย่าใช้ hardcoded Tailwind colors โดยตรง ให้ใช้ semantic tokens แทน

| อย่าใช้ | ให้ใช้ |
|---|---|
| `bg-white` | `bg-card` / `bg-background` |
| `bg-slate-50` | `bg-muted` |
| `border-slate-200` | `border-input` (inputs) / `border-border` (ทั่วไป) |
| `text-slate-900` | `text-foreground` |
| `text-slate-500` | `text-muted-foreground` |
| `text-red-500` / `text-red-600` | `text-destructive` |
| `ring-slate-400` | `ring-ring` |
| `focus:ring-slate-400` | `focus:ring-ring` |

**ข้อยกเว้น:** สี status ที่มีความหมาย (destructive, success, warning, info) ในส่วน badge และ banner สามารถใช้ hardcoded สีได้ เช่น `bg-red-100 text-red-700`, `bg-emerald-100 text-emerald-700`

---

## 2. Typography Scale

### Font Size

| Token | px | ใช้สำหรับ |
|---|---|---|
| `text-3xl` | 30px | Page title (h1) — มีเพียงหน้าละ 1 จุด |
| `text-2xl` | 24px | Section heading (h2) |
| `text-xl` | 20px | Dialog title, card prominent heading |
| `text-lg` | 18px | Card title (h3) |
| `text-sm` | 14px | Body text, form labels, table cells |
| `text-xs` | 12px | Meta-labels, badge text, captions, table headers |

> ห้ามใช้ magic sizes: `text-[10px]`, `text-[11px]`, `text-[13px]`, `text-[14px]`, `text-[0.8rem]`

### Font Weight

| Weight | Class | ใช้สำหรับ |
|---|---|---|
| 800 | `font-extrabold` | Page title (h1), numeric counts ใน stat cards |
| 700 | `font-bold` | Section headings, card titles, meta-labels, buttons |
| 600 | `font-semibold` | Card title via `CardTitle`, badge text |
| 500 | `font-medium` | Form labels, body text, descriptions |
| 400 | `font-normal` | Calendar day numbers |

> `font-black` (900) — ห้ามใช้ ยกเว้นได้รับ approve จาก design

### Letter Spacing

| Class | ใช้สำหรับ |
|---|---|
| `tracking-tight` | Page titles, section headings |
| `tracking-widest` | Meta-labels, table headers (ใช้คู่กับ uppercase) |
| `tracking-wider` | Badge text ใน chip/tag (ใช้คู่กับ uppercase) |
| (ไม่ระบุ) | Body text, labels ทั่วไป |

> ห้ามใช้ custom tracking: `tracking-[0.1em]`, `tracking-[0.2em]`, `tracking-[0.15em]`

### Typography Patterns

```tsx
// Page title (h1)
<h1 className="text-3xl font-extrabold tracking-tight text-foreground">

// Section heading (h2) — ผ่าน Section component
<Section title="..." />  // renders text-2xl font-bold tracking-tight

// Card title (h3)
<CardTitle className="text-lg font-bold">

// Meta-label (section group labels, table column headers, filter labels)
<p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">

// Form label — ผ่าน FormField component
<FormField label="..." />  // renders text-sm font-medium text-foreground

// Field label (custom forms ที่ไม่ใช้ FormField)
<p className="text-sm font-medium text-foreground">

// Badge / status chip
<span className="text-xs font-semibold ...">

// Body / description text
<p className="text-sm text-muted-foreground">

// Caption / timestamp
<span className="text-xs text-muted-foreground">
```

---

## 3. Border Radius

| Class | px | ใช้สำหรับ |
|---|---|---|
| `rounded-md` | 6px | Buttons, inputs, small interactive elements |
| `rounded-lg` | 8px | Dropdown items, small cards |
| `rounded-xl` | 12px | Cards, modals, section containers, DataTable |
| `rounded-2xl` | 16px | OrderStatusTab (premium feel — ใช้เฉพาะ component นี้) |
| `rounded-full` | 50% | Badge chips, avatar, circular buttons |

---

## 4. cn() — className Composition

ใช้ `cn()` เสมอ ห้ามใช้ template literals หรือ `.join(' ')` ในการรวม className

```tsx
// ✅ ถูก
className={cn('base-class', condition && 'extra-class', variant === 'x' && 'x-class')}

// ❌ ผิด
className={`base-class ${condition ? 'extra-class' : ''}`}
className={['base-class', condition ? 'extra-class' : ''].join(' ')}
className={'base-class ' + extraClass}
```

Import `cn` จาก:

| Context | Import path |
|---|---|
| `packages/ui` | `import { cn } from '../../lib/cn'` |
| `apps/saas-starter` | `import { cn } from '@b1dx/ui'` |

---

## 5. Component Layer Rules

```
packages/ui/src/components/
├── ui/          ← Primitives (ห้าม import โดยตรงจากข้างนอก)
├── app/         ← Public wrappers — import จาก '@b1dx/ui'
├── forms/       ← Form-specific components
├── overlays/    ← Modal, ConfirmDialog
└── feedback/    ← ErrorBanner
```

**กฎสำคัญ:** `packages/ui/src/index.ts` ต้อง export จาก `./components/app/*` เท่านั้น ห้าม export จาก `./components/ui/*` โดยตรง (จะ fail ESLint `no-restricted-imports`)

---

## 6. TypeScript Conventions

### Interface vs Type

| ใช้ `interface` | ใช้ `type` |
|---|---|
| Component props | Union types (`'a' \| 'b' \| 'c'`) |
| Object shapes ที่ export ออกไป | Utility/mapped types |
| API response shapes | Intersection types |

```ts
// ✅ ถูก
export interface ButtonProps { ... }
export type ButtonVariant = 'default' | 'destructive' | 'outline';

// ❌ ผิด
export type ButtonProps = { ... }  // ควรเป็น interface
```

### Type Imports

```ts
// ✅ ถูก — ใช้ import type หรือ inline type
import type { ComboboxOption } from '@b1dx/ui';
import { type ColumnDef, DataTable } from '@b1dx/ui';

// ❌ ผิด
import { ComboboxOption } from '@b1dx/ui';  // type ควร import แบบ type-only
```

---

## 7. Hardcoded Strings ใน packages/ui

Component ใน `packages/ui` ต้องไม่มี hardcoded text ที่ผู้ใช้เห็น ให้รับ text ผ่าน props พร้อม default value

```tsx
// ✅ ถูก — รับ text ผ่าน prop
export interface DataTableProps {
  noResultsText?: string;  // default: 'No results.'
}

// ❌ ผิด — hardcoded ใน JSX
<td>No results.</td>
```

---

## 8. Shadow Hierarchy

| Class | ใช้สำหรับ |
|---|---|
| `shadow-sm` | Cards, inputs, small elevated elements |
| `shadow-md` | Active pagination buttons |
| `shadow-lg` | Modals, popovers, tooltips |
| `shadow-xl` | Carousel nav buttons, floating elements |

---

## 9. Spacing Conventions

| Context | Value |
|---|---|
| Page sections | `space-y-6` หรือ `gap-6` |
| Card internal | `p-6` (header, content, footer) |
| Form fields | `space-y-2` (ผ่าน FormField component) |
| Grid gaps | `gap-4` (default), `gap-6` (section-level) |

> ห้ามใช้ magic spacing: ใช้ Tailwind scale เท่านั้น

---

## 10. i18n — การใช้งาน

- ทุก user-facing text ใน `apps/saas-starter` ต้องใช้ `t()` จาก `react-i18next`
- Locale files: `apps/saas-starter/src/lib/i18n/locales/{en,th}.json`
- `packages/ui` ห้าม import `react-i18next` — รับ text ผ่าน props แทน

```tsx
// ✅ ถูก — ใน app
const { t } = useTranslation();
<p>{t('common.search_by')}</p>

// ✅ ถูก — ใน packages/ui
<DataTable noResultsText={t('common.no_results')} />

// ❌ ผิด — hardcoded ใน app
<p>Search By</p>
```
