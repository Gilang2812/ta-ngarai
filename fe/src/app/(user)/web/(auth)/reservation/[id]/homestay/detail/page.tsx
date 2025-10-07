import DetailHomestayReservation from "@/components/homestay/DetailHomestayReservation";
import { DynamicPageProps } from "@/types/props/DynamicPageProps";

export default async function Page({ params }: DynamicPageProps) {
  const { id } = await params;
  return <DetailHomestayReservation id={id} />;
}
