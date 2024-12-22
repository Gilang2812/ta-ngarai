"use client";
import {
  FaCircleInfo,
  FaRegClock,
  FaSquarePlus,
  FaUserGroup,
} from "react-icons/fa6";
import Image from "next/image";
import { ImagePlaceHoldeSkeleton } from "@/components/loading/ImagePlaceHolderSkeleton";
 
import { imageNotFound, imageUrl } from "@/lib/baseUrl";
import Link from "next/link";
 
import { PackageGallery, useFetchPackages } from "@/features/web/package/useFetchPackage";
export const PackageList = () => {
  const { data, isLoading } = useFetchPackages<PackageGallery>({package:true,gallery: true });
 console.log(data);
  return (
    <div className="flex  flex-wrap ">
      {isLoading &&
        [...Array(2)].map((_, index) => (
          <ImagePlaceHoldeSkeleton key={index} />
        ))}
      {data?.map((item, index) => (
        <article
          key={index}
          className="flex flex-wrap md:flex-nowrap basis-full md:basis-1/2 p-8 grow shrink items-center gap-4"
          aria-labelledby="basic-package-title"
        >
          <figure className="w-44 basis-full grow md:grow-0 md:basis-[200px] min-w-[200px]  shrink rounded overflow-hidden aspect-[4/5]">
            <Image
              src={item.packageGalleries[0].url? imageUrl+'package/'+item.packageGalleries[0].url: imageNotFound
              }
              alt="P "
              width={500}
              height={500}
              loading="lazy"
              className="aspect-auto object-cover w-full left-0 h-full "
            />
          </figure>

          <div className="space-y-4">
            <h2
              id="basic-package-title"
              className="text-xl text-wrap font-bold"
            >
              {item?.name}
            </h2>

            <p className="bg-[#198754] px-2 rounded p-1 text-sm text-white w-fit">
              {item?.type?.type_name}
            </p>

            <p className="flex items-center gap-1">
              <FaRegClock />
              {item?.packageDays?.length}D <FaUserGroup /> Min.
              {item?.min_capacity} People
            </p>

            <section className="leading-relaxed">
              <p className="capitalize">Start from</p>
              <p className="text-orange-400">Rp {item.price.toLocaleString()}</p>

              <div className="flex items-center gap-2">
                <Link
                  href={"/web/package/" + item?.id}
                  className="btn-primary text-nowrap  capitalize bg-white border rounded  "
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
