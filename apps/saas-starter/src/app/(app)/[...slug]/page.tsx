import type { Metadata } from "next";

type SlugPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export const metadata: Metadata = {
  title: "SaaS Starter",
};

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const title = slug
    .join(" ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">
        This is a placeholder page to validate navigation and active route styling.
      </p>
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-sm">
        More content will live here.
      </div>
    </div>
  );
}
