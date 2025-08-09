import { useGetHomestayReservation } from "@/features/reservation/useGetHomestayReservation";
import {
  ConfirmationFormSchema,
  ReservationDetails,
} from "@/type/schema/ReservationSchema";
import {
  getReservationStatus,
  getReservationStatusClass,
  ReservationStatus,
} from "@/utils/common/getReservationStatus";
import dayjs from "dayjs";
import useInvoice from "./useInvoice";
import useUserRole from "./useUserRole";
import useToggleOpen from "./useToggleOpen";
import { useUpdateTokenReservation } from "@/features/reservation/useUpdateTokenReservation";
import { cornerAlert } from "@/utils/AlertUtils";
import { useUpdateReservation } from "@/features/reservation/useUpdateReservation";

const useDetailHomestayReservation = (id: string) => {
  const {
    data,
    isLoading,
    refetch: refetchData,
  } = useGetHomestayReservation(id);
  const { isAdmin } = useUserRole();
  const { isOpen, toggle } = useToggleOpen();
  const { detail, ...reservation } = data || {};
  const initialValues: ConfirmationFormSchema = {
    id: id,
    status: "" as unknown as number,
    feedback: "",
  };
  const status = getReservationStatus(
    reservation as ReservationDetails
  ).replaceAll("-", " ");
  const statusClassname = getReservationStatusClass(
    status.replaceAll(" ", "-") as ReservationStatus
  );

  const { mutate: updateTokenReservation, isPending: isUpdatingToken } =
    useUpdateTokenReservation<
      ConfirmationFormSchema & {
        item_details?:
          | []
          | {
              id: string;
              name: string;
              price: number;
              quantity: number;
            }[];
        deposit: number;
        total_price: number;
        deposit_date?: string;
        payment_date?: string;
      }
    >({
      onSuccess: () => {
        toggle();
        refetchData();
      },
    });

  const { mutate: updateReservation, isPending: isUpdatingReservation } =
    useUpdateReservation<{
      id: string;
      payment_date?: string;
    }>({
      onSuccess: () => {
        refetchData();
      },
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

  const item_details =
    data?.detail?.map((item) => ({
      id: `${item.date}-${item?.reservation_id}-${item?.homestay_id}-${item?.unit_type}-${item?.unit_number}`,
      name: item.homestay?.unit_name,
      price: item.homestay?.price,
      quantity: 1,
    })) ?? [];

  const handleSubmit = (values: ConfirmationFormSchema) => {
    // Handle form submission logic here
    updateTokenReservation({
      ...values,
      item_details: [
        ...item_details,
        {
          id: "deposit_id",
          name: "Deposit",
          price: (data?.deposit ?? 0) - (data?.total_price ?? 0),
          quantity: 1,
        },
      ],
      deposit: data?.deposit ?? 0,
      total_price: data?.total_price ?? 0,
    });
  };

  const handlePayment = () => {
    const originalStatus = status.replaceAll(" ", "-") as ReservationStatus;
    if (data && (data?.token_of_deposit || data?.token_of_payment)) {
      const token =
        originalStatus === "Deposit-Required"
          ? data?.token_of_deposit
          : originalStatus === "Payment-Required"
          ? data?.token_of_payment
          : null;

      if (token) {
        window.snap.pay(token, {
          onSuccess: function (result) {
            if (originalStatus === "Payment-Required") {
              cornerAlert("Payment success: " + result.order_id);
              updateReservation({
                id: data.id,
                payment_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              });
            } else if (originalStatus === "Deposit-Required") {
              cornerAlert("Payment success: " + result.order_id);
              updateTokenReservation({
                id: data.id,
                status: data.status,
                feedback: data.feedback as string,
                item_details,
                deposit: data?.deposit ?? 0,
                total_price: (data?.total_price ?? 0) - (data?.deposit ?? 0),
                deposit_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              });
            }
          },
          onPending: function (result) {
            console.log("Payment Pending:", result);
          },
          onError: function (result) {
            console.error("Payment Error:", result);
          },
          onClose: function () {
            console.log("Payment Closed");
          },
        });
      }
    }
  };

  return {
    data,
    handlePayment,
    isLoading,
    geom,
    homestayInfo,
    detail,
    status,
    statusClassname,
    isFetching,
    refetch,
    isAdmin,
    isOpen,
    toggle,
    handleSubmit,
    initialValues,
    isPending: isUpdatingReservation || isUpdatingToken,
  };
};

export default useDetailHomestayReservation;
