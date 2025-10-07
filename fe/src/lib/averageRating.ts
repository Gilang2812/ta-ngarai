import { DetailReservationResponse } from "@/types/schema/ReservationSchema";

export const averageRating = (detailReservation: DetailReservationResponse[]) => {
  const rated = detailReservation.filter((reservation) => !!reservation.rating);

  const totalRating = rated.reduce((acc, reservation) => {
    if (!!reservation.rating) {
      return acc + reservation.rating;
    }
    return acc;
  }, 0);

  return totalRating / rated.length;
};
