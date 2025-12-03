import { commissioner, ephesis } from "@/lib/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const liClass = "py-2 md:py-0 inline-flex items-center cursor-pointer relative after:bg-yellow-200 after:absolute " +
                    "after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300";

    return (
        <header
            className={`${commissioner.className} shadow-md fixed top-0 right-0 left-0 z-50 md:backdrop-blur-xs bg-background/80 md:bg-transparent`}
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
                    <aside className="fixed top-0 left-0 h-full transform -translate-x-full peer-checked:translate-x-0 transition-transform md:static md:translate-x-0 border-r border-yellow-200/20 md:border-none w-90 md:w-auto select-none">
                        <div className="bg-background md:bg-transparent h-full position-relative">       
                            <ul className="flex flex-col md:flex-row text-neutral-100 uppercase md:space-x-4 lg:space-x-10 space-y-10 md:space-y-0 p-10 md:p-0 h-full md:h-auto items-center md:items-stretch py-20 md:py-0">
                                <li className={liClass}>
                                    Обо мне
                                </li>
                                <li className={liClass}>
                                    Услуги
                                </li>
                                <li className={liClass}>
                                    Цены
                                </li>
                                <li className={liClass}>
                                    Курсы
                                </li>
                                <li className="px-3 inline-flex items-center cursor-pointer mt-auto">
                                    <button className="btn-schedule">
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