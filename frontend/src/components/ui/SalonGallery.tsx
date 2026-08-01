"use client";

import { useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import PhotoLightbox from "@/components/ui/PhotoLightbox";

type Props = {
  photos: string[];
  slots: number;
  placeholder: string;
  photoLabel: string;
};

export default function SalonGallery({ photos, slots, placeholder, photoLabel }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 sm:gap-1 mt-10">
        {Array.from({ length: slots }).map((_, i) => {
          const src = photos[i];

          return (
            <div key={i} className="relative aspect-square overflow-hidden bg-neutral-900/50">
              {src ? (
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group block w-full h-full cursor-zoom-in"
                  aria-label={`${photoLabel} ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    quality={90}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-neutral-500">
                  <FontAwesomeIcon icon={faCamera} className="text-3xl" />
                  <span className="text-xs px-2 text-center">{placeholder}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
