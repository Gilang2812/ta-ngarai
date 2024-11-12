import { ImageSkeleton } from "@/components/loading/ImageSkeleton";
import { imageUrl } from "@/lib/baseUrl";
import { GalleryPackageSchema } from "@/type/schema/gallerySchema"
import Image from "next/image"

type GalleryProps = {
  gallery: GalleryPackageSchema[]|undefined;
  isLoading:boolean
}
export const Gallery = ({gallery,isLoading}:GalleryProps)=>{
  console.log(gallery)
    return     <section className="p-5 space-y-12 bg-white rounded-xl">
    <header className="text-lg">
      <h3 className="font-semibold">Our Gallery</h3>
    </header>
    <div className="grid items-start grid-cols-4 gap-6">
      {isLoading&& [...Array(4)].map((_,index)=>( <ImageSkeleton key={index}/> ))}
      {gallery?.map((g,index)=>( <Image
      key={index}
        src={`${imageUrl}/package/${g?.url}`}
        width={500}
        height={500}
        alt="Gallery image"
        className="rounded"
      />))}
     
    </div>
  </section>
}