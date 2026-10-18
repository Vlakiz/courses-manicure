"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faGraduationCap,
  faMedal,
  faShoePrints,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export type Course = {
  id: string;
  icon: string;
  level: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  price: string;
  bonus: string;
  note: string;
  program: string[];
  image: StaticImageData;
};

export type CourseLabels = {
  duration: string;
  format: string;
  program: string;
  bonus: string;
  price: string;
  enroll: string;
};

type Props = {
  courses: Course[];
  labels: CourseLabels;
};

const ICONS: Record<string, IconDefinition> = {
  basic: faGraduationCap,
  upgrade: faArrowTrendUp,
  pedicure: faShoePrints,
  advanced: faMedal,
};

export default function CourseTabs({ courses, labels }: Props) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(courses[0].id);
  const active = courses.find((course) => course.id === activeId) ?? courses[0];

  return (
    <div className="text-left">
      <div role="tablist" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {courses.map((course) => {
          const selected = course.id === active.id;

          return (
            <button
              key={course.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${course.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              onClick={() => setActiveId(course.id)}
              className={clsx(
                "cursor-pointer rounded-2xl border p-4 md:p-5 text-left transition-colors duration-300",
                selected
                  ? "border-yellow-200/60 bg-yellow-400/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              )}
            >
              <FontAwesomeIcon
                icon={ICONS[course.icon]}
                className={clsx("text-xl transition-colors", selected ? "text-yellow-200" : "text-neutral-500")}
              />
              <div className={clsx("mt-3 leading-snug", selected ? "text-neutral-100" : "text-neutral-300")}>
                {course.title}
              </div>
              <div className="mt-1 text-sm text-neutral-500">
                {course.duration} · {course.price}
              </div>
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 animate-fade-in"
      >
        <div className="lg:col-span-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.65)]">
            <Image
              src={active.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[62%_center]"
            />
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col">
          <span className="text-sm uppercase tracking-wide text-yellow-200">{active.level}</span>
          <h3 className="mt-2 text-3xl md:text-4xl text-neutral-100 leading-tight">{active.title}</h3>
          <p className="mt-3 text-lg text-neutral-400 leading-relaxed">{active.description}</p>

          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
              <dt className="text-sm text-neutral-500">{labels.duration}</dt>
              <dd className="mt-1 text-neutral-100">{active.duration}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
              <dt className="text-sm text-neutral-500">{labels.format}</dt>
              <dd className="mt-1 text-neutral-100">{active.format}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <div className="text-sm uppercase tracking-wide text-neutral-500">{labels.program}</div>
            <ol className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {active.program.map((point, index) => (
                <li key={point} className="flex items-baseline gap-4 py-3">
                  <span className="w-6 shrink-0 text-sm text-yellow-200/80 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-neutral-200">{point}</span>
                </li>
              ))}
            </ol>
            {active.note && (
              <p className="mt-4 border-l-2 border-yellow-200/50 pl-4 text-neutral-300">{active.note}</p>
            )}
            {active.bonus && (
              <p className="mt-4 text-sm text-neutral-400">
                <span className="text-yellow-200">{labels.bonus}:</span> {active.bonus}
              </p>
            )}
          </div>

          <div className="mt-8 lg:mt-auto lg:pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="text-sm text-neutral-500">{labels.price}</div>
              <div className="text-4xl text-yellow-100">{active.price}</div>
            </div>
            <button className="btn-schedule justify-center">{labels.enroll}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
