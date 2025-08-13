import { DetailReservationSection } from "@/components/web/detailReservation/DetailReservationSection";
import { DynamicPageProps } from "@/type/props/DynamicPageProps";

const DetailReservation = async ({ params }: DynamicPageProps) => {
  const { id } = await params;
  return <DetailReservationSection id={id} />;
};

export default DetailReservation;
