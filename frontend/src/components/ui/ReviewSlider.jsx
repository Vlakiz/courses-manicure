'use client';

import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faQuoteRight, faStar, faUser } from "@fortawesome/free-solid-svg-icons";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ReviewSlider({ reviews }) {
  const swiperRef = useRef(null);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        icon={faStar}
        key={index} 
        size={14}
        className={index < rating ? "text-yellow-200" : "text-gray-300"} 
      />
    ));
  };

  return (
    <div className="w-full mx-auto md:px-4 py-12 relative">
      <Swiper
        className="overflow-visible! py-10"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={1.25}
        centeredSlides={true}
        loop={true}
        speed={600}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false 
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          768: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
          }
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="h-auto">
            <div className="
              transition-all duration-500 ease-out
              transform scale-90 opacity-60 grayscale

              in-[.swiper-slide-active]:scale-110
              in-[.swiper-slide-active]:opacity-100
              in-[.swiper-slide-active]:grayscale-0
              
              bg-zinc-900 rounded-2xl p-8 shadow-xl border border-gray-100/30 min-h-100 flex flex-col items-center text-center
            ">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center border-4 border-white shadow-sm">
                  <FontAwesomeIcon icon={faUser} size={35} className="text-2xl text-black text-pink-300 opacity-50 hover:opacity-80" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-200 text-white rounded-full p-2 flex items-center justify-center">
                  <FontAwesomeIcon icon={faQuoteRight} size={12} className="text-2xl text-black opacity-50 hover:opacity-80" />
                </div>
              </div>

              <div className="flex gap-1 mb-4 justify-center">
                {renderStars(review.rating)}
              </div>

              <blockquote className="text-gray-300 mb-6 grow text-lg">
                "{review.text}"
              </blockquote>

              <figcaption>
                <div className="font-bold text-yellow-200 text-lg">{review.name}</div>
                <div className="text-yellow-200 text-sm font-medium">{review.role}</div>
              </figcaption>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-12 h-12 flex items-center justify-center rounded-full  border-gray-200 text-yellow-200 hover:bg-yellow-500/10 hover:text-yellow-200 hover:border-yellow-200 transition-colors shadow-sm cursor-pointer"
          aria-label="Предыдущий отзыв"
        >
          <FontAwesomeIcon icon={faChevronLeft} size={20} />
        </button>
        <button 
          onClick={() => swiperRef.current?.slideNext()}
          className="w-12 h-12 flex items-center justify-center rounded-full  border-gray-200 text-yellow-200 hover:bg-yellow-500/10 hover:text-yellow-200 hover:border-yellow-200 transition-colors shadow-sm cursor-pointer"
          aria-label="Следующий отзыв"
        >
          <FontAwesomeIcon icon={faChevronRight} size={20} />
        </button>
      </div>

    </div>
  );
};