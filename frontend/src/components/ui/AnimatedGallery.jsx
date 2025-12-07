"use client";
import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default function ImageSlider({
    images = [],
    autoplay = true,
    interval = 3000,
}) {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    const next = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const resetAutoplay = () => {
        if (!autoplay) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(next, interval);
    };

    useEffect(() => {
        resetAutoplay();
        return () => clearTimeout(timeoutRef.current);
    }, [index, autoplay]);

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={resetAutoplay}
        >
        <div
            className="transition-transform duration-500 flex align-middle"
            style={{ transform: `translateX(-${index * 100}%)` }}
        >
            {images.map((src, i) => (
            <img
                key={i}
                src={src}
                className="min-w-full w-full object-cover"
                alt=""
            />
            ))}
        </div>
        <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
            <FontAwesomeIcon icon={faChevronLeft} className="text-4xl text-white opacity-50 hover:opacity-80" />
        </button>

        <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer "
        >
            <FontAwesomeIcon icon={faChevronRight} className="text-4xl text-white opacity-50 hover:opacity-80"/>
        </button>
    </div>
  );
}
