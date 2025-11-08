import Image from "next/image";

import mainImage from "@/../public/images/home/hero-1.webp";

import { manrope } from "@/lib/fonts";

export default function Home() {
  return (
    <div className={manrope.className}>
      <div className="grid grid-cols-3 mb-8 w-full text-neutral-400">
        <div className="col-span-2 mt-25">
          <h1 className="text-8xl mb-2 text-center sm:text-left text-transparent bg-clip-text bg-linear-to-r from-yellow-300/85 from-10% via-yellow-200/90 via-20% to-yellow-300/85 to-50% bg-size-[200%_200%] bg-position-0 animate-background select-none">
            Ro.Manic
          </h1>
          <h3 className="text-4xl font-light text-neutral-100 mt-3">
            — студия маникюра и курсов в Гданьске.
          </h3>
          <p className="mt-10 text-xl italic">
            Маникюр, созданный с любовью и вниманием к каждой детали.
          </p>
        </div>
        <div>
          <Image
            aria-hidden
            src={mainImage}
            alt="Main image"
            width={600}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
