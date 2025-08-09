import { PackageSection } from "@/components/web/myPackage/PackageSection";
import { ContentDiffSplitted } from "@/components/common/ContentDiffSplitted";
import MapWeb from "@/components/web/MapWeb";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";

export default function MyPackage() {
  return (
    <main className="space-y-8 font-bold">
      <ContentDiffSplitted
        left={
          <SingleContentWrapper>
            <MapWeb withPackage={false} />
          </SingleContentWrapper>
        }
        right={<PackageSection />}
      />
    </main>
  );
}
