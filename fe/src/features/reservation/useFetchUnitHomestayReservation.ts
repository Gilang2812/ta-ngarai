import { DetailReservationSchema } from "./../../type/schema/ReservationSchema";
import { useAxiosAuth } from "@/lib/axios";
import { UnitGallerySchema } from "@/type/schema/GalleryHomestaySchema";
import { HomestayDetails } from "@/type/schema/HomestaySchema";
import { useQuery } from "@tanstack/react-query";

export type UnitHomestayReservation = HomestayDetails & {
  detailReservation: DetailReservationSchema[];
  unitGalleries: UnitGallerySchema[];
};
export const useFetchUnitHomestayReservation = (checkIn: string) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<UnitHomestayReservation[]>({
    queryKey: ["unit_homestay_reservation", checkIn],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/homestays/units", {
        params: { checkIn },
      });
      return data;
    },
    enabled: !!checkIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });
};
