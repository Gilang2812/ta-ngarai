import { Form, useFormikContext } from "formik";
import React, { FC, useState } from "react";
import { FormStep } from "./FormStep";
import { SecondStep } from "./SecondStep";
import { cornerError } from "@/utils/AlertUtils";
import { FormReservationSchema } from "@/app/(user)/web/reservation/custombooking/[id]/page";
import { useFetchUnitHomestayReservation } from "@/features/reservation/useFetchUnitHomestayReservation";
import Loading from "@/app/loading";
import { PackageService } from "@/features/web/package/useFetchPackage";

type Props = {
  currentStep: number;
  steps: number[];
  nextStep: () => void;
  prevStep: () => void;
  packageItem: PackageService;
  isWithHomestay?: boolean;
};
export const ReservationForms: FC<Props> = ({
  currentStep,
  nextStep,
  prevStep,
  steps,
  packageItem,
  isWithHomestay,
}) => {
  const [total, setTotal] = useState<number | null>(null);
  const { values, setFieldValue } = useFormikContext<FormReservationSchema>();
  const [reqValid, setReqValid] = useState({
    guide: false,
    agree: !isWithHomestay,
    total: values.total_people,
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
    setFieldValue("total_price_reservation", totalPrice);
    setFieldValue("total_deposit", totalPrice / 5);
    setTotal(totalPrice);
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const checkOut = new Date(value).setDate(
      new Date(value).getDate() + values.day - 1
    );
    const checkOutDate = new Date(checkOut).toISOString().split("T")[0];

    setFieldValue("check_in", e.currentTarget.value);

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

  const checkInDate = reqValid.date;
  const { data: unitHomestay, isLoading } = useFetchUnitHomestayReservation(checkInDate);
 
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
        packageItem={packageItem}
        isWithHomestay={isWithHomestay}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <SecondStep
          isWithHomestay={isWithHomestay}
          currentStep={currentStep}
          nextStep={nextStep}
          prevStep={prevStep}
          packageTotal={total}
          unitHomestayReservation={unitHomestay}
        />
      )}
    </Form>
  );
};
