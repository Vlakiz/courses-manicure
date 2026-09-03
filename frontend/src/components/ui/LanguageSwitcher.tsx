"use client";

import clsx from "clsx";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
    pl: "PL",
    ua: "UA",
    ru: "RU",
};

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 normal-case select-none">
            {routing.locales.map((loc) => (
                <button
                    key={loc}
                    type="button"
                    onClick={() => router.replace(pathname, { locale: loc })}
                    disabled={loc === locale}
                    className={clsx(
                        "px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
                        loc === locale
                            ? "bg-gray-400/20 text-yellow-100 cursor-default"
                            : "text-neutral-400 hover:text-neutral-100 hover:bg-white/10 cursor-pointer"
                    )}
                >
                    {labels[loc]}
                </button>
            ))}
        </div>
    );
}
