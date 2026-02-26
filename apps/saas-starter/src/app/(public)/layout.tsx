import type { ReactNode } from "react";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-muted text-foreground">
      <div className="mx-auto flex min-h-screen max-w-sm items-center px-6 py-12">
        {children}
      </div>
    </div>
  );
}
