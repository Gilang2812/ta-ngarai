"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import { useFetchGalleries } from "@/features/web/useFetchGalleries"; 
import { ImageSkeleton } from "@/components/loading/ImageSkeleton";
import { GallerySchema } from "@/types/schema/GallerySchema";
import ImgCraft from "../common/ImgCraft";

export const TourismGalleries = ({ id }: { id?: string }) => {
  const { data, isLoading } = useFetchGalleries<GallerySchema>("tourism", id);

  return (
    <figure className=" ">
      <div className=" min-h-fit flex items-center justify-center relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          loop={true}
          pagination={{
            type: "custom",
            renderCustom: (
              swiper: import("swiper").Swiper,
              current: number,
              total: number
            ) => {
              let bullets = "";
              for (let i = 1; i <= total; i++) {
                if (i === current) {
                  // Garis aktif
                  bullets += `<span class="swiper-pagination-line-active inline-block mx-1 w-8 h-1 bg-white"></span>`;
                } else {
                  // Garis tidak aktif
                  bullets += `<span class="swiper-pagination-line inline-block mx-1 w-8 h-1 bg-white/60 "></span>`;
                }
              }
              return `<div class="custom-pagination flex justify-center mt-4">${bullets}</div>`;
            },
          }}
          autoplay={{ delay: 3000 }}
          className="  rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background hover:[&_div]:text-slate-300 [&_div]:transition-ease-in-out   "
        >
          {isLoading && <ImageSkeleton />}
          {data?.map((g) => (
            <SwiperSlide key={g.id}>
              <ImgCraft
                src={g.url}
                alt={"gallery" + g.id}
                width={500}
                height={500}
                className="mx-auto object-cover w-full"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </figure>
  );
};
