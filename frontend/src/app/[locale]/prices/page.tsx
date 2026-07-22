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

      <div className="flex justify-center pb-20">
        <button className="btn-schedule">{t("cta").toUpperCase()}</button>
      </div>
    </div>
  );
}
