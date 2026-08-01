"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { commissioner, ephesis } from "@/lib/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const liClass = "py-2 lg:py-0 inline-flex items-center cursor-pointer relative after:bg-yellow-200 after:absolute " +
                    "after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300";

    return (
        <header
            className={`${commissioner.className} shadow-md fixed top-0 right-0 left-0 z-50 lg:backdrop-blur-xs bg-background/80 lg:bg-transparent`}
        >
            <div className="flex justify-center text-lg py-4 font-light">
                <div className="container flex items-center justify-between px-5 lg:px-0">
                    <Link href="/">
                        <div className={`text-5xl ${ephesis.className} cursor-pointer select-none`}>
                            Ro<span className='text-yellow-200'>.</span>Manic
                        </div>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="p-2 rounded cursor-pointer inline-block lg:hidden"
                        aria-label={open ? t("closeMenu") : t("openMenu")}
                    >
                        <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-2xl" />
                    </button>
                    <aside
                        className={clsx(
                            "fixed top-0 left-0 h-full transform transition-transform lg:static lg:translate-x-0 border-r border-yellow-200/20 lg:border-none w-90 lg:w-auto select-none",
                            open ? "translate-x-0" : "-translate-x-full"
                        )}
                    >
                        <div className="bg-background lg:bg-transparent h-full position-relative">
                            <ul className="flex flex-col lg:flex-row text-neutral-100 uppercase lg:space-x-10 space-y-10 xl:space-y-0 p-10 lg:p-0 h-full lg:h-auto items-center lg:items-stretch py-20 lg:py-0">
                                <li className={liClass}>
                                    <Link href="/about">{t("about")}</Link>
                                </li>
                                <li className={liClass}>
                                    <Link href="/prices">{t("prices")}</Link>
                                </li>
                                <li className={liClass}>
                                    {t("courses")}
                                </li>
                                <li className="px-3 inline-flex items-center cursor-pointer mt-auto">
                                    <button className="btn-schedule">
                                        {t("book").toUpperCase()}
                                    </button>
                                </li>
                                <li className="px-3 inline-flex items-center mt-auto">
                                    <LanguageSwitcher />
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </header>
    );
}
