import { сommissioner, ephesis } from "@/lib/fonts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <header
            className={`${сommissioner.className} shadow-md fixed top-0 right-0 left-0 z-50`}
        >
            <div className="flex justify-center text-lg py-4 font-light">
            <div className="container flex items-center justify-between px-5 md:px-0">
                <div className={`text-5xl ${ephesis.className} cursor-pointer select-none`}>
                Ro<span className='text-yellow-200'>.</span>Manic
                </div>
                <input id="menu" type="checkbox" className="peer hidden"/>
                <label htmlFor="menu" className="p-2 rounded cursor-pointer inline-block peer-checked:hidden md:hidden">
                <FontAwesomeIcon icon={faBars} className="text-2xl group-hover:text-black" />
                </label>
                <label htmlFor="menu" className="p-2 rounded cursor-pointer hidden peer-checked:inline-block md:peer-checked:hidden">
                <FontAwesomeIcon icon={faXmark} className="text-2xl group-hover:text-black" />
                </label>
                <aside className="fixed top-0 left-0 h-full transform -translate-x-full peer-checked:translate-x-0 transition-transform md:static md:translate-x-0 border-r border-yellow-200/20 md:border-none w-90 md:w-auto ">
                <div className="bg-background md:bg-transparent h-full position-relative">       
                    <ul className="flex flex-col md:flex-row text-neutral-100 uppercase md:space-x-4 lg:space-x-10 space-y-10 md:space-y-0 p-10 md:p-0 h-full md:h-auto items-center md:items-stretch py-20 md:py-0">
                    <li className="py-2 md:py-0 inline-flex items-center cursor-pointer relative after:bg-yellow-200 after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                        Главная
                    </li>
                    <li className="py-2 md:py-0 inline-flex items-center cursor-pointer relative after:bg-yellow-200 after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                        Обо мне
                    </li>
                    <li className="py-2 md:py-0 inline-flex items-center cursor-pointer relative after:bg-yellow-200 after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                        Услуги
                    </li>
                    <li className="py-2 md:py-0 inline-flex items-center cursor-pointer relative after:bg-yellow-200 after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                        Курсы
                    </li>
                    <li className="px-3 inline-flex items-center cursor-pointer mt-auto">
                        <button className="inline-flex cursor-pointer items-center select-none text-center px-6 py-4 md:px-4 md:py-2 rounded-full overflow-hidden text-2xl md:text-base bg-yellow-400/2.5 border border-yellow-500/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(242,241,187,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-yellow-400/30 duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-br before:from-yellow-300/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-tl after:from-yellow-300/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition antialiased">
                        ЗАПИСАТЬСЯ
                        </button>
                    </li>
                    </ul>
                </div>
                </aside>
            </div>
            </div>
        </header>
    );
};