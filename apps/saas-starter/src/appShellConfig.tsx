"use client";

import type { ElementType } from "react";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ScrollArea,
} from "@b1dx/ui";
import type { AppShellConfig, Brand, NavGroup, TopBarConfig } from "@b1dx/ui";
import {
  BarChart2,
  BarChart3,
  Bell,
  Calendar,
  Check,
  DollarSign,
  FileText,
  HelpCircle,
  Languages,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Moon,
  Monitor,
  Plus,
  Rocket,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sun,
  User,
  Users,
  Warehouse,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";

type Theme = "light" | "dark" | "system";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: "image" | "initials" | "icon";
  avatar?: string;
  initials?: string;
  initialsBg?: string;
  icon?: ReactNode;
  iconBg?: string;
  iconColor?: string;
};

const brand: Brand = {
  title: "OMS Pro",
  subtitle: "Enterprise Admin",
  logo: (
    <div className="rounded-lg bg-[#1d8cf8] p-2 text-white shadow-lg shadow-blue-100">
      <Rocket size={20} />
    </div>
  ),
};

const navGroups: NavGroup[] = [
  {
    id: "main",
    label: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: <LayoutGrid size={22} />,
      },
    ],
  },
  {
    id: "management",
    label: "Management",
    items: [
      {
        id: "orders",
        label: "Orders",
        icon: <ShoppingCart size={22} />,
        children: [
          { id: "all-orders", label: "All Orders", href: "/orders" },
          { id: "processing-orders", label: "Processing Orders", href: "/processing-orders" },
          { id: "packing", label: "Packing", href: "/packing" },
          { id: "tracking-update", label: "Tracking Update", href: "/tracking-update" },
          { id: "tracking-status", label: "Tracking Status", href: "/tracking-status" },
        ],
      },
      {
        id: "inventory",
        label: "Inventory",
        icon: <Warehouse size={22} />,
        children: [
          { id: "inventory-products", label: "Inventory", href: "/products" },
          { id: "inventory-alerts", label: "Inventory", href: "/stock-alerts" },
        ],
      },
      {
        id: "customers",
        label: "Customers",
        href: "/customers",
        icon: <Users size={22} />,
      },
    ],
  },
  {
    id: "analysis",
    label: "Analysis",
    items: [
      {
        id: "reports",
        label: "Reports",
        icon: <BarChart3 size={22} />,
        children: [
          { id: "sales-report", label: "Reports", href: "/sales-report" },
          { id: "revenue", label: "Reports", href: "/revenue" },
        ],
      },
    ],
  },
  {
    id: "settings",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: <Settings size={22} />,
      },
    ],
  },
];

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Congratulations Flora",
    description: "Won the monthly bestseller gold badge",
    time: "1h ago",
    unread: true,
    type: "image",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    title: "Cecilia Becker",
    description: "Accepted your connection",
    time: "12h ago",
    unread: true,
    type: "initials",
    initials: "CB",
    initialsBg: "bg-slate-100 text-slate-600",
  },
  {
    id: "3",
    title: "Bernard Woods",
    description: "You have new message from Bernard Woods",
    time: "May 18, 8:26 AM",
    unread: false,
    type: "image",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    title: "Monthly report generated",
    description: "July month financial report is generated",
    time: "Apr 24, 10:30 AM",
    unread: false,
    type: "icon",
    icon: <BarChart2 size={18} />,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
  {
    id: "5",
    title: "Application has been approved",
    description: "Your recent SKU update was approved",
    time: "Apr 20, 2:15 PM",
    unread: false,
    type: "initials",
    initials: "MG",
    initialsBg: "bg-emerald-50 text-emerald-600",
  },
];

