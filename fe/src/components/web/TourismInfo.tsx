"use client";

import { TourismGalleries } from "@/components/web/TourismGalleries";
import { TourismData } from "@/components/web/TourismData";
import { ContentHeader } from "../global/ContentHeader";

export default function TourismInfo() {
  return (
    <div className=" bg-white overflow-clip  rounded-xl">
      <ContentHeader text="nagari koto gadang" />
      <section className="overflow-x-hidden p-5 max-h-[550px]">
        <TourismGalleries />
        <TourismData />
      </section>
    </div>
  );
}
