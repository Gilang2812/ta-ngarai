import { useFetchAllUnitHomestay } from "@/features/reservation/useFetchAllUnitHomestay";
import useFetchWeatherPrediction from "@/features/weater/useFetchWeatherPrediction";
import {
  HomestayReservationFormSchemaType,
  ReservationDetails,
} from "@/type/schema/ReservationSchema";
import {
  confirmAlert,
  cornerError,
  hideLoadingAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useEffect, useState } from "react";
import useFormStep from "./useFormStep";
import dayjs from "dayjs";
import { AllUnitHomestayResponseSchema } from "@/type/schema/HomestaySchema";
import { useCreateReservation } from "@/features/reservation/useCreateReservation";

export type SelectedUnit = {
  homestay_id: string;
  unit_type: string;
  unit_number: string;
  capacity: number;
};
const useHomestayReservation = (homestay_id: string) => {
  // Stepper logic
  const { currentStep, steps, nextStep } = useFormStep(3);

  // Data fetching
  const { data: weathers, isLoading } = useFetchWeatherPrediction();
  const { data: unitHomestay, isLoading: isLoadingUnitHomestay } =
    useFetchAllUnitHomestay(homestay_id);
  const { mutate: createReservation, isPending } = useCreateReservation({
    onSuccess: (response) => {
      const data = response as ReservationDetails;
      setReservationId(data.id);
      nextStep();
    },
  });

  const [selectedUnit, setSelectedUnit] = useState<
    AllUnitHomestayResponseSchema[]
  >([]);

  const [reservationId, setReservationId] = useState<string | null>(null);

  const uniqueUnitType = unitHomestay?.reduce((acc, unit) => {
    if (!acc.includes(unit.unitType.name_type)) {
      acc.push(unit.unitType.name_type);
    }
    return acc;
  }, [] as string[]);

  const initialValues: HomestayReservationFormSchemaType = {
    check_in: dayjs().add(3, "day").format("YYYY-MM-DD"),
    check_in_time: "14:00",
    check_out: "",
    days_of_stay: "" as unknown as number,
    total_people: "" as unknown as number,
    unit_type: "",
    whatsapp_number: "",
    agreed_to_terms: false,
    selected_capacity: 0,
    payment: "",
    total_deposit: "",
    total_price_reservation: "",
  };

  useEffect(() => {
    if (isLoading || isPending) {
      showLoadingAlert();
    }
    return () => {
      setTimeout(() => {
        hideLoadingAlert();
      }, 1000);
    };
  }, [isLoading, isPending]);

  const handleSelectedUnit = (unit: AllUnitHomestayResponseSchema) => {
    setSelectedUnit((prev) => {
      const existingIndex = prev.findIndex(
        (u) =>
          u.homestay_id === unit.homestay_id &&
          u.unit_type === unit.unit_type &&
          u.unit_number === unit.unit_number
      );
      if (existingIndex > -1) {
        return prev.filter((_, index) => index !== existingIndex);
      }
      return [...prev, unit];
    });
  };

  const isSelected = (unit: SelectedUnit) => {
    return selectedUnit.some(
      (u) =>
        u.homestay_id === unit.homestay_id &&
        u.unit_type === unit.unit_type &&
        u.unit_number === unit.unit_number
    );
  };

  const handleNextStep = () => {
    confirmAlert(
      "Confirm Reservation",
      "Are you sure you want to proceed with the reservation?",
      () => {
        nextStep();
      }
    );
  };

  const handleSubmit = (values: HomestayReservationFormSchemaType) => {
    if (!values.payment) {
      return cornerError("Please select a payment method");
    }

    if (selectedUnit.length === 0) {
      return cornerError("Please select at least one unit");
    }

    createReservation({ ...values, selectedUnits:selectedUnit });

    // Handle form submission logic here
    console.log("Form submitted with values:", values);
    // You can also validate the form using homestayReservationFormSchema
  };

  // Return values
  return {
    weathers,
    isLoading,
    unitHomestay,
    isLoadingUnitHomestay,
    selectedUnit,
    handleSelectedUnit,
    isSelected,
    handleSubmit,
    uniqueUnitType,
    initialValues,
    currentStep,
    steps,
    nextStep,
    reservationId,
    handleNextStep,
  };
};

export default useHomestayReservation;
