// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";
import QueryClientContextProvider from "@/providers/react-query.provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster as ShadcnUiToaster } from "@/components/ui/toaster";
import {DirectionProvider} from "@/providers/direction-provider"; // Add this

export const metadata: Metadata = {
  title: "LegalSaaS Pro - AI-Powered Legal Platform",
  description: "Transform your legal practice with AI-powered case analysis and legal education tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const lang = langCookie === "ar" ? "ar" : "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir}>
      <body className="antialiased bg-sidebar overflow-x-hidden">
        <ThemeProvider>
          <QueryClientContextProvider>
            <DirectionProvider> {/* Wrap with DirectionProvider */}
              <SonnerToaster
                toastOptions={{}}
                expand={false}
                position={dir === "rtl" ? "bottom-left" : "bottom-right"}
                closeButton
                richColors
                visibleToasts={4}
                duration={8000}
              />
              <ShadcnUiToaster />
              <NuqsAdapter>{children}</NuqsAdapter>
            </DirectionProvider>
          </QueryClientContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}