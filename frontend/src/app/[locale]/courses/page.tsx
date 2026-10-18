import type { Metadata } from "next";
import clsx from "clsx";

import Image, { type StaticImageData } from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { manrope } from "@/lib/fonts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCertificate,
  faCheck,
  faChevronDown,
  faGift,
  faHeart,
  faUser,
  faUtensils,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import FadeInSection from "@/components/ui/FadeInSection";
import CourseTabs, { type Course } from "@/components/ui/CourseTabs";

import heroImage from "@/../public/images/courses/learning-process-1.webp";
import basicImage from "@/../public/images/courses/learning-process-3.webp";
import upgradeImage from "@/../public/images/courses/learning-process-4.webp";
import pedicureImage from "@/../public/images/courses/learning-process-2.webp";
import advancedImage from "@/../public/images/courses/learning-process-5.webp";
import certificateImage from "@/../public/images/courses/certificate.webp";
import bookImage from "@/../public/images/courses/book-nail-bible.webp";
import student1Image from "@/../public/images/courses/student-1.webp";
import student2Image from "@/../public/images/courses/student-2.webp";
import student3Image from "@/../public/images/courses/student-3.webp";
import closingVideoPoster from "@/../public/images/courses/closing-video-poster.webp";

type Props = {
  params: Promise<{ locale: string }>;
};

type RawCourse = Omit<Course, "image">;

type FactItem = {
  icon: string;
  label: string;
};

type ResultItem = {
  icon: string;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const COURSE_IMAGES: Record<string, StaticImageData> = {
  basic: basicImage,
  upgrade: upgradeImage,
  pedicure: pedicureImage,
  advanced: advancedImage,
};

const FACT_ICONS: Record<string, IconDefinition> = {
  user: faUser,
  certificate: faCertificate,
  heart: faHeart,
};

const RESULT_ICONS: Record<string, IconDefinition> = {
  book: faBookOpen,
  certificate: faCertificate,
  gift: faGift,
  lunch: faUtensils,
  support: faHeart,
};

const GRADUATE_PHOTOS = [student1Image, student2Image, student3Image];

const MASK_EDGES =
  "[mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%),linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "courses" });

  return {
    title: t("seo.title"),
    description: t("seo.description"),
  };
}

