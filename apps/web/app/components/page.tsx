import { AppEmptyState, Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@b1dx/ui';

const rows = [
  { name: 'Launch Checklist', status: 'In review', owner: 'Taylor' },
  { name: 'Token Audit', status: 'Ready', owner: 'Riley' },
  { name: 'App Shell', status: 'Draft', owner: 'Jordan' }
];

export default function ComponentsPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">Component Gallery</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          A compact grid of core UI elements rendered via @b1dx/ui. Adjust tokens or components and refresh to validate
          styling changes quickly.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Primary, secondary, and semantic variants.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Tagging + status emphasis.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>Active</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Form fields and spacing rhythm.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Project name" />
            <Input placeholder="Owner" />
            <Input placeholder="Status" />
          </CardContent>
          <CardFooter>
            <Button size="sm">Submit</Button>
          </CardFooter>
        </Card>

        <AppEmptyState
          title="No active deployments"
          description="Create a release to populate this panel with status cards."
          actions={
            <>
              <Button size="sm">Create release</Button>
              <Button size="sm" variant="outline">
                View docs
              </Button>
            </>
          }
        />
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Table</CardTitle>
            <CardDescription>Compact table styling for list views.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
