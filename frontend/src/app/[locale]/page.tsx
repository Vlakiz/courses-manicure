import type { ReactNode } from "react";
import clsx from "clsx";

import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import heroImage from "@/../public/images/home/hero.webp";
import aboutImage from "@/../public/images/home/about.webp";
import closingVideoPoster from "@/../public/images/home/closing-video-poster.webp";

import FadeInSection from "@/components/ui/FadeInSection";
import LazyBackgroundVideo from "@/components/ui/LazyBackgroundVideo";
import ReviewSlider from "@/components/ui/ReviewSlider";
import Marquee from "@/components/ui/Marquee";
import WorksShowcase from "@/components/ui/WorksShowcase";

import { manrope } from "@/lib/fonts";
import { reviews } from '@/data/reviews';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <div className={clsx(manrope.className)}>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full container">
          <div className="col-span-2 lg:mt-25 mb-10 lg:mb-0 px-3">
            <h1 className="text-8xl mb-2 text-transparent bg-clip-text bg-linear-to-r from-yellow-300/85 from-10% via-yellow-200/90 via-20% to-yellow-300/85 to-50% bg-size-[200%_200%] bg-position-0 animate-background select-none">
              RO.manic
            </h1>
            <h3 className="text-4xl font-light text-zinc-50/90 text-shadow-2xs mt-3">
              {t.rich("hero.subtitle", {
                city: (chunks: ReactNode) => <span className="text-yellow-100">{chunks}</span>,
              })}
            </h3>
            <p className="mt-10 text-xl italic text-neutral-400 ">
              {t("hero.tagline")}
            </p>
          </div>
          <div className="relative">
            <Image
              aria-hidden
              src={heroImage}
              alt="Main image"
              width={600}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="rounded-[2rem] w-full shadow-[0_25px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-yellow-100/15"
              priority
            />
          </div>
        </div>
      </div>

      <Marquee>
        <span className="mx-8 text-2xl">Ro.manic</span>
      </Marquee>

      <FadeInSection>
        <div className="bg-neutral-900/50 flex justify-center py-5">
          <div className="container grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="order-1 lg:order-0 mt-10 lg:mt-0">
              <Image
                aria-hidden
                src={aboutImage}
                alt="About me image"
                width={600}
                className="rounded-[2rem] w-full shadow-[0_25px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-yellow-100/15"
              />
            </div>
            <div className="col-span-2 flex flex-col pl-3 mt-10 xl:mt-25 order-0 lg:order-1">
              <h2 className="text-6xl font-light pl-10 border-l-4 border-yellow-200 text-neutral-100/90 select-none">
                {t("about.heading")}
              </h2>
              <div className="text-neutral-300/90">
                <p className="mt-10 lg:mt-15 text-xl leading-8 space-y-4 max-w-2xl">
                  {t.rich("about.paragraph1", {
                    name: (chunks: ReactNode) => <span className="text-yellow-100">{chunks}</span>,
                  })}
                </p>
                <p className="mt-5 lg:mt-10 text-xl leading-8 space-y-4 max-w-2xl">
                  {t("about.paragraph2")}
                </p>
                <p className="mt-5 lg:mt-10 text-xl leading-8 space-y-4 max-w-2xl">
                  {t("about.paragraph3")}
                </p>
              </div>
              <div>
                <p className="mt-7 lg:mt-15 text-xl leading-8 space-y-4 max-w-2xl">
                  <Link className="text-yellow-100 hover:underline underline-offset-6 opacity-80 hover:opacity-100" href="/about">
                    {t("about.link")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex justify-center pb-5">
          <div className="container text-center">
            <h2 className="text-5xl mt-15 text-neutral-100/90 select-none inline-block px-5 leading-tight">
              {t("gallery.headingMain")}
              <br className="md:hidden"/>
              <span className="text-yellow-100 mt-2"> {t("gallery.headingHighlight")}</span>
            </h2>
          </div>
        </div>
        <div className="flex justify-center px-3 md:px-0">
          <div className="container mt-4 md:mt-10">
            <WorksShowcase
              images={[
                "/images/home/works/works-1.jpg",
                "/images/home/works/works-2.jpg",
                "/images/home/works/works-3.jpg",
                "/images/home/works/works-4.jpg",
                "/images/home/works/works-5.jpg",
              ]}
              label={`${t("gallery.headingMain")} ${t("gallery.headingHighlight")}`}
            />
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="bg-neutral-900/50 flex justify-center mt-10 py-10 px-5 md:px-0">
          <div className="container">
            <div className="text-center">
              <h2 className="text-5xl text-neutral-100/90 select-none inline-block leading-tight">
                {t("reviews.headingPrefix")} <span className="text-yellow-100 mt-2">{t("reviews.headingHighlight")}</span> {t("reviews.headingSuffix")}
              </h2>
            </div>
            <div className="mt-4 md:mt-10 flex justify-center overflow-hidden md:mask-[linear-gradient(to_right,transparent_0%,background_10%,background_90%,transparent_100%)]">
              <ReviewSlider reviews={reviews} />
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="relative overflow-hidden flex justify-center py-24 md:py-36">
          <div className="absolute inset-0 flex justify-center">
            <div className="relative container">
              <LazyBackgroundVideo
                src="/videos/home/closing-loop.mp4"
                poster="/images/home/closing-video-poster.webp"
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
            <h2 className="text-5xl md:text-7xl text-transparent bg-clip-text bg-linear-to-r from-yellow-300/85 from-10% via-yellow-200/90 via-20% to-yellow-300/85 to-50% bg-size-[200%_200%] bg-position-0 animate-background select-none leading-tight">
              {t("closing.heading")}
            </h2>
            <p className="mt-6 text-xl text-neutral-400 max-w-xl mx-auto">
              {t("closing.subtitle")}
            </p>
            <div className="mt-10 flex justify-center">
              <button className="btn-cta min-w-xs justify-center">{t("closing.cta").toUpperCase()}</button>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
