import { Form, useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FormStep } from "./FormStep";
import { SecondStep } from "./SecondStep";
import { cornerAlert, cornerError, showLoadingAlert } from "@/utils/AlertUtils";
import { FormReservationSchema } from "@/app/(user)/web/(auth)/reservation/custombooking/[id]/page";
import { useFetchUnitHomestayReservation } from "@/features/reservation/useFetchUnitHomestayReservation";
import Loading from "@/app/loading";
import { PackageServiceGallery } from "@/types/schema/PackageSchema";
import dayjs from "dayjs";
import ReservationWeather from "../homestay/ReservationWeather";
import {
  OpenMeteoDaily,
  OpenMeteoDailyResponse,
} from "@/types/schema/OpenMeteoSchema";
import useFetchWeatherPrediction from "@/features/weater/useFetchWeatherPrediction";
import { SingleContentWrapper } from "../common/SingleContentWrapper";

type Props = {
  currentStep: number;
  steps: number[];
  nextStep: () => void;
  prevStep: () => void;
  packageItem: PackageServiceGallery;
  isPending: boolean;
  isWithHomestay?: boolean;
};
export const ReservationForms: FC<Props> = ({
  currentStep,
  nextStep,
  prevStep,
  steps,
  packageItem,
  isWithHomestay,
  isPending,
}) => {
  const [total, setTotal] = useState<number | null>(null);
  const { values, setFieldValue } = useFormikContext<FormReservationSchema>();
  const [reqValid, setReqValid] = useState({
    guide: false,
    total: values.total_people,
    date: "",
  });
  const {
    data: weathers,
    isLoading: weatherLoading,
    isSuccess,
  } = useFetchWeatherPrediction();

  useEffect(() => {
    if (weatherLoading) {
      showLoadingAlert("Loading weather data...");
    }
  }, [weatherLoading]);

  useEffect(() => {
    if (isSuccess) {
      cornerAlert("weather is Ready");
    }
  }, [isSuccess]);

  const filteredWeather: OpenMeteoDailyResponse | null | undefined =
    weathers && values.check_in
      ? (() => {
          const indices = weathers?.daily.time
            .map((day, i) =>
              dayjs(day).isAfter(dayjs(values.check_in), "day") ||
              dayjs(day).isSame(dayjs(values.check_in), "day")
                ? i
                : -1
            )
            .filter((i) => i !== -1);

          if (!indices?.length) return null;

          // Ambil seluruh isi daily berdasarkan indeks
          const filteredDaily = Object.fromEntries(
            Object.entries(weathers.daily).map(([key, values]) => [
              key,
              indices.map((i) => values[i]),
            ])
          ) as OpenMeteoDaily;

          return {
            ...weathers,
            daily: filteredDaily,
          };
        })()
      : weathers;

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
      <SingleContentWrapper className="mb-8">
        <ReservationWeather weathers={filteredWeather} />
      </SingleContentWrapper>
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
