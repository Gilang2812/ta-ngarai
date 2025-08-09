import EditVillageForm from "@/components/dashboard/village/EditVillageForm";

const EditDataVillage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <main className="p-5 bg-white rounded-xl">
      <header className="mb-4 text-lg">
        <h1>Edit Village Information</h1>
      </header>
      <EditVillageForm id={id} />
    </main>
  );
};

export default EditDataVillage;
