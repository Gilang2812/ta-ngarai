"use client";

import { TourismGalleries } from "@/components/web/TourismGalleries";
import { TourismData } from "@/components/web/TourismData";
import { ContentHeader } from "../common/ContentHeader";
import { useTools } from "@/hooks/useTools";

export default function TourismInfo() {
  const { open } = useTools();
  return (
    <div className={` bg-white ${open && "hidden"} overflow-clip  rounded-xl`}>
      <ContentHeader text="nagari koto gadang" />
      <section className="overflow-x-hidden p-5 max-h-[550px]">
        <TourismGalleries />
        <TourismData />
      </section>
    </div>
  );
}
