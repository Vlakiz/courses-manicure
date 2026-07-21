"use client";

import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";

import FadeInSection from "@/components/ui/FadeInSection";

export type PriceItem = {
  id: string;
  name: string;
  price: string;
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

const MAX_THUMBS = 4;

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <FadeInSection key={category.title}>
            <div className="bg-neutral-900/50 rounded-3xl p-8 h-full">
              <h2 className="text-2xl text-yellow-100 pb-4 mb-4 border-b border-yellow-200/20 select-none">
                {category.title}
              </h2>
              <ul className="space-y-5">
                {category.items.map((item) => {
                  const visiblePhotos = item.photos.slice(0, MAX_THUMBS);
                  const remaining = item.photos.length - MAX_THUMBS;

                  return (
                    <li key={item.id} className="text-neutral-200/90">
                      <div className="flex items-baseline justify-between gap-4">
                        <span>{item.name}</span>
                        <span className="flex-1 border-b border-dotted border-neutral-600/60 translate-y-[-4px]" />
                        <span className="text-yellow-100 whitespace-nowrap">{item.price}</span>
                      </div>

                      {visiblePhotos.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {visiblePhotos.map((src, i) => {
                            const isLastVisible = i === MAX_THUMBS - 1;

                            return (
                              <button
                                key={src}
                                type="button"
                                onClick={() => setLightbox({ photos: item.photos, index: i })}
                                className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden ring-1 ring-yellow-200/20 hover:ring-yellow-200/70 hover:scale-105 transition cursor-zoom-in"
                                aria-label={item.name}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt="" className="w-full h-full object-cover" />
                                {isLastVisible && remaining > 0 && (
                                  <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-sm text-white">
                                    +{remaining}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
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
