import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "../globals.css";
import "@/lib/fontawesome";

import { routing, type Locale } from "@/i18n/routing";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

// Our "ua" URL locale is the Ukrainian language, whose correct BCP-47 tag is
// "uk" ("ua" would be read by browsers/search engines as unrecognized).
const htmlLang: Record<Locale, string> = {
  ru: "ru",
  pl: "pl",
  ua: "uk",
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={htmlLang[locale]}>
      <body className='antialiased'>
        <NextIntlClientProvider>
          <Header />
          <div className="mt-25">
            <main className="min-h-screen">
              {children}
            </main>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
