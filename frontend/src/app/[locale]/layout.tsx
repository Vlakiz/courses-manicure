import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

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

  const messages = await getMessages();

  return (
    <html lang={htmlLang[locale]}>
      <body className='antialiased'>
        {/* Only the namespaces read by client components (Header, ReviewSlider) are shipped to the
            browser; passing everything would inline the whole locale JSON into every page. Add a
            namespace here when a new client component calls useTranslations() on it. */}
        <NextIntlClientProvider
          messages={{ nav: messages.nav, home: { reviews: messages.home.reviews } }}
        >
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
