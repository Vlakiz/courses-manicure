"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  photos: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export default function PhotoLightbox({ photos, index, onIndexChange, onClose }: Props) {
  const touchStartX = useRef<number | null>(null);

  const next = () => onIndexChange((index + 1) % photos.length);
  const prev = () => onIndexChange((index - 1 + photos.length) % photos.length);

  // iOS Safari still lets touches scroll the page behind a fixed overlay when only
  // `overflow: hidden` is set on body — pinning it with `position: fixed` is what actually blocks it.
  useEffect(() => {
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return createPortal(
    <div
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
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
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white cursor-pointer p-2"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faXmark} className="text-3xl" />
      </button>

      {photos.length > 1 && (
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
        src={photos[index]}
        alt=""
        className="max-h-[85vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl select-none animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      />

      {photos.length > 1 && (
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

      {photos.length > 1 && (
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
          {index + 1} / {photos.length}
        </div>
      )}
    </div>,
    document.body
  );
}
