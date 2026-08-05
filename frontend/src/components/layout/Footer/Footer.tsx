import clsx from 'clsx';
import { useTranslations } from "next-intl";

import { commissioner, ephesis } from "@/lib/fonts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    const t = useTranslations("footer");

    const liSocialClass = "cursor-pointer bg-white/5 hover:bg-neutral-100 p-2 rounded-full flex justify-content align-center group transition duration-300";

    return (
        <footer className="mt-15 pb-5">
          <div className="flex justify-center pb-4 mt-5 border-t border-white/40">
            <div className={clsx('container', commissioner.className)}>
              <div className="relative flex justify-center">
                <div className={clsx('text-6xl select-none absolute py-5 px-7 -bottom-12 border rounded-full border-white/40 bg-background', ephesis.className)}>
                  Ro<span className='text-yellow-200'>.</span>Manic
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-17 md:mt-20 mb-5 md:mb-10">
                <div className="col-span-2 md:col-span-1 justify-self-center mb-5 md:mb-0">
                  <div className="hidden md:block text-lg font-semibold mb-3">
                    {t("social")}
                  </div>
                  <ul className="space-x-2 flex">
                    <li className={liSocialClass}>
                      <FontAwesomeIcon icon={faInstagram} className="text-2xl group-hover:text-black" />
                    </li>
                    <li className={liSocialClass}>
                      <FontAwesomeIcon icon={faFacebook} className="text-2xl group-hover:text-black" />
                    </li>
                    <li className={liSocialClass}>
                      <FontAwesomeIcon icon={faTiktok} className="text-2xl group-hover:text-black" />
                    </li>
                    <li className={liSocialClass}>
                      <FontAwesomeIcon icon={faYoutube} className="text-2xl group-hover:text-black" />
                    </li>
                  </ul>
                </div>
                <div className="justify-self-center">
                  <div className="text-lg font-semibold mb-3">
                    {t("hours")}
                  </div>
                  <div className="mb-2">
                    <p className="text-sm">
                      {t("workDays")}
                    </p>
                    <p className="text-sm italic">
                      {t("workHours")}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm">
                      {t("workDays2")}
                    </p>
                    <p className="text-sm italic">
                      {t("workHours2")}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm">
                      {t("restDays")}
                    </p>
                    <p className="text-sm italic">
                      {t("dayOff")}
                    </p>
                  </div>
                </div>
                <div className="justify-self-center">
                  <div className="text-lg font-semibold mb-3">
                    {t("contacts")}
                  </div>
                  <p className="text-sm mb-2">
                    {t("phone")}
                  </p>
                  <p className="text-sm">
                    {t("address")}
                  </p>
                </div>
              </div>
              <div className="text-center text-neutral-500 mt-10 md:mt-0">
                {t("copyright")}
              </div>
            </div>
          </div>
        </footer>
    );
}
