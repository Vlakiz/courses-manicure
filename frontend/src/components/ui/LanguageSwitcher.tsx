"use client";

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
        <div className="flex items-center space-x-2 text-sm normal-case">
            {routing.locales.map((loc, i) => (
                <span key={loc} className="flex items-center">
                    {i > 0 && <span className="text-neutral-500 mr-2">/</span>}
                    <button
                        onClick={() => router.replace(pathname, { locale: loc })}
                        className={
                            loc === locale
                                ? "text-yellow-200 cursor-default"
                                : "text-neutral-400 hover:text-yellow-200 cursor-pointer transition-colors"
                        }
                        disabled={loc === locale}
                    >
                        {labels[loc]}
                    </button>
                </span>
            ))}
        </div>
    );
}
