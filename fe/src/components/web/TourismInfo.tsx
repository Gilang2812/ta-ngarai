"use client";

import { TourismGalleries } from "@/components/web/TourismGalleries";
import { TourismData } from "@/components/web/TourismData"; 

export default function TourismInfo() {
  return (
    <div className=" bg-white  rounded-lg">
      <header className="py-5 text-lg text-center">
        <h1>Nagari Koto Gadang</h1>
      </header>
      <section className="overflow-x-hidden p-5 max-h-[550px]">
        <TourismGalleries />
        <TourismData />
      </section>
    </div>
  );
}
