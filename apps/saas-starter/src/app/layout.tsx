import "./globals.css";
import { MockProvider } from "@/components/providers/MockProvider";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { ServerErrorsProvider } from "@/lib/errors/server-errors-context";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "SaaS Starter",
  description: "SaaS Starter - App Router Skeleton",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'light';var r=document.documentElement;if(t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){r.classList.add('dark');}else{r.classList.remove('dark');}}catch(e){}})();` }} />
      </head>
      <body>
        <I18nProvider>
          <ServerErrorsProvider>
            <MockProvider>
              <QueryProvider>
                <AuthProvider>{children}</AuthProvider>
              </QueryProvider>
            </MockProvider>
          </ServerErrorsProvider>
          <Toaster position="top-right" richColors />
        </I18nProvider>
      </body>
    </html>
  );
}
