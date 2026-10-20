"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function FadeInSection({ children }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            // `transform: none` once revealed (instead of translateY(0)) so finished
            // sections don't keep a permanent compositor layer / containing block.
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
            className="motion-reduce:opacity-100! motion-reduce:transform-none! motion-reduce:transition-none!"
        >
            {children}
        </div>
    );
}
