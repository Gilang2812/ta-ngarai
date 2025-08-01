"use client";

import React from "react";
import {
  NextButton,
  PrevButton,
} from "@/components/landingPage/CarouselButtons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { CarouselItem } from "./CarouseItem";
import { IMAGES } from "@/data/landingPageImge";

const CustomPagination = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        return (
          <div
            key={i}
            className={`p-1 flex items-center border justify-center transition-all duration-300 ${
              isActive
                ? "bg-primary border-primary"
                : "bg-transparent border-white"
            }`}
          >
            <span className={`size-1 rounded-full bg-white`}></span>
          </div>
        );
      })}
    </div>
  );
};

const CarouselArticle = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="h-[calc(100vh-5rem)]  relative col-span-1">
      <div className="relative h-full">
        <Swiper
          className="h-full shadow-lg border-4 border-primary"
          spaceBetween={30}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex); // realIndex = current slide in loop
          }}
        >
          {IMAGES.map((image, index) => (
            <SwiperSlide key={index}>
              <CarouselItem
                image={image.src}
                title={image.title}
                description={`Description for ${image.description}`}
              />
            </SwiperSlide>
          ))}

          <div className="absolute font-light z-50 bottom-2 w-full flex gap-4 items-center justify-center px-4 py-2">
            <PrevButton />
            <CustomPagination current={activeIndex} total={IMAGES.length} />
            <NextButton />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselArticle;
