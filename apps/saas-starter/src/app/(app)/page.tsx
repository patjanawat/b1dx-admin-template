import { Button, Card, CardContent, CardHeader, CardTitle } from "@b1dx/ui";
import { Calendar, Download } from "lucide-react";

const stats = [
  { label: "Total Orders", value: "1,284", delta: "+12.5%", accent: "text-blue-600" },
  { label: "Pending Shipments", value: "42", delta: "Needs attention", accent: "text-amber-600" },
  { label: "Low Stock Items", value: "12", delta: "8 critical SKUs", accent: "text-rose-600" },
  { label: "Today's Revenue", value: "$14,250.00", delta: "High performing", accent: "text-emerald-600" },
];

const recentActivity = Array.from({ length: 18 }).map((_, index) => ({
  id: `activity-${index + 1}`,
  label: `Activity item ${index + 1}`,
  time: "Just now",
}));

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Dashboard Overview
          </h1>
          <p className="font-medium text-muted-foreground">
            Welcome back, Alex. Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden gap-2 shadow-sm sm:flex">
            <Calendar size={16} className="text-primary" />
            Oct 24, 2023
          </Button>
          <Button variant="outline" size="sm" className="flex gap-2 shadow-sm">
            <Download size={16} className="text-emerald-500" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className={`mt-2 text-xs font-semibold ${stat.accent}`}>{stat.delta}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`order-${index + 1}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground"
                >
                  <span>Order #ORD-{7800 - index}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide">Processing</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Quick Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                  Peak Sales Hour
                </p>
                <p className="text-lg font-bold text-foreground">2:00 PM - 4:00 PM</p>
                <p className="mt-2 text-xs font-medium text-primary/70">Up 14% more than average</p>
              </div>

              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Top Region
                </p>
                <p className="text-lg font-bold text-foreground">California, US</p>
                <p className="mt-2 text-xs font-medium text-emerald-500">32% of total volume</p>
              </div>

              <Button variant="ghost" className="w-full font-bold text-primary hover:text-primary/80">
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-lg shadow-primary/20">
            <div className="relative z-10">
              <h3 className="mb-2 text-lg font-bold">Upgrade to Pro</h3>
              <p className="mb-4 text-sm leading-relaxed text-primary-foreground/80">
                Get advanced AI-driven stock forecasting and multi-warehouse support.
              </p>
              <Button variant="secondary" size="sm" className="font-bold">
                Learn More
              </Button>
            </div>
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-500"></div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recentActivity.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-border bg-background px-5 py-4 text-sm text-muted-foreground"
          >
            <span>{item.label}</span>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
