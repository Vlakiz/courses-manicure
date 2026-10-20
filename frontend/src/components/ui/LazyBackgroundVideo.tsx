"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

// Looping ambient video that only starts downloading once it is close to the viewport
// (these sit at the very bottom of the pages), and never for users with "reduce motion".
export default function LazyBackgroundVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        video.src = src;
        video.play().catch(() => {});
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      poster={poster}
      className={className}
    />
  );
}
