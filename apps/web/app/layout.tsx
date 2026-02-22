import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import '@b1dx/theme/styles/base.css';
import '@b1dx/tokens/css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'B1DX UI Preview',
  description: 'UI preview and visual checks for the B1DX design system.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
          <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">B1DX</p>
                <p className="text-lg font-semibold">UI Preview</p>
              </div>
              <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
                <Link className="rounded-md px-2 py-1 hover:bg-slate-100" href="/">
                  Overview
                </Link>
                <Link className="rounded-md px-2 py-1 hover:bg-slate-100" href="/components">
                  Components
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
