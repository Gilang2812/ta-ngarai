import { Form, useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FormStep } from "./FormStep";
import { SecondStep } from "./SecondStep";
import { cornerError } from "@/utils/AlertUtils";
import { FormReservationSchema } from "@/app/(user)/web/(auth)/reservation/custombooking/[id]/page";
import { useFetchUnitHomestayReservation } from "@/features/reservation/useFetchUnitHomestayReservation";
import Loading from "@/app/loading";
import { PackageServiceGallery } from "@/type/schema/PackageSchema";
import dayjs from "dayjs";

type Props = {
  currentStep: number;
  steps: number[];
  nextStep: () => void;
  prevStep: () => void;
  packageItem: PackageServiceGallery;
  isPending:boolean;
  isWithHomestay?: boolean;
};
export const ReservationForms: FC<Props> = ({
  currentStep,
  nextStep,
  prevStep,
  steps,
  packageItem,
  isWithHomestay,
  isPending
}) => {
  const [total, setTotal] = useState<number | null>(null);
  const { values, setFieldValue } = useFormikContext<FormReservationSchema>();
  const [reqValid, setReqValid] = useState({
    guide: false,
    total: values.total_people,
    date: "",
  });

  const isValid = reqValid.guide && Number(reqValid.total) > 0 && reqValid.date;

  const minReservation = dayjs().add(3, "day").toISOString().split("T")[0];

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReqValid((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  useEffect(() => {
    if (values.total_people) {
      const value: number = values.total_people || 0;
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
    }
  }, [values.total_people, setFieldValue, values.min_capacity, values.price]);

  useEffect(() => {
    if (values.check_in) {
      if (dayjs(values.check_in).isBefore(minReservation)) {
        cornerError(`cannot  use date less than ${minReservation}`);
        setFieldValue("check_in", minReservation);
      } else {
        setFieldValue("check_out", dayjs(values.check_in).format("YYYY-MM-DD"));
        setFieldValue("check_out_time", "12.00");
        setReqValid((prev) => ({
          ...prev,
          date: values.check_in,
        }));
      }
    }
  }, [values.check_in, setFieldValue, minReservation]);

  const checkInDate = reqValid.date;
  const { data: unitHomestay, isLoading } =
    useFetchUnitHomestayReservation(checkInDate);

  return (
    <Form>
      <FormStep
        steps={steps}
        currentStep={currentStep}
        prevStep={prevStep}
        nextStep={nextStep}
        handleCheck={handleCheck}
        isValid={isValid}
        minReservation={minReservation}
        total={total}
        packageItem={packageItem}
        isWithHomestay={isWithHomestay}
        isPending={isPending}
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
