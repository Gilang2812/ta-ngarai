"use client";

import { DetailHomestayInfo } from "./DetailHomestayInfo";
import { useGetHomestay } from "@/features/dashboard/homestay/useGetHomestay";
import { RawSkeleton } from "../loading/RawSkeleton";
import { DetailHomestayHeader } from "./DetailHomestayHeader";
import dynamic from "next/dynamic"; 
 
const GalleryHomestay = dynamic (
  () => import("./GalleryHomestay"),
  { ssr: false }
);


export const DetailHomestaySection = ({ id }: { id: string }) => {
  const { data } = useGetHomestay(id);
 
  return (
    <>
      <section className="col-span-7 ">
        <div className="bg-white rounded-xl p-5 space-y-4">
          <DetailHomestayHeader id={id} />
          <section className="px-2">
            {data ? <DetailHomestayInfo data={data} /> : <RawSkeleton />}
          </section>

          <section className="space-y-4">
            <h4>Description</h4>
            {data ? <p>{data.description}</p> : <RawSkeleton />}
          </section>

          <section className="space-y-4">
            <h4>Facility</h4>
            <ul className="list-disc px-4" role="list">
              {data?.details?.map((h,index) => (
                 <li key={index}>{h.facility.name}</li>
              ))} 
            </ul>
          </section>
        </div>
      </section>
      <section className="col-span-5 space-y-6">
        <div className="bg-white rounded-xl p-5">
          <h4>Google Maps</h4>
        </div>
        <div className="bg-white rounded-xl p-5">
          <h4>Our Gallery</h4>
          <GalleryHomestay data= {data?.galleries} />
        </div>
      </section>
    </>
  );
};
