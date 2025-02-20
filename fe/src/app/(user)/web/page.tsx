import { ContentDiffSplitted } from "@/components/global/ContentDiffSplitted";
import Announcement from "@/components/web/Announcement";
import MapSection from "@/components/web/MapSection";
import TourismInfo from "@/components/web/TourismInfo";

export default function Home() {
  return (
    <section className="space-y-8 font-bold">
      <Announcement />
      <ContentDiffSplitted left={<MapSection />} right={<TourismInfo />} />
    </section>
  );
}
