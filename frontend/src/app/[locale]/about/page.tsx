import type { Metadata } from "next";
import clsx from "clsx";

import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { manrope } from "@/lib/fonts";
import { salonPhotos } from "@/data/salonPhotos";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faGem,
  faHeart,
  faLocationDot,
  faPhone,
  faShieldHalved,
  faUserGraduate,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import FadeInSection from "@/components/ui/FadeInSection";
import SalonGallery from "@/components/ui/SalonGallery";

import masterImage from "@/../public/images/about/master.webp";

type Props = {
  params: Promise<{ locale: string }>;
};

type ValueItem = {
  icon: string;
  title: string;
  description: string;
};

const VALUE_ICONS: Record<string, IconDefinition> = {
  shield: faShieldHalved,
  gem: faGem,
  heart: faHeart,
  graduate: faUserGraduate,
};

const GALLERY_SLOTS = 9;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("seo.title"),
    description: t("seo.description"),
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tFooter = await getTranslations("footer");
  const values = t.raw("values.items") as ValueItem[];

  const address = tFooter("address");
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className={clsx(manrope.className)}>
      <div className="flex justify-center">
        <div className="container px-3 md:px-0 text-center">
          <h1 className="text-5xl md:text-6xl text-neutral-100/90 select-none inline-block leading-tight">
            {t("hero.headingMain")} <span className="text-yellow-100">{t("hero.headingHighlight")}</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>

      <FadeInSection>
        <div className="bg-neutral-900/50 mt-14 md:mt-20 py-14 md:py-20 flex justify-center">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10 px-3 md:px-0 items-center">
            <div className="lg:col-span-1">
              <Image
                src={masterImage}
                alt=""
                width={600}
                className="w-full"
              />
            </div>
            <div className="lg:col-span-2">
              <span className="text-yellow-200 uppercase tracking-wide text-sm select-none">
                {t("master.heading")}
              </span>
              <h2 className="text-4xl mt-2 text-neutral-100/90 select-none">
                {t("master.name")} <span className="text-yellow-100 text-xl align-middle">— {t("master.experience")}</span>
              </h2>
              <p className="mt-2 text-neutral-400">{t("master.role")}</p>
              <div className="mt-6 space-y-4 text-neutral-300 leading-relaxed max-w-2xl">
                <p>{t("master.bio1")}</p>
                <p>{t("master.bio2")}</p>
                <p>{t("master.bio3")}</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex justify-center mt-16 md:mt-24 px-3 md:px-0">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight">
              {t("values.heading")} <span className="text-yellow-100">{t("values.headingHighlight")}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 text-left">
              {values.map((value) => (
                <div key={value.title} className="glass-card p-6">
                  <FontAwesomeIcon icon={VALUE_ICONS[value.icon]} className="text-3xl text-yellow-200" />
                  <h3 className="mt-4 text-lg text-neutral-100">{value.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex justify-center mt-16 md:mt-24 px-3 md:px-0">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight">
              {t("gallery.heading")} <span className="text-yellow-100">{t("gallery.headingHighlight")}</span>
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              {t("gallery.subtitle")}
            </p>
            <SalonGallery
              photos={salonPhotos}
              slots={GALLERY_SLOTS}
              placeholder={t("gallery.placeholder")}
              photoLabel={`${t("gallery.heading")} ${t("gallery.headingHighlight")}`}
            />
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex justify-center mt-16 md:mt-24 px-3 md:px-0">
          <div className="glass-card container max-w-4xl py-12 px-6 md:px-12 text-center">
            <FontAwesomeIcon icon={faShieldHalved} className="text-4xl text-yellow-200" />
            <h2 className="mt-4 text-2xl md:text-3xl text-neutral-100/90 select-none">
              {t("hygiene.heading")}
            </h2>
            <p className="mt-4 text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {t("hygiene.text")}
            </p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex justify-center mt-16 md:mt-24 px-3 md:px-0">
          <div className="container">
            <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight text-center">
              {t("location.heading")} <span className="text-yellow-100">{t("location.headingHighlight")}</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
              <div className="glass-card p-8 flex flex-col justify-center gap-6">
                <div className="flex items-start gap-4">
                  <FontAwesomeIcon icon={faLocationDot} className="text-2xl text-yellow-200 mt-1" />
                  <div>
                    <div className="text-sm text-neutral-500">{t("location.addressLabel")}</div>
                    <div className="text-lg text-neutral-100">{address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FontAwesomeIcon icon={faClock} className="text-2xl text-yellow-200 mt-1" />
                  <div>
                    <div className="text-sm text-neutral-500">{t("location.hoursLabel")}</div>
                    <div className="text-neutral-100">{tFooter("workDays")} <span className="text-neutral-400 italic">{tFooter("workHours")}</span></div>
                    <div className="text-neutral-100">{tFooter("workDays2")} <span className="text-neutral-400 italic">{tFooter("workHours2")}</span></div>
                    <div className="text-neutral-100">{tFooter("restDays")} <span className="text-neutral-400 italic">{tFooter("dayOff")}</span></div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FontAwesomeIcon icon={faPhone} className="text-2xl text-yellow-200 mt-1" />
                  <div>
                    <div className="text-sm text-neutral-500">{tFooter("contacts")}</div>
                    <div className="text-lg text-neutral-100">{tFooter("phone")}</div>
                  </div>
                </div>
                <a
                  href={mapLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-schedule justify-center mt-2"
                >
                  {t("location.mapLink")}
                </a>
              </div>
              <div className="rounded-3xl overflow-hidden border border-white/10 min-h-80 lg:min-h-full">
                <iframe
                  src={mapEmbedSrc}
                  className="w-full h-full min-h-80"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={address}
                />
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <div className="flex justify-center px-3 md:px-0 mt-16 md:mt-24 pb-20">
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
            <span className="relative text-8xl select-none">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
