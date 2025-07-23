import HomestayReservationPage from "@/components/homestay/HomestayReservationPage";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <HomestayReservationPage id={id} />;
};

export default page;
