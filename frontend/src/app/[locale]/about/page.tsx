import type { Metadata } from "next";
import { Fragment } from "react";
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
  faBan,
  faCertificate,
  faClock,
  faCouch,
  faGem,
  faGift,
  faHeart,
  faLocationDot,
  faMugHot,
  faPhone,
  faShieldHalved,
  faSprayCanSparkles,
  faTv,
  faUserGraduate,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import FadeInSection from "@/components/ui/FadeInSection";
import SalonGallery from "@/components/ui/SalonGallery";

import masterImage from "@/../public/images/about/master.webp";

type Props = {
  params: Promise<{ locale: string }>;
};

type FeatureItem = {
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

const HYGIENE_ICONS: Record<string, IconDefinition> = {
  sterilize: faSprayCanSparkles,
  singleUse: faBan,
  certified: faCertificate,
};

const COMFORT_ICONS: Record<string, IconDefinition> = {
  cozy: faCouch,
  netflix: faTv,
  drinks: faMugHot,
  gift: faGift,
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
  const values = t.raw("values.items") as FeatureItem[];
  const hygieneItems = t.raw("hygiene.items") as FeatureItem[];
  const comfortItems = t.raw("comfort.items") as FeatureItem[];

  const address = tFooter("address");
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const phone = tFooter("phone");
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneTelHref = `tel:+${phoneDigits}`;
  const whatsappHref = `https://wa.me/${phoneDigits}`;
  const telegramHref = `https://t.me/+${phoneDigits}`;

  const schedule = [
    { day: tFooter("days.mon"), hours: tFooter("dayOff"), closed: true },
    { day: tFooter("days.tue"), hours: tFooter("workHours"), closed: false },
    { day: tFooter("days.wed"), hours: tFooter("workHours"), closed: false },
    { day: tFooter("days.thu"), hours: tFooter("workHours"), closed: false },
    { day: tFooter("days.fri"), hours: tFooter("workHours2"), closed: false },
    { day: tFooter("days.sat"), hours: tFooter("workHours2"), closed: false },
    { day: tFooter("days.sun"), hours: tFooter("dayOff"), closed: true },
  ];

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
        <div className="bg-neutral-900/50 mt-16 md:mt-24 py-14 md:py-20 flex justify-center px-3 md:px-0">
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
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight">
              {t("comfort.heading")} <span className="text-yellow-100">{t("comfort.headingHighlight")}</span>
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              {t("comfort.subtitle")}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-white/10 lg:divide-y-0 rounded-3xl border border-white/10 bg-white/[0.02] mt-10 overflow-hidden">
              {comfortItems.map((item) => (
                <div key={item.title} className="p-6 md:p-8 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={COMFORT_ICONS[item.icon]} className="text-2xl text-yellow-200" />
                  </div>
                  <h3 className="mt-4 text-lg text-neutral-100">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="bg-neutral-900/50 mt-16 md:mt-24 py-14 md:py-20 flex justify-center px-3 md:px-0">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-2 text-center lg:text-left">
                <FontAwesomeIcon icon={faShieldHalved} className="text-4xl text-yellow-200" />
                <h2 className="mt-4 text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight">
                  {t("hygiene.heading")} <span className="text-yellow-100">{t("hygiene.headingHighlight")}</span>
                </h2>
                <p className="mt-4 text-neutral-400 max-w-md mx-auto lg:mx-0">
                  {t("hygiene.subtitle")}
                </p>
              </div>
              <div className="lg:col-span-3">
                <ul className="glass-card divide-y divide-white/10">
                  {hygieneItems.map((item) => (
                    <li key={item.title} className="flex items-start gap-4 p-5 md:p-6">
                      <FontAwesomeIcon icon={HYGIENE_ICONS[item.icon]} className="text-xl text-yellow-200 mt-1 shrink-0" />
                      <div>
                        <h3 className="text-neutral-100">{item.title}</h3>
                        <p className="mt-1 text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-neutral-500 mb-2">{t("location.hoursLabel")}</div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
                      {schedule.map(({ day, hours, closed }) => (
                        <Fragment key={day}>
                          <span className="text-neutral-200">{day}</span>
                          <span className={closed ? "text-neutral-500 italic" : "text-neutral-100"}>{hours}</span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FontAwesomeIcon icon={faPhone} className="text-2xl text-yellow-200 mt-1" />
                  <div>
                    <div className="text-sm text-neutral-500">{tFooter("contacts")}</div>
                    <a href={phoneTelHref} className="text-lg text-neutral-100 hover:text-yellow-200 transition-colors">
                      {phone}
                    </a>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-neutral-500">{t("location.contactHint")}</span>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="text-neutral-400 hover:text-[#25D366] transition-colors"
                      >
                        <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                      </a>
                      <a
                        href={telegramHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        className="text-neutral-400 hover:text-[#26A5E4] transition-colors"
                      >
                        <FontAwesomeIcon icon={faTelegram} className="text-lg" />
                      </a>
                    </div>
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
