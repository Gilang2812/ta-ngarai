import { useGetHomestayReservation } from "@/features/reservation/useGetHomestayReservation";
import { ReservationDetails } from "@/type/schema/ReservationSchema";
import {
  getReservationStatus,
  getReservationStatusClass,
} from "@/utils/common/getReservationStatus";
import dayjs from "dayjs";

const useDetailHomestayReservation = (id: string) => {
  const { data, isLoading } = useGetHomestayReservation(id);
  const { detail, ...reservation } = data || {};
  const status = getReservationStatus(reservation as ReservationDetails).replaceAll("-", " ");
  const statusClassname = getReservationStatusClass(status);

  console.log("test");
  const homestayInfo: { label: string; values: string | number }[] = data
    ? [
        {
          label: "Status",
          values: "Awaiting Admin Verification",
        },
        {
          label: "ID",
          values: data.id,
        },
        {
          label: "Request Date",
          values: dayjs(data.request_date).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          label: "Check In",
          values: dayjs(data.check_in).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          label: "Check Out",
          values: dayjs(data.check_in)
            .add(data.days_of_stay, "day")
            .format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          label: "Payment Type",
          values: data.deposit < data.total_price ? "Partial" : "Full",
        },
        {
          label: "Total People",
          values: data.total_people,
        },
      ]
    : [];
  const geom = data?.detail?.[0]?.homestay?.homestay?.geom;
  return {
    data,
    isLoading,
    geom,
    homestayInfo, 
    detail,
    status,
    statusClassname,
  };
};

export default useDetailHomestayReservation;
