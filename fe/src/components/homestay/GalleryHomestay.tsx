import { GalleryHomestaySchema } from "@/type/schema/GalleryHomestaySchema";

import { ImgModal } from "../common/ImgModal";

export default function GalleryHomestay({
  data,
}: {
  data: GalleryHomestaySchema[] | undefined;
}) {
  return (
    <section className="grid grid-cols-4 min-h-fit gap-4">
      {data?.map((g, index) => (
        <ImgModal
          className="bg-slate-200"
          key={index}
          src={g.url}
          alt="image"
          width={500}
          height={500}
          id={g.id}
        />
      ))}
    </section>
  );
}
