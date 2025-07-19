import { EditHomestaySection } from "@/components/homestay/edit/EditHomestaySection";

const  EditHomestay =async ({params}:{params:Promise<{id:string}>}) => {
  const id = (await params).id
  return (
    <main className="p-4">
        <EditHomestaySection id={id} />
    </main>
  );
};

export default  EditHomestay;
