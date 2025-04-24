import { PackageSection } from "@/components/web/explore/PackageSection";
import { ContentDiffSplitted } from "@/components/common/ContentDiffSplitted"; 
import MapSection from "@/components/web/MapSection";
export default function WithOurPackage() {
  return (
    <main className="font-bold space-y-8">
      <ContentDiffSplitted
        left={<MapSection />}
        right={<PackageSection title="explore village with our package" />}
      />
    </main>
  );
}
