import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwiper } from "swiper/react";

export const PrevButton: React.FC = () => {
  const swiper = useSwiper();
  return (
    <button
      className="p-2 border hover:cursor-pointer border-white hover:border-primary hover:bg-primary transition-ease-in-out"
      onClick={() => swiper.slidePrev()}
    >
      <FaChevronLeft className="h-6 w-6 text-white" />
    </button>
  );
};

export const NextButton: React.FC = () => {
  const swiper = useSwiper();
  return (
    <button
      className="border border-white p-2 hover:cursor-pointer hover:border-primary hover:bg-primary transition-ease-in-out"
      onClick={() => swiper.slideNext()}
    >
      <FaChevronRight className="h-6 w-6 text-white" />
    </button>
  );
};
