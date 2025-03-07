import { Form, useFormikContext } from "formik";
import React, { FC,  useState } from "react";
import { FormStep } from "./FormStep";
import { SecondStep } from "./SecondStep";
import { cornerError } from "@/utils/AlertUtils";
import { FormSchema } from "@/app/(user)/web/reservation/custombooking/[id]/page";
import { useFetchUnitHomestayReservation } from "@/features/reservation/useFetchUnitHomestayReservation";
import { useDebounce } from "@/features/common/useDebounce";

type Props = {
  currentStep: number;
  steps: number[];
  nextStep: () => void;
  prevStep: () => void;
};
export const ReservationForms: FC<Props> = ({
  currentStep,
  nextStep,
  prevStep,
  steps,
}) => {
  const [total, setTotal] = useState<number | null>(null);
  const { values, setFieldValue } = useFormikContext<FormSchema>();
  const [reqValid, setReqValid] = useState({
    guide: false,
    agree: false,
    total: 0,
    date: "",
  });

  const isValid =
    reqValid.guide &&
    reqValid.agree &&
    Number(reqValid.total) > 0 &&
    reqValid.date;

  const minReservation = new Date(new Date().setDate(new Date().getDate() + 3))
    .toISOString()
    .split("T")[0];

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReqValid((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleTotalPeopleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value: number = parseInt(e.currentTarget.value) || 0;
    const packageOrder =
      value % values.min_capacity === 0
        ? value / values.min_capacity
        : value / values.min_capacity < 1
        ? 1
        : Math.floor(value / values.min_capacity) + 0.5;
    const totalPrice: number = values.price * packageOrder;
    setReqValid((prev) => ({
      ...prev,
      total: value,
    }));
    setFieldValue("package_order", packageOrder);
    setFieldValue("total_people_homestay", value);
    setFieldValue("total_package", totalPrice);
    setTotal(totalPrice);
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const checkOut = new Date(value).setDate(
      new Date(value).getDate() + values.day - 1
    );
    const checkOutDate = new Date(checkOut).toISOString().split("T")[0];

    setFieldValue("check_in", e.currentTarget.value);

    console.log(value < minReservation);
    if (value < minReservation) {
      cornerError(`cannot  use date less than ${minReservation}`);
      setFieldValue("check_in", minReservation);
    } else {
      setFieldValue("check_out", checkOutDate);
      setFieldValue("check_out_time", "12.00");
      setReqValid((prev) => ({
        ...prev,
        date: value,
      }));
    }
  };

  const checkInDate = useDebounce(reqValid.date, 300);
  const { data: unitHomestay } = useFetchUnitHomestayReservation(checkInDate);
  if (reqValid.total && reqValid.date) {
    console.log(unitHomestay);
  }

  return (
    <Form>
      <FormStep
        steps={steps}
        currentStep={currentStep}
        prevStep={prevStep}
        nextStep={nextStep}
        handleCheck={handleCheck}
        handleDateInput={handleDateInput}
        handleTotalPeopleInput={handleTotalPeopleInput}
        isValid={isValid}
        minReservation={minReservation}
        total={total}
        //#region
      />
      <SecondStep
        currentStep={currentStep}
        nextStep={nextStep}
        prevStep={prevStep} 
        unitHomestayReservation={unitHomestay}
      />
    </Form>
  );
};
