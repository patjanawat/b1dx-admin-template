import type { ReactNode } from "react";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <section>
      <header>
        <h1>Protected Area</h1>
      </header>
      <div>{children}</div>
    </section>
  );
}
