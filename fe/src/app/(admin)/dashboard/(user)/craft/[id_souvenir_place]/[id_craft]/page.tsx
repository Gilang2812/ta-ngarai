import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { EditCraftForm } from "@/components/craft/EditCraftForm";

export default async function EditVariantPage({
  params,
}: {
  params: Promise<{ id_souvenir_place: string; id_craft: string }>;
}) {
  const { id_souvenir_place, id_craft } = await params;
  if (!id_souvenir_place || !id_craft) {
    // Not found page
    return (
      <SingleContentWrapper>
        <header className="py-2 text-2xl text-primary">
          <h1>Not Found</h1>
        </header>
        <p>The requested craft could not be found.</p>
      </SingleContentWrapper>
    );
  }
  return (
    <SingleContentWrapper>
      <header className="py-2 text-2xl text-primary  ">
        <h1>Edit Craft</h1>
      </header>
      <EditCraftForm
        id_souvenir_place={id_souvenir_place}
        id_craft={id_craft}
      />
    </SingleContentWrapper>
  );
}
