import DetailHomestayReservation from "@/components/homestay/DetailHomestayReservation";

export const DetailHomestayReservationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <DetailHomestayReservation id={id} />;
};
export default DetailHomestayReservationPage;
