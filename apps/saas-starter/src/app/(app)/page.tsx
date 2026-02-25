export default function AppPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a placeholder page to confirm the AppShell layout, top bar, and scroll area.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`stat-${index}`}
            className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-sm"
          >
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Metric</div>
            <div className="mt-2 text-2xl font-semibold text-foreground">
              {Math.floor(1200 + index * 37)}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Last 30 days</div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={`activity-${index}`}
            className="flex items-center justify-between rounded-xl border border-border bg-background px-5 py-4 text-sm text-muted-foreground"
          >
            <span>Activity item {index + 1}</span>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Just now</span>
          </div>
        ))}
      </section>
    </div>
  );
}
