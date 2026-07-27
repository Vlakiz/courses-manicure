import type { Metadata } from "next";
import clsx from "clsx";

import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { manrope } from "@/lib/fonts";
import { servicePhotos } from "@/data/servicePhotos";

import PriceList, { type PriceCategory } from "@/components/ui/PriceList";

type Props = {
  params: Promise<{ locale: string }>;
};

type RawPriceItem = {
  id: string;
  name: string;
  price: string;
  duration?: string;
  description?: string;
  features?: string[];
};

type RawPriceCategory = {
  title: string;
  items: RawPriceItem[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "prices" });

  return {
    title: t("seo.title"),
    description: t("seo.description"),
  };
}

export default async function Prices({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("prices");
  const rawCategories = t.raw("categories") as RawPriceCategory[];

  const categories: PriceCategory[] = rawCategories.map((category) => ({
    title: category.title,
    items: category.items.map((item) => ({
      ...item,
      photos: servicePhotos[item.id] ?? [],
    })),
  }));

  return (
    <div className={clsx(manrope.className)}>
      <div className="flex justify-center">
        <div className="container px-3 md:px-0 text-center">
          <h1 className="text-5xl md:text-6xl text-neutral-100/90 select-none inline-block leading-tight">
            {t("headingMain")} <span className="text-yellow-100">{t("headingHighlight")}</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-400 italic max-w-2xl mx-auto">
            {t("note")}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-10 md:mt-16 pb-20 px-3 md:px-0">
        <div className="container">
          <PriceList categories={categories} />
        </div>
      </div>

      <div className="flex justify-center px-3 md:px-0 pb-20">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-3 py-14 px-6 md:py-16 md:px-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl leading-snug select-none text-yellow-100">
              {t("closing.heading")}
            </h2>
            <p className="mt-4 text-neutral-400 text-lg max-w-xl mx-auto md:mx-0">
              {t("closing.subtitle")}
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <button className="btn-cta min-w-xs justify-center">{t("cta").toUpperCase()}</button>
            </div>
          </div>
          <div className="hidden md:flex md:col-span-2 items-center justify-center relative">
            <div className="pointer-events-none absolute w-56 h-56 rounded-full bg-yellow-300/20 blur-3xl" />
            <span className="relative text-8xl select-none">💅</span>
          </div>
        </div>
      </div>
    </div>
  );
}
