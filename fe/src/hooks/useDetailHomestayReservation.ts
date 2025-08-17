import { useGetHomestayReservation } from "@/features/reservation/useGetHomestayReservation";
import { ReservationDetails } from "@/type/schema/ReservationSchema";
import {
  getReservationStatus,
  getReservationStatusClass,
  ReservationStatus,
} from "@/utils/common/getReservationStatus";
import dayjs from "dayjs";
import useInvoice from "./useInvoice";
import usePackagePayment from "./usePackagePayment";

const useDetailHomestayReservation = (id: string) => {
  const {
    data,
    isLoading,
    refetch: refetchData,
  } = useGetHomestayReservation(id);

  const { detail, ...reservation } = data || {};

  const status = getReservationStatus(
    reservation as ReservationDetails
  ).replaceAll("-", " ");

  const statusClassname = getReservationStatusClass(
    status.replaceAll(" ", "-") as ReservationStatus
  );

  const { handlePayment, isPending, item_details } = usePackagePayment({
    data,
    refetchReservation: refetchData,
    status: status.replaceAll(" ", "-") as ReservationStatus,
  });

  const { isFetching, refetch } = useInvoice(id);
  const homestayInfo: {
    label: string;
    values: string | number | JSX.Element;
  }[] = data
    ? [
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
    handlePayment,
    isLoading,
    geom,
    homestayInfo,
    detail: detail?.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
    status,
    item_details,
    statusClassname,
    isFetching,
    refetch,
    refetchData,
    isPending,
  };
};

export default useDetailHomestayReservation;
