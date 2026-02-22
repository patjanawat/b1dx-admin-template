import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from '@b1dx/ui';

const highlights = [
  {
    title: 'Design Tokens',
    description: 'Shared color, spacing, and typography tokens backed by CSS variables.'
  },
  {
    title: 'Composable UI',
    description: 'App-first components layered on top of durable primitives.'
  },
  {
    title: 'Preview Sandbox',
    description: 'One place to inspect layout, rhythm, and interaction states.'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="space-y-4">
          <Badge className="w-fit" variant="secondary">
            UI Preview Workspace
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight">B1DX Web UI Checks</h1>
          <p className="max-w-2xl text-base text-slate-600">
            A dedicated Next.js surface to validate typography, spacing, and component styling across the shared design
            system packages.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Link className="text-sm font-medium text-slate-600 hover:text-slate-900" href="/components">
            View component gallery ?
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Typography Rhythm</CardTitle>
            <CardDescription>Headline, paragraph, and supporting text alignment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-semibold">Product cadence aligned to teams</h2>
            <p className="text-sm text-slate-600">
              Validate how reading length, spacing, and contrast behave in a realistic layout. This makes it easier to
              spot regressions in base styles.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-slate-200 px-3 py-1">Base: 16px</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">Radius: 12px</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">Shadow: Soft</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link">Review tokens</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Input</CardTitle>
            <CardDescription>Check form controls in light mode.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Search by project" />
            <Input placeholder="Filter by owner" />
            <div className="flex gap-2">
              <Button size="sm">Apply</Button>
              <Button size="sm" variant="outline">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
