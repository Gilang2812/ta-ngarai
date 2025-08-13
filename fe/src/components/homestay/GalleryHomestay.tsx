import { imageUrl } from "@/lib/baseUrl";
import { GalleryHomestaySchema } from "@/type/schema/GalleryHomestaySchema";
import Image from "next/image";

export default function GalleryHomestay({
  data,
}: {
  data: GalleryHomestaySchema[] | undefined;
}) {
  return (
    <section className="grid grid-cols-4 gap-4">
      {data?.map((g, index) => (
        <Image
          className="bg-slate-200"
          key={index}
          src={imageUrl + g.url}
          alt="image"
          width={500}
          height={500}
        />
      ))}
    </section>
  );
}