export default async function Courses({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("courses");
  const facts = t.raw("hero.facts") as FactItem[];
  const courses = (t.raw("list.items") as RawCourse[]).map((course) => ({
    ...course,
    image: COURSE_IMAGES[course.id],
  }));
  const resultItems = t.raw("results.items") as ResultItem[];
  const consultationItems = t.raw("start.consultation.items") as string[];
  const trialItems = t.raw("start.trial.items") as string[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <div className={clsx(manrope.className)}>
      <div className="flex justify-center px-3 md:px-0">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl text-neutral-100/90 select-none leading-tight">
              {t("hero.headingMain")} <span className="text-yellow-100">{t("hero.headingHighlight")}</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0">{t("hero.subtitle")}</p>

            <ul className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-neutral-300">
              {facts.map((fact) => (
                <li key={fact.label} className="inline-flex items-center gap-2.5">
                  <FontAwesomeIcon icon={FACT_ICONS[fact.icon]} className="text-yellow-200" />
                  {fact.label}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8">
              <button className="btn-schedule justify-center">{t("hero.cta")}</button>
              <a
                href="#courses"
                className="text-neutral-300 hover:text-yellow-200 transition-colors underline underline-offset-8 decoration-white/20 hover:decoration-yellow-200/60"
              >
                {t("hero.secondary")}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.65)]">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <FadeInSection>
        <div
          id="courses"
          className="scroll-mt-24 bg-neutral-900/50 mt-14 md:mt-20 py-14 md:py-20 flex justify-center px-3 md:px-0"
        >
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight">
                {t("list.heading")} <span className="text-yellow-100">{t("list.headingHighlight")}</span>
              </h2>
              <p className="mt-4 text-neutral-400 max-w-xl mx-auto">{t("list.subtitle")}</p>
            </div>

            <div className="mt-10">
              <CourseTabs
                courses={courses}
                labels={{
                  duration: t("list.durationLabel"),
                  format: t("list.formatLabel"),
                  program: t("list.programLabel"),
                  bonus: t("list.bonusLabel"),
                  price: t("list.priceLabel"),
                  enroll: t("list.enroll"),
                }}
              />
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex justify-center mt-16 md:mt-24 px-3 md:px-0">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="relative mx-auto w-full max-w-md aspect-[4/5]">
              <div className="absolute top-0 left-0 w-[62%] aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.65)] -rotate-3">
                <Image
                  src={certificateImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 60vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[58%] aspect-[3/4] rounded-2xl overflow-hidden ring-4 ring-background shadow-[0_25px_60px_-20px_rgba(0,0,0,0.65)] rotate-3">
                <Image
                  src={bookImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 60vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight text-center lg:text-left">
                {t("results.heading")} <span className="text-yellow-100">{t("results.headingHighlight")}</span>
              </h2>
              <p className="mt-4 text-neutral-400 text-center lg:text-left">{t("results.subtitle")}</p>
              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {resultItems.map((item) => (
                  <li key={item.title} className="flex items-center gap-5 py-5">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                      <FontAwesomeIcon icon={RESULT_ICONS[item.icon]} className="text-xl text-yellow-200" />
                    </div>
                    <div>
                      <h3 className="text-neutral-100">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-neutral-400">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="bg-neutral-900/50 mt-16 md:mt-24 py-14 md:py-20 flex justify-center px-3 md:px-0">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight">
              {t("graduates.heading")} <span className="text-yellow-100">{t("graduates.headingHighlight")}</span>
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">{t("graduates.subtitle")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-10 max-w-sm sm:max-w-none mx-auto">
              {GRADUATE_PHOTOS.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden ring-1 ring-white/10"
                >
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex justify-center mt-16 md:mt-24 px-3 md:px-0">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight">
                {t("start.heading")} <span className="text-yellow-100">{t("start.headingHighlight")}</span>
              </h2>
              <p className="mt-4 text-neutral-400 max-w-xl mx-auto">{t("start.subtitle")}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="flex flex-col p-6 md:p-10">
                <span className="self-start rounded-full bg-yellow-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-900">
                  {t("start.consultation.badge")}
                </span>
                <h3 className="mt-5 text-2xl text-neutral-100">{t("start.consultation.title")}</h3>
                <ul className="mt-6 space-y-3">
                  {consultationItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-neutral-300">
                      <FontAwesomeIcon icon={faCheck} className="text-yellow-200 mt-1.5 text-sm shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <button className="btn-schedule justify-center w-full sm:w-auto">{t("start.consultation.cta")}</button>
                </div>
              </div>

              <div className="flex flex-col p-6 md:p-10">
                <span className="self-start rounded-full border border-yellow-200/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-yellow-200">
                  {t("start.trial.badge")}
                </span>
                <h3 className="mt-5 text-2xl text-neutral-100">{t("start.trial.title")}</h3>
                <p className="mt-4 text-neutral-400 leading-relaxed">{t("start.trial.intro")}</p>
                <ul className="mt-4 space-y-3">
                  {trialItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-neutral-300">
                      <FontAwesomeIcon icon={faCheck} className="text-yellow-200 mt-1.5 text-sm shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-neutral-400 leading-relaxed">{t("start.trial.outro")}</p>
                <div className="mt-auto pt-8">
                  <button className="btn-schedule justify-center w-full sm:w-auto">{t("start.trial.cta")}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="bg-neutral-900/50 mt-16 md:mt-24 py-14 md:py-20 flex justify-center px-3 md:px-0">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl text-neutral-100/90 select-none leading-tight text-center">
              {t("faq.heading")} <span className="text-yellow-100">{t("faq.headingHighlight")}</span>
            </h2>
            <div className="mt-10 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] open:border-yellow-200/30 transition-colors"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-neutral-100 select-none [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-yellow-200 text-sm shrink-0 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="px-5 pb-5 text-neutral-400 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="relative overflow-hidden flex justify-center py-24 md:py-36">
          <div className="absolute inset-0 flex justify-center">
            <div className="relative container">
              <video
                aria-hidden
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                poster="/images/courses/closing-video-poster.webp"
                className={clsx("motion-reduce:hidden absolute inset-0 w-full h-full object-cover opacity-30", MASK_EDGES)}
              >
                <source src="/videos/courses/closing-loop.mp4" type="video/mp4" />
              </video>
              <Image
                aria-hidden
                src={closingVideoPoster}
                alt=""
                fill
                sizes="(max-width: 1536px) 100vw, 1536px"
                className={clsx("hidden motion-reduce:block object-cover opacity-30", MASK_EDGES)}
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
