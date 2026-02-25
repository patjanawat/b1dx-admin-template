# AppShell

AppShell composes the layout primitives for the admin shell: sidebar, top bar, breadcrumbs, and the main content area. It is framework-agnostic and expects a `LinkComponent` adapter so consumers can supply their router-specific link implementation.

Required props:
- `brand`
- `navGroups`
- `collapsed`
- `onCollapsedChange`
- `LinkComponent`
- `children`

Optional props:
- `activeHref`
- `breadcrumbs`
- `topRightSlot`

## Next.js usage (LinkComponent adapter)

```tsx
import Link from "next/link";
import { AppShell } from "@b1dx/ui";
import type { LinkComponentProps, NavGroup } from "@b1dx/ui";

const LinkAdapter = ({ href, className, children }: LinkComponentProps) => (
  <Link href={href} className={className}>
    {children}
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const navGroups: NavGroup[] = [
    {
      id: "main",
      label: "Main",
      items: [{ id: "home", label: "Home", href: "/home" }]
    }
  ];

  return (
    <AppShell
      brand={{ title: "Acme" }}
      navGroups={navGroups}
      activeHref="/home"
      breadcrumbs={[{ label: "Home", href: "/home" }]}
      collapsed={false}
      onCollapsedChange={() => {}}
      LinkComponent={LinkAdapter}
    >
      {children}
    </AppShell>
  );
}
```

## Active link pattern

In Next.js, derive `activeHref` from `usePathname()` in the app router and pass it into `AppShell`. This keeps the UI package free of Next dependencies while still supporting accurate active state.

## Breadcrumb strategy

Build breadcrumbs from a config-driven route map in the app layer (for example, a shared nav config or route metadata), then pass the computed list into `AppShell`.
