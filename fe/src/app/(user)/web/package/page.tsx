import { ContentHeader } from "@/components/common/ContentHeader";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { PackageList } from "@/components/web/package/PackageList";
import { FaPlus } from "react-icons/fa6";

export default function Package() {
  return (
    <SingleContentWrapper>
      <ContentHeader text="available packages" />

      <section className="min-w-fit space-y-6">
        <button
          type="button"
          aria-label="Create custom new package"
          className="btn-fill-primary"
        >
          <FaPlus />
          Create New Custom Package
        </button>
        <PackageList />
      </section>
    </SingleContentWrapper>
  );
}
