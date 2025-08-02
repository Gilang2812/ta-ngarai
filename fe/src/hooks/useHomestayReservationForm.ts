import { useFormikContext } from "formik";
import { HomestayReservationFormSchemaType } from "@/type/schema/ReservationSchema";
import { useEffect } from "react";
import dayjs from "dayjs";
import { AllUnitHomestayResponseSchema } from "@/type/schema/HomestaySchema";
import { cornerError } from "@/utils/AlertUtils";

type Props = {
  unitHomestay: AllUnitHomestayResponseSchema[];
  selectedUnit: AllUnitHomestayResponseSchema[];
  uniqueUnitType?: string[];
};

const useHomestayReservationForm = ({
  unitHomestay,
  selectedUnit = [],
  uniqueUnitType,
}: Props) => {
  const { values, setFieldValue, handleChange } =
    useFormikContext<HomestayReservationFormSchemaType>();

  const grandTotal = selectedUnit.reduce(
    (acc, unit) => acc + unit.price * values.days_of_stay,
    0
  );

  const isCompleted = [
    values.check_in,
    values.check_in_time,
    values.check_out,
    values.days_of_stay,
    values.total_people,
    values.unit_type,
    values.whatsapp_number,
    values.agreed_to_terms,
    selectedUnit.length > 0,
  ].every(Boolean);

  const filteredUnitHomestay = unitHomestay.filter(
    (unit) => unit.unitType.name_type === values.unit_type
  );

  const toLocalDateTimeInput = (d: Date) => dayjs(d).format("YYYY-MM-DDTHH:mm");

  useEffect(() => {
    if (uniqueUnitType && !values.unit_type) {
      setFieldValue("unit_type", uniqueUnitType[0], false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueUnitType, values]);

  useEffect(() => {
    const totalCapacity = selectedUnit.reduce(
      (acc, unit) => acc + unit.capacity,
      0
    );
    setFieldValue("selected_capacity", totalCapacity, false);
  }, [selectedUnit, setFieldValue]);

  useEffect(() => {
    const minCheckIn = dayjs().add(3, "day").format("YYYY-MM-DD");
    if (values.check_in < minCheckIn) {
      setFieldValue("check_in", minCheckIn, false);
    }
  }, [values.check_in, setFieldValue, values]);

  useEffect(() => {
    const { check_in, check_in_time, days_of_stay } = values;
    if (!check_in || !days_of_stay) return;

    const nights = Number(days_of_stay);
    if (Number.isNaN(nights) || nights <= 0) return;

    const checkInDate = new Date(
      `${check_in}${check_in_time ? `T${check_in_time}` : "T14:00"}`
    );
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + nights);
    checkOutDate.setHours(12, 0, 0, 0);

    setFieldValue("check_out", toLocalDateTimeInput(checkOutDate), false);
  }, [values, isCompleted, setFieldValue]);

  const reservedDate = selectedUnit.flatMap((unit) =>
    unit.detailReservations.flatMap((detail) =>
      detail.reservation.package.packageDays.map((_, idx) =>
        dayjs(detail.date).add(idx, "day").format("YYYY-MM-DD")
      )
    )
  );

  const reservedInComingDate = reservedDate.filter((date) =>
    dayjs(date).isAfter(dayjs().add(3, "day"))
  );

  useEffect(() => {
    if (reservedInComingDate.includes(values.check_in)) {
      setFieldValue("check_in", "", false);
      cornerError(
        '"Check-in date is already reserved, please choose another date."'
      );
    }
  }, [reservedInComingDate, values, setFieldValue]);

  const total_price_reservation = selectedUnit.reduce(
    (acc, unit) => acc + unit.price * values.days_of_stay,
    0
  );

  useEffect(() => {
    if (selectedUnit.length === 0 || !values.days_of_stay) return;
    setFieldValue("total_price_reservation", total_price_reservation, false);
  }, [total_price_reservation, setFieldValue, values, selectedUnit]);

  const bookingInfoData = [
    { label: "Homestay Name", value: selectedUnit[0]?.homestay.name || "" },
    { label: "Address", value: selectedUnit[0]?.homestay.address || "" },
    { label: "Check In", value: values.check_in },
    { label: "Total People", value: values.total_people },
    { label: "Contact Person", value: values.whatsapp_number },
    { label: "Day of stay", value: values.days_of_stay },
  ];

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const { value } = e.target;
    if (value === "full") {
      setFieldValue("total_deposit", grandTotal.toString(), false);
    } else if (value === "partial") {
      setFieldValue("total_deposit", (grandTotal / 2).toString(), false);
    }
  };

  return {
    filteredUnitHomestay,
    isCompleted,
    setFieldValue,
    reservedInComingDate,
    bookingInfoData,
    values,
    grandTotal,
    handleRadioChange,
  };
};

export default useHomestayReservationForm;
