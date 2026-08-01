"use client";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faImages } from "@fortawesome/free-solid-svg-icons";

import FadeInSection from "@/components/ui/FadeInSection";
import PhotoLightbox from "@/components/ui/PhotoLightbox";

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
                      className="group glass-card p-5 sm:p-6 cursor-pointer"
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
        <PhotoLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onIndexChange={(index) => setLightbox((s) => (s ? { ...s, index } : s))}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
