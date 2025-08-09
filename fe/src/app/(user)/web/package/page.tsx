import Button from "@/components/common/Button";
import { ContentHeader } from "@/components/common/ContentHeader";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { PackageList } from "@/components/web/package/PackageList";
import { FaPlus } from "react-icons/fa6";

export default function Package() {
  return (
    <SingleContentWrapper className="p-8">
      <ContentHeader text="available packages" />

      <section className="min-w-fit space-y-6">
        <Button type="button" aria-label="Create custom new package">
          <FaPlus />
          Create New Custom Package
        </Button>
        <PackageList />
      </section>
    </SingleContentWrapper>
  );
}
