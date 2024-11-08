'use client'
import { Swiper, SwiperSlide, } from "swiper/react";
import { Navigation, Pagination,  Autoplay, } from "swiper/modules";
import Image from "next/image";
import { useFetchGalleries } from "@/features/web/useFetchGalleries";
import { imageUrl } from "@/lib/baseUrl";
import { GallerySchema } from "@/type/schema/gallerySchema";
import { ImageSkeleton } from "@/components/loading/ImageSkeleton";

export const TourismGalleries = ()=>{

  const {data, isLoading} = useFetchGalleries('tourism')
  console.log(data)
    return   <figure>
    <div className=" min-h-fit relative">
      <Swiper
        slidesPerView={1}
        navigation={{ 
          enabled: true,
        }}
      
        loop={true}
        pagination={{
          type: "custom",
          renderCustom: (swiper, current, total) => {
            let bullets = "";
            for (let i = 1; i <= total; i++) {
              if (i === current) {
                // Garis aktif
                bullets += `<span class="swiper-pagination-line-active inline-block mx-1 w-8 h-1 bg-white"></span>`;
              } else {
                // Garis tidak aktif
                bullets += `<span class="swiper-pagination-line inline-block mx-1 w-8 h-1 bg-white/80 "></span>`;
              }
            }
            return `<div class="custom-pagination flex justify-center mt-4">${bullets}</div>`;
          },
        }}
        autoplay={true}
        modules={[Navigation, Pagination,Autoplay]}
        className="  min-h-fit bg-red-200 rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background hover:[&_div]:text-slate-300 [&_div]:transition-ease-in-out   "
      >
        {isLoading&&<ImageSkeleton />}
        {data?.map((g:GallerySchema) => (
          <SwiperSlide key={g.id}>
            <Image 
              className="object-fill"
              src={imageUrl +g.url }
              alt={'gallery'+g.id}
              width={500}
              height={500}
              loading='lazy'
            />
          </SwiperSlide>
        ))}
         
       </Swiper>
    </div>
  </figure>
}