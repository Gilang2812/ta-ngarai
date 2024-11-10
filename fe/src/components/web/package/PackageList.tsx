'use client'
import {
  FaCircleInfo,
  FaRegClock,
  FaSquarePlus,
  FaUserGroup,
} from "react-icons/fa6";
import Image from "next/image";  
import { ImagePlaceHoldeSkeleton } from "@/components/loading/ImagePlaceHolderSkeleton"; 
import { useFetchGalleries } from "@/features/web/useFetchGalleries";  
import { imageNotFound, imageUrl } from "@/lib/baseUrl";
import { useFetchDetailPackage } from "@/features/web/explore/useFetchDetailPackage";
import { DetailPackage } from "@/type/schema/detailPackage";
import Link from "next/link";
export const PackageList = () => {
  const {data:packages} = useFetchDetailPackage()

 
  const {data, isLoading}  = useFetchGalleries('package',0) 
  const uniquePackage =  [...new Map(packages?.map((item:DetailPackage) => [item.package_id, item])).values()]
  console.log(uniquePackage)
  return (
    <div className="grid  grid-cols-2 gap-8"> 
      {isLoading&&[...Array(2)].map((_, index) => (<ImagePlaceHoldeSkeleton key={index}/>))}
      {uniquePackage?.map((item:DetailPackage,index:number) => (
        <article key={index}
        className="grid grid-cols-2 items-center gap-4"
        aria-labelledby="basic-package-title"
      >
        <figure className="w-44 basis-[200px] shrink rounded overflow-hidden aspect-[4/5]">
          <Image
            src= {data?.filter(img=>img.package_id===item.package_id)?.[0]?.url?imageUrl+'package/'+data?.filter(img=>img.package_id===item.package_id)?.[0]?.url:imageNotFound}
            alt="P " 
            width={300}
            height={300}
            className="aspect-auto object-cover left-0 h-full "
          />
        </figure>
       
        <div className="space-y-4">
          <h2 id="basic-package-title" className="text-xl text-wrap font-bold">
            {item.packageDay?.package?.name}
            
          </h2>

          <p className="bg-[#198754] px-2 rounded p-1 text-sm text-white w-fit">
           {item.packageDay?.package?.PackageType.type_name}     </p>

          <p className="flex items-center gap-1">
            <FaRegClock />{item.packageDay?.status}D  <FaUserGroup /> Min. {item.packageDay.package?.min_capacity} People
          </p>

          <section className="leading-relaxed">
            <p className="capitalize">Start from</p>
            <p className="text-orange-400">Rp 2.975.000</p>

            {/* Tombol aksi untuk paket */}
            <div className="flex items-center gap-2">
              <Link
                href={"/web/package/"+item.package_id}
                className="btn-primary  capitalize bg-white border rounded  "
                title="more info"
                aria-label="More info about Basic Package"
              >
                <FaCircleInfo /> More Info
              </Link>
              <a
                href="#"
                className="btn-primary capitalize bg-white border rounded "
                aria-label="Extend Basic Package"
              >
                <FaSquarePlus /> Extend
              </a>
            </div>
          </section>
        </div>
      </article>
      ))}
    
    </div>
    
  );
};
