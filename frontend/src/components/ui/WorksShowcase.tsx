"use client";

import { useState } from "react";

import PhotoLightbox from "@/components/ui/PhotoLightbox";

type Props = {
  images: string[];
  label: string;
};

export default function WorksShowcase({ images, label }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tileClass =
    "group relative rounded-2xl md:rounded-3xl overflow-hidden ring-1 ring-white/10 hover:ring-yellow-200/60 transition cursor-zoom-in";

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className={`${tileClass} col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto`}
          aria-label={`${label} 1`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[0]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
        {images.slice(1).map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightboxIndex(i + 1)}
            className={`${tileClass} aspect-square`}
            aria-label={`${label} ${i + 2}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={images}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
