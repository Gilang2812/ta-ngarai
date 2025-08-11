"use client";
import { useFetchGalleries } from "@/features/web/useFetchGalleries";
import { GallerySchema } from "@/type/schema/GallerySchema";
import { ImageSkeleton } from "@/components/loading/ImageSkeleton"; 
import ImgCraft from "../common/ImgCraft";

export const Gallery = () => {
  const { data, isLoading } = useFetchGalleries<GallerySchema>("tourism");

  const RenderImage = () => {
    return (
      <div className=" grid grid-cols-4 gap-4 ">
        {isLoading &&
          [...Array(4)].map((_, index) => <ImageSkeleton key={index} />)}
        {data?.map((g: GallerySchema) => (
          <ImgCraft
            key={g.id}
            src={g.url}
            alt={`Village gallery  image ${g.id} `}
            width={100}
            height={100}
            className="rounded w-full"
          />
        ))}
      </div>
    );
  };
  return (
    <article className="  relative space-y-4">
      <h2 className="font-semibold max-w-max text-primary">Gallery</h2>
      <RenderImage />
    </article>
  );
};