const LanguageDropdown = ({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  const languages = [
    { id: "en", label: "English" },
    { id: "th", label: "Thai" },
  ];

  return (
    <div className="w-44 overflow-hidden rounded-xl border border-border bg-popover py-1.5 shadow-2xl">
      {languages.map((lang) => (
        <button
          key={lang.id}
          type="button"
          onClick={() => onSelect(lang.id)}
          className={`mx-1.5 w-[calc(100%-12px)] rounded-lg px-4 py-2.5 text-sm transition-all ${
            selectedId === lang.id
              ? "bg-accent text-accent-foreground font-semibold"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

const ShortcutsDropdown = () => {
  const shortcuts = [
    { title: "Calendar", description: "Appointments", icon: Calendar },
    { title: "Invoice App", description: "Manage Accounts", icon: FileText },
    { title: "Users", description: "Manage Users", icon: Users },
    { title: "Role Management", description: "Permissions", icon: ShieldCheck },
    { title: "Dashboard", description: "User Dashboard", icon: LayoutDashboard },
    { title: "Settings", description: "Account Settings", icon: Settings },
  ];

  return (
    <div className="w-[360px] overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
        <h3 className="font-bold text-foreground">Shortcuts</h3>
        <button
          type="button"
          className="rounded-lg border border-transparent p-1.5 text-muted-foreground transition-colors hover:border-border hover:bg-card hover:text-primary"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2">
        {shortcuts.map((item, index) => (
          <div
            key={item.title}
            className={`flex cursor-pointer flex-col items-center p-6 text-center transition-all hover:bg-accent/50 group ${
              index % 2 === 0 ? "border-r border-border/50" : ""
            } ${index < shortcuts.length - 2 ? "border-b border-border/50" : ""}`}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-card group-hover:text-primary group-hover:shadow-md">
              <item.icon size={22} />
            </div>
            <p className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
              {item.title}
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-tighter text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotificationsDropdown = () => {
  return (
    <div className="w-[380px] overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-foreground">Notifications</h3>
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
            2 New
          </Badge>
        </div>
        <button
          type="button"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-card hover:text-primary"
        >
          <Check size={16} />
        </button>
      </div>

      <ScrollArea className="max-h-[420px]">
        <div className="divide-y divide-border/50">
          {mockNotifications.map((item) => (
            <div
              key={item.id}
              className="group flex cursor-pointer gap-3 px-5 py-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex-shrink-0">
                {item.type === "image" && item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.title}
                    className="h-10 w-10 rounded-full object-cover shadow-sm"
                  />
                ) : null}
                {item.type === "initials" && item.initials ? (
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold shadow-sm ${item.initialsBg}`}
                  >
                    {item.initials}
                  </div>
                ) : null}
                {item.type === "icon" && item.icon ? (
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${item.iconBg} ${item.iconColor}`}
                  >
                    {item.icon}
                  </div>
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-bold text-foreground">{item.title}</p>
                  {item.unread ? (
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary animate-pulse" />
                  ) : null}
                </div>
                <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-muted/20 p-4">
        <Button className="w-full py-5 text-xs font-bold uppercase tracking-widest">
          View All Activity
        </Button>
      </div>
    </div>
  );
};

const ProfileDropdown = ({ onLogout }: { onLogout?: () => void }) => {
  const menuItems = [
    { label: "My Profile", icon: User },
    { label: "Settings", icon: Settings },
    { label: "Pricing", icon: DollarSign },
    { label: "FAQ", icon: HelpCircle },
  ];

  return (
    <div className="w-64 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
      <div className="flex items-center gap-4 border-b border-border bg-muted/30 p-5">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
            alt="Alex Rivera"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-background shadow-md"
          />
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-bold leading-tight text-foreground">Alex Rivera</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            alex.rivera@oms-admin.com
          </p>
        </div>
      </div>

      <div className="p-1.5 py-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className="group flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon size={18} className="text-muted-foreground transition-colors group-hover:text-primary" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-border bg-muted/20 p-3 pt-2">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-destructive/10 py-2.5 text-xs font-bold uppercase tracking-widest text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground active:scale-95"
        >
          Logout
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
};

const TopBarActions = () => {
  const [language, setLanguage] = useState("en");
  const [activeTheme, setActiveTheme] = useState<Theme>("light");

  // One-time: sync from localStorage after hydration
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) setActiveTheme(stored);
  }, []);

  // Every time activeTheme changes: apply to DOM + persist
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (activeTheme === "system") {
      root.classList.add(
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      );
    } else {
      root.classList.add(activeTheme);
    }
    localStorage.setItem("theme", activeTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (activeTheme === "system") {
        root.classList.remove("light", "dark");
        root.classList.add(mediaQuery.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [activeTheme]);

  const themes: { id: Theme; label: string; icon: ElementType }[] = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  const CurrentThemeIcon = themes.find((theme) => theme.id === activeTheme)?.icon ?? Sun;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Languages size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-none p-0 shadow-none">
          <LanguageDropdown
            selectedId={language}
            onSelect={(id) => {
              setLanguage(id);
              i18n.changeLanguage(id);
              localStorage.setItem("language", id);
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <CurrentThemeIcon size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 rounded-xl border border-border bg-popover p-1.5 shadow-2xl"
        >
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                activeTheme === theme.id
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <theme.icon
                size={18}
                className={activeTheme === theme.id ? "text-primary" : "text-muted-foreground"}
              />
              {theme.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <LayoutGrid size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-none p-0 shadow-none">
          <ShortcutsDropdown />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-10 w-10">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-destructive" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-none p-0 shadow-none">
          <NotificationsDropdown />
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-2 h-8 w-px bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-3 rounded-xl p-1 pr-2 transition-all duration-200 hover:bg-accent"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Alex Rivera"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent shadow-sm transition-all group-hover:ring-primary/20"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-bold leading-none text-foreground">Alex Rivera</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-tighter text-muted-foreground">
                Warehouse Lead
              </p>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-none p-0 shadow-none">
          <ProfileDropdown />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const topBarConfig: TopBarConfig = {
  title: "Orders",
  search: {
    placeholder: "Search orders, customers, SKUs...",
  },
  actions: <TopBarActions />,
};

export const appShellConfig: Pick<AppShellConfig, "brand" | "navGroups" | "topBar"> = {
  brand,
  navGroups,
  topBar: topBarConfig,
};

/** Returns navGroups with labels translated to the active language. */
export const useTranslatedNavGroups = (): NavGroup[] => {
  const { t } = useTranslation();
  return [
    {
      id: "main",
      label: t("nav.main"),
      items: [
        { id: "dashboard", label: t("nav.dashboard"), href: "/", icon: <LayoutGrid size={22} /> },
      ],
    },
    {
      id: "management",
      label: t("nav.management"),
      items: [
        {
          id: "orders",
          label: t("nav.orders"),
          icon: <ShoppingCart size={22} />,
          children: [
            { id: "all-orders", label: t("nav.all_orders"), href: "/orders" },
            { id: "processing-orders", label: t("nav.processing_orders"), href: "/processing-orders" },
            { id: "packing", label: t("nav.packing"), href: "/packing" },
            { id: "tracking-update", label: t("nav.tracking_update"), href: "/tracking-update" },
            { id: "tracking-status", label: t("nav.tracking_status"), href: "/tracking-status" },
          ],
        },
        {
          id: "inventory",
          label: t("nav.inventory"),
          icon: <Warehouse size={22} />,
          children: [
            { id: "inventory-products", label: t("nav.inventory"), href: "/products" },
            { id: "inventory-alerts", label: t("nav.inventory"), href: "/stock-alerts" },
          ],
        },
        { id: "customers", label: t("nav.customers"), href: "/customers", icon: <Users size={22} /> },
      ],
    },
    {
      id: "analysis",
      label: t("nav.analysis"),
      items: [
        {
          id: "reports",
          label: t("nav.reports"),
          icon: <BarChart3 size={22} />,
          children: [
            { id: "sales-report", label: t("nav.reports"), href: "/sales-report" },
            { id: "revenue", label: t("nav.reports"), href: "/revenue" },
          ],
        },
      ],
    },
    {
      id: "settings",
      items: [
        { id: "settings", label: t("nav.settings"), href: "/settings", icon: <Settings size={22} /> },
      ],
    },
  ];
};
