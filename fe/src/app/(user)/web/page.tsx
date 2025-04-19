"use client";
import { ContentDiffSplitted } from "@/components/common/ContentDiffSplitted";
import Announcement from "@/components/web/Announcement";
import MapSection from "@/components/web/MapSection";
import TourismInfo from "@/components/web/TourismInfo";
import TourismPackage from "@/components/web/TourismPackage"; 
export default function Home() {
  return (
    <section className="space-y-8 font-bold">
      <Announcement />
      <ContentDiffSplitted
        left={<MapSection />}
        right={
          <>
            <TourismInfo />
            <TourismPackage />
          </>
        }
      />
    </section>
  );
}
