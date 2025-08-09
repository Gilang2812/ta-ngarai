import DetailReservationReview from "@/components/detailReservation/DetailReservationReview";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const ReservationReview = async ({ params }: Props) => {
  const { id } = await params;
  return <DetailReservationReview id={id} />;
};

export default ReservationReview;
