import clsx from 'clsx';

import { commissioner, ephesis } from "@/lib/fonts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    const liSocialClass = "cursor-pointer bg-white/5 hover:bg-neutral-100 p-2 rounded-full flex justify-content align-center group transition duration-300";

    return (
        <footer className="mt-25 pb-5">
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
                    Соц.сети
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
                    Часы работы
                  </div>
                  <div className="mb-2">
                    <p className="text-sm">
                      Вторник - Суббота
                    </p>
                    <p className="text-sm italic">
                      10:00 - 20:00
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm">
                      Воскресенье - Понедельник
                    </p>
                    <p className="text-sm italic">
                      выходной
                    </p>
                  </div>
                </div>
                <div className="justify-self-center">
                  <div className="text-lg font-semibold mb-3">
                    Контакты
                  </div>
                  <p className="text-sm mb-2">
                    +48 123 456 789
                  </p>
                  <p className="text-sm">
                    Gdansk, ul.Polna 15
                  </p>
                </div>
              </div>
              <div className="text-center mt-10 md:mt-0">
                © 2025 Ro.Manic. Студия маникюра в Гданьске.
              </div>
            </div>
          </div>
        </footer>
    );
};