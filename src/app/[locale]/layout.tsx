import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";
import { ThemeProvider } from "next-themes";
import QueryClientContextProvider from "@/providers/react-query.provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster as ShadcnUiToaster } from "@/components/ui/toaster";
// import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata =  {
  title: "Lawyer AI Platform",
  description: "AI-powered legal platform", 
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} antialiased bg-sidebar overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <QueryClientContextProvider>
              {/* <Navbar locale={locale} /> */}
              <SonnerToaster
                toastOptions={{}}
                expand={false}
                position="bottom-right"
                closeButton
                richColors
                visibleToasts={4}
                duration={8000}
              />
              <ShadcnUiToaster />
              <NuqsAdapter>
                <main>{children}</main>
              </NuqsAdapter>
            </QueryClientContextProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}