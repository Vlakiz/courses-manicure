"use client";

import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faClock, faImages, faXmark } from "@fortawesome/free-solid-svg-icons";

import FadeInSection from "@/components/ui/FadeInSection";

export type PriceItem = {
  id: string;
  name: string;
  price: string;
  duration?: string;
  description?: string;
  features?: string[];
  photos: string[];
};

export type PriceCategory = {
  title: string;
  items: PriceItem[];
};

type Props = {
  categories: PriceCategory[];
};

type LightboxState = {
  photos: string[];
  index: number;
};

export default function PriceList({ categories }: Props) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const touchStartX = useRef<number | null>(null);

  const next = () =>
    setLightbox((s) => (s ? { ...s, index: (s.index + 1) % s.photos.length } : s));

  const prev = () =>
    setLightbox((s) => (s ? { ...s, index: (s.index - 1 + s.photos.length) % s.photos.length } : s));

  useEffect(() => {
    if (!lightbox) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox !== null]);

  return (
    <>
      <div className="space-y-14">
        {categories.map((category) => (
          <FadeInSection key={category.title}>
            <section>
              <h2 className="text-3xl md:text-4xl text-yellow-100 mb-6 select-none">
                {category.title}
              </h2>
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {category.items.map((item) => {
                  const hasPhotos = item.photos.length > 0;

                  return (
                    <li
                      key={item.id}
                      className="group bg-neutral-900/50 rounded-2xl p-5 sm:p-6 hover:bg-neutral-900/70 transition-colors duration-300"
                    >
                      <div className="flex items-start gap-4">
                        {hasPhotos && (
                          <button
                            type="button"
                            onClick={() => setLightbox({ photos: item.photos, index: 0 })}
                            className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden ring-1 ring-yellow-200/20 hover:ring-yellow-200/70 transition cursor-zoom-in"
                            aria-label={item.name}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.photos[0]}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {item.photos.length > 1 && (
                              <span className="absolute bottom-1 right-1 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                <FontAwesomeIcon icon={faImages} className="text-[9px]" />
                                {item.photos.length}
                              </span>
                            )}
                          </button>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg text-neutral-100 leading-snug">{item.name}</h3>
                            <span className="text-yellow-100 whitespace-nowrap shrink-0">
                              {item.price}
                            </span>
                          </div>
                          {item.duration && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                              <FontAwesomeIcon icon={faClock} className="text-[11px]" />
                              <span>{item.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {item.description && (
                        <p className="text-sm text-neutral-400 leading-relaxed mt-4 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}

                      {item.features && item.features.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {item.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                              <span className="mt-2 w-1 h-1 rounded-full bg-yellow-200 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </FadeInSection>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 50) {
              if (delta < 0) next();
              else prev();
            }
            touchStartX.current = null;
          }}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white cursor-pointer p-2"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faXmark} className="text-3xl" />
          </button>

          {lightbox.photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer p-2"
              aria-label="Previous"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-3xl md:text-4xl" />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.photos[lightbox.index]}
            alt=""
            className="max-h-[85vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl select-none animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer p-2"
              aria-label="Next"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-3xl md:text-4xl" />
            </button>
          )}

          {lightbox.photos.length > 1 && (
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {lightbox.index + 1} / {lightbox.photos.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
