import ManageCraftPage from "@/components/dashboard/craft/ManageCraftPage";

export default async function Craft({
  params,
}: {
  params: Promise<{ id_souvenir_place: string }>;
}) {
  const { id_souvenir_place } = await params;
  return <ManageCraftPage id_souvenir_place={id_souvenir_place} />;
}
