import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { PackageList } from "@/components/web/package/PackageList";

export default function Package() {
  return (
    <SingleContentWrapper className="p-8 h-fit">
      <PackageList />
    </SingleContentWrapper>
  );
}
