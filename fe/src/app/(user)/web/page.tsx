"use client";
 
import { ContentDiffSplitted } from "@/components/common/ContentDiffSplitted";
import Announcement from "@/components/web/Announcement";
import { Around } from "@/components/web/explore/Around";
import MapSection from "@/components/web/MapSection";
import TourismInfo from "@/components/web/TourismInfo";
import TourismPackage from "@/components/web/TourismPackage";
import { useWebRightSection } from "@/hooks/useWebRightSection";
export default function Home() {
  const { packageOpen, aroundOpen, toggleAround } = useWebRightSection();

  return (
    <section className="space-y-8 font-bold">
      <Announcement />
      <ContentDiffSplitted
        left={<MapSection />}
        right={
          <div className="bg-white overflow-hidden p-5 rounded-xl">
            {packageOpen ? (
              <TourismPackage />
            ) : aroundOpen ? (
              <Around handleCloseAround={toggleAround} isAroundOpen={aroundOpen} />
            ) : (
              <TourismInfo />
            )}
          </div>
        }
      />
    </section>
  );
}
