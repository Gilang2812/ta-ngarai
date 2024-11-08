import Announcement from "@/components/web/Announcement";
import MapSection from "@/components/web/MapSection";
import TourismInfo from "@/components/web/TourismInfo";

export default function Home() {
  return (
    <section className="space-y-8 font-bold">
      <Announcement />
      <section className="grid grid-cols-12 gap-6">
        <article className="h-full col-span-8 p-5 pt-8 bg-white rounded-lg">
          <MapSection />
        </article>
        <article className="h-full col-span-4 space-y-4 rounded-lg">
          <TourismInfo />
        </article>
      </section>
    </section>
  );
}
