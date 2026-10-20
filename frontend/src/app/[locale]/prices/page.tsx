import type { Metadata } from "next";
import clsx from "clsx";

import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { manrope } from "@/lib/fonts";
import { servicePhotos } from "@/data/servicePhotos";

import PriceList, { type PriceCategory } from "@/components/ui/PriceList";
import FadeInSection from "@/components/ui/FadeInSection";
import LazyBackgroundVideo from "@/components/ui/LazyBackgroundVideo";

import closingVideoPoster from "@/../public/images/prices/closing-video-poster.webp";

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

      <div className="flex justify-center mt-10 md:mt-16 px-3 py-14 md:px-0 bg-neutral-900/50">
        <div className="container">
          <PriceList categories={categories} />
        </div>
      </div>

      <FadeInSection>
        <div className="relative overflow-hidden flex justify-center py-24 md:py-36">
          <div className="absolute inset-0 flex justify-center">
            <div className="relative container">
              <LazyBackgroundVideo
                src="/videos/prices/closing-loop.mp4"
                poster="/images/prices/closing-video-poster.webp"
                className="motion-reduce:hidden absolute inset-0 w-full h-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%),linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
              />
              <Image
                aria-hidden
                src={closingVideoPoster}
                alt=""
                fill
                sizes="(max-width: 1536px) 100vw, 1536px"
                className="hidden motion-reduce:block object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%),linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/70 to-background/95" />

          <div className="container relative text-center px-3 md:px-0">
            <h2 className="text-3xl md:text-4xl leading-snug select-none text-yellow-100">
              {t("closing.heading")}
            </h2>
            <p className="mt-4 text-neutral-400 text-lg max-w-xl mx-auto">
              {t("closing.subtitle")}
            </p>
            <div className="mt-8 flex justify-center">
              <button className="btn-cta min-w-xs justify-center">{t("cta").toUpperCase()}</button>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
