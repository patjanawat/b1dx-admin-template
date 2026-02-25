import type { BreadcrumbItem, Brand, NavGroup } from "@b1dx/ui";

export const brand: Brand = {
  title: "SaaS Starter",
  subtitle: "Admin Console",
};

export const navGroups: NavGroup[] = [
  {
    id: "core",
    label: "Core",
    items: [
      { id: "users", label: "Users", href: "/users" },
      { id: "rbac", label: "RBAC", href: "/rbac" },
      { id: "audit-logs", label: "Audit Logs", href: "/audit-logs" },
    ],
  },
  {
    id: "dev",
    label: "Developer",
    items:
      process.env.NODE_ENV !== "production"
        ? [{ id: "ui-kitchen-sink", label: "UI Kitchen Sink", href: "/ui-kitchen-sink" }]
        : [],
  },
];

const labelMap: Record<string, string> = {
  users: "Users",
  rbac: "RBAC",
  "audit-logs": "Audit Logs",
  "ui-kitchen-sink": "UI Kitchen Sink",
};

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const cleaned = pathname.split("?")[0].split("#")[0];
  const segments = cleaned.split("/").filter(Boolean);

  if (segments.length === 0) {
    return [{ label: "Home", href: "/" }];
  }

  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
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
