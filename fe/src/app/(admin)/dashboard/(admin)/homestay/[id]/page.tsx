import { DetailHomestaySection } from "@/components/homestay/DetailHomestaySection"; 

export default async function DetailHomestay({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;


  return (
    <main className="grid   grid-cols-12 gap-6 text-base">
     <DetailHomestaySection id={id}/>
    </main>
  );
}
