import DetailHomestayReservation from "@/components/homestay/DetailHomestayReservation";
import { DynamicPageProps } from "@/type/props/DynamicPageProps";

export default async function Page({ params }: DynamicPageProps) {
  const { id } =await params;
  return <DetailHomestayReservation id={id} />;
}; 
