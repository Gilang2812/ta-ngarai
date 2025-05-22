import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { EditCraftForm } from "@/components/craft/EditCraftForm";

export default async function EditVariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <SingleContentWrapper>
      <header className="py-2 text-2xl text-primary ">
        <h1>Edit Craft</h1>
      </header>
      <EditCraftForm id={id} />
      
    </SingleContentWrapper>
  );
}
