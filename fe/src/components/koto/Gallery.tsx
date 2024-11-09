"use client";
import { useFetchGalleries } from "@/features/web/useFetchGalleries";
import { imageUrl } from "@/lib/baseUrl";
import { GallerySchema } from "@/type/schema/gallerySchema";
import Image from "next/image";
import { ImageSkeleton } from "@/components/loading/ImageSkeleton";

export const Gallery = () => {
  const { data, isLoading } = useFetchGalleries("tourism");

  return (
    <article className="col-span-1 space-y-4">
      <h2 className="font-semibold max-w-max text-primary">Gallery</h2>
      <div className=" grid grid-cols-4 gap-4 ">
        {isLoading &&
          [...Array(4)].map((_, index) => <ImageSkeleton key={index} />)}
        {data?.map((g: GallerySchema) => (
          <Image
            key={g.id}
            src={imageUrl + g.url}
            alt={`Village gallery image  `}
            width={500}
            height={500}
            className="rounded "
          />
        ))}
      </div>
    </article>
  );
};
