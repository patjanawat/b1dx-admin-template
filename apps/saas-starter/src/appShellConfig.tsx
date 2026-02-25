import { Badge, ScrollArea } from "@b1dx/ui";
import type { AppShellConfig, BreadcrumbItem, Brand, NavGroup, TopBarConfig } from "@b1dx/ui";

export const brand: Brand = {
  title: "SaaS Starter",
  subtitle: "Admin Console",
  logo: (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
      SS
    </div>
  ),
};

export const navGroups: NavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/" },
      { id: "analytics", label: "Analytics", href: "/analytics" },
      { id: "reports", label: "Reports", href: "/reports" },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { id: "users", label: "Users", href: "/users" },
      { id: "billing", label: "Billing", href: "/billing" },
      {
        id: "settings",
        label: "Settings",
        children: [
          { id: "settings-profile", label: "Profile", href: "/settings/profile" },
          { id: "settings-security", label: "Security", href: "/settings/security" },
          { id: "settings-api", label: "API Keys", href: "/settings/api-keys" },
        ],
      },
    ],
  },
  {
    id: "developer",
    label: "Developer",
    items:
      process.env.NODE_ENV !== "production"
        ? [{ id: "ui-kitchen-sink", label: "UI Kitchen Sink", href: "/ui-kitchen-sink" }]
        : [],
  },
];

const labelMap: Record<string, string> = {
  analytics: "Analytics",
  reports: "Reports",
  users: "Users",
  billing: "Billing",
  settings: "Settings",
  profile: "Profile",
  security: "Security",
  "api-keys": "API Keys",
  "ui-kitchen-sink": "UI Kitchen Sink",
};

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const cleaned = pathname.split("?")[0].split("#")[0];
  const segments = cleaned.split("/").filter(Boolean);

  if (segments.length === 0) {
    return [{ label: "Dashboard", href: "/" }];
  }

  const crumbs: BreadcrumbItem[] = [{ label: "Dashboard", href: "/" }];
  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    crumbs.push({
      label: labelMap[segment] ?? segment.replace(/-/g, " "),
      href: currentPath,
    });
  });

  return crumbs;
}

export const mockNotifications = (
  <div className="w-80 rounded-xl border border-border bg-popover shadow-2xl">
    <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
      <span>Notifications</span>
      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
        2 New
      </Badge>
    </div>
    <ScrollArea className="max-h-80">
      <div className="space-y-3 px-4 py-3 text-sm text-muted-foreground">
        <div className="rounded-lg border border-border/60 bg-background p-3">
          New user invitation accepted.
        </div>
        <div className="rounded-lg border border-border/60 bg-background p-3">
          Billing report is ready.
        </div>
      </div>
    </ScrollArea>
  </div>
);

export const mockUserMenu = (
  <div className="w-60 rounded-xl border border-border bg-popover shadow-2xl">
    <div className="border-b border-border px-4 py-3">
      <p className="text-sm font-semibold text-foreground">Alex Rivera</p>
      <p className="text-xs text-muted-foreground">alex@saasstarter.dev</p>
    </div>
    <div className="p-2">
      <button
        type="button"
        className="flex w-full items-center rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
      >
        Profile
      </button>
      <button
        type="button"
        className="mt-1 flex w-full items-center rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
      >
        Settings
      </button>
      <button
        type="button"
        className="mt-2 flex w-full items-center justify-center rounded-md bg-destructive/10 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-destructive transition hover:bg-destructive hover:text-destructive-foreground"
      >
        Sign out
      </button>
    </div>
  </div>
);

export const topBarConfig: TopBarConfig = {
  userMenu: mockUserMenu,
  notifications: mockNotifications,
  search: {
    placeholder: "Search",
  },
};

export const baseAppShellConfig: Pick<AppShellConfig, "brand" | "navGroups" | "topBar"> = {
  brand,
  navGroups,
  topBar: topBarConfig,
};
