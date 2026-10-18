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

    const liClass = "py-2 xl:py-0 inline-flex items-center cursor-pointer relative after:bg-yellow-200/70 after:absolute " +
                    "after:h-0.5 after:w-0 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300";

    return (
        <header
            className={`${commissioner.className} shadow-md fixed top-0 right-0 left-0 z-50 xl:backdrop-blur-xs bg-background/80 xl:bg-transparent`}
        >
            <div className="flex justify-center text-lg py-4 font-light">
                <div className="container flex items-center justify-between px-5">
                    <Link href="/">
                        <div className={`text-5xl ${ephesis.className} cursor-pointer select-none`}>
                            Ro<span className='text-yellow-200'>.</span>Manic
                        </div>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="p-2 rounded cursor-pointer inline-block xl:hidden"
                        aria-label={open ? t("closeMenu") : t("openMenu")}
                    >
                        <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-2xl" />
                    </button>
                    <aside
                        className={clsx(
                            "fixed top-0 left-0 h-full transform transition-transform xl:static xl:translate-x-0 border-r border-yellow-200/20 xl:border-none w-90 xl:w-auto select-none",
                            open ? "translate-x-0" : "-translate-x-full"
                        )}
                    >
                        <div className="bg-background xl:bg-transparent h-full flex flex-col items-center gap-8 xl:flex-row xl:gap-10">
                            <ul className="flex flex-col flex-1 items-center justify-center xl:flex-none xl:flex-row text-neutral-100 text-3xl xl:text-lg uppercase gap-25 xl:gap-10 px-10 xl:p-0 pt-24 xl:pt-0">
                                <li className={liClass}>
                                    <Link href="/about">{t("about")}</Link>
                                </li>
                                <li className={liClass}>
                                    <Link href="/prices">{t("prices")}</Link>
                                </li>
                                <li className={liClass}>
                                    <Link href="/courses">{t("courses")}</Link>
                                </li>
                            </ul>
                            <div className="mt-auto xl:mt-0 w-full xl:w-auto flex flex-col items-center gap-24 xl:flex-row xl:gap-10 pb-10 xl:pb-0">
                                <button className="btn-schedule">
                                    {t("book").toUpperCase()}
                                </button>
                                <div className="w-full xl:w-auto flex justify-center xl:justify-start px-6 pt-6 xl:p-0 border-t border-white/10 xl:border-none">
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </header>
    );
}
