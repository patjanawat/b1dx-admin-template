export default function LoginPage() {
  return (
    <main className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Login</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue to the SaaS starter workspace.
        </p>
      </div>

      <form className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Email
          <input
            type="email"
            placeholder="you@company.com"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Password
          <input
            type="password"
            placeholder="••••••••"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <button
          type="button"
          className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
