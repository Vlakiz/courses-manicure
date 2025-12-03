import clsx from "clsx";

import Image from "next/image";

import heroImage from "@/../public/images/home/hero.webp";
import aboutImage from "@/../public/images/home/about.webp";

import AnimatedGallery from "@/components/ui/AnimatedGallery";
import FadeInSection from "@/components/ui/FadeInSection";

import { manrope } from "@/lib/fonts";

export default function Home() {
  return (
    <div className={clsx(manrope.className)}>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full container">
          <div className="col-span-2 lg:mt-25 mb-10 lg:mb-0 px-3">
            <h1 className="text-8xl mb-2 text-transparent bg-clip-text bg-linear-to-r from-yellow-300/85 from-10% via-yellow-200/90 via-20% to-yellow-300/85 to-50% bg-size-[200%_200%] bg-position-0 animate-background select-none">
              RO.Manic
            </h1>
            <h3 className="text-4xl font-light text-zinc-50/90 text-shadow-2xs mt-3">
              — студия маникюра и курсов в <span className="text-yellow-100">Гданьске</span>.
            </h3>
            <p className="mt-10 text-xl italic text-neutral-400 ">
              Маникюр, созданный с любовью и вниманием к каждой детали.
            </p>
          </div>
          <div className="relative">
            <Image
              aria-hidden
              src={heroImage}
              alt="Main image"
              width={600}
              className="[mask-image:radial-gradient(circle,background_75%,transparent_100%)]"
              priority
            />
          </div>
        </div>
      </div>
      <div className="bg-black my-10 opacity-20 overflow-clip whitespace-nowrap relative flex py-4 select-none font-bold mask-[linear-gradient(to_right,transparent_0%,background_10%,background_90%,transparent_100%)] text-zinc-600/90 border-zinc-600/90 border-t border-b">
        <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around uppercase">
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
        </div>
        <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around uppercase">
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
          <span className="mx-8 text-2xl">Ro.manic</span>
        </div>
      </div>
      <FadeInSection>
        <div className="bg-neutral-900/50 flex justify-center">
          <div className="container grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="order-1 lg:order-0 mt-10 lg:mt-0">
              <Image
                aria-hidden
                src={aboutImage}
                alt="About me image"
                width={600}
                className="[mask-image:radial-gradient(circle,background_75%,transparent_100%)]"
                priority
              />
            </div>
            <div className="col-span-2 flex flex-col pl-3 mt-10 xl:mt-25 order-0 lg:order-1">
              <h2 className="text-6xl font-light pl-10 border-l-4 border-yellow-200 text-neutral-100/90 select-none">
                Давай знакомиться!
              </h2>
              <div className="text-neutral-300/90">
                <p className="mt-10 lg:mt-15 text-xl leading-8 space-y-4 max-w-2xl">
                  Меня зовут <span className="text-yellow-100">Женя</span>, я мастер маникюра и преподаватель.
                </p>
                <p className="mt-5 lg:mt-10 text-xl leading-8 space-y-4 max-w-2xl">
                  Я верю, что маникюр — это не просто уход, а способ почувствовать себя уверенно, ухоженно и красиво каждый день.
                </p>
                <p className="mt-5 lg:mt-10 text-xl leading-8 space-y-4 max-w-2xl">
                  В моей студии я создаю уют, спокойствие и атмосферу, где каждая девушка может расслабиться и почувствовать заботу.
                </p>
              </div>
              <div>
                <p className="mt-7 lg:mt-15 text-xl leading-8 space-y-4 max-w-2xl">
                  <a className="text-yellow-100 hover:underline underline-offset-6 opacity-80 hover:opacity-100" href="/about">
                    Больше обо мне узнаешь здесь &rarr;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="flex justify-center">
          <div className="container">
            <h2 className="text-5xl mt-15 text-neutral-100/90 select-none inline-block px-5 leading-tight">
              Лучше всего за меня скажут
              <br className="md:hidden"/>
              <span className="text-yellow-100 mt-2"> мои работы</span>
            </h2>
            <div className="mt-4 md:mt-10 grid md:grid-cols-2">
              <div className="lg:pt-10 lg:pl-10 hidden md:block">
                <img
                  src='/images/home/wing2.png'
                  className="w-150 object-cover"
                  alt=""
                />
              </div>
              <div className="md:rounded-4xl overflow-hidden md:outline-2 outline-yellow-100 outline-offset-8">
                <AnimatedGallery
                  images={[
                    "/images/home/works/works-1.jpg",
                    "/images/home/works/works-2.jpg",
                    "/images/home/works/works-3.jpg",
                    "/images/home/works/works-4.jpg",
                    "/images/home/works/works-5.jpg",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
