"use client";

import React from "react";
import { SingleContentWrapper } from "../common/SingleContentWrapper";
import { Steps } from "../customBooking/Steps";
import { Formik } from "formik";
import useHomestayReservation from "@/hooks/useHomestayReservation";
import HomestayReservationSkeleton from "../loading/HomestayReservationSkeleton";
import HomestayReservationForm from "./HomestayReservationForm";
import { homestayReservationFormSchema } from "@/validation/homestayReservationFormSchema";
import HomestayReservationFinish from "./HomestayReservationFinish";

type Props = {
  id: string;
};

const HomestayReservationPage: React.FC<Props> = ({ id }) => {
  const {
    weathers,
    unitHomestay,
    handleSelectedUnit,
    isSelected,
    handleSubmit,
    initialValues,
    selectedUnit,
    uniqueUnitType,
    currentStep,
    steps,
    reservationId,
    handleNextStep,
    setCheckIn,
    isPending,
    deposit_percentage,
    isLoading,
  } = useHomestayReservation(id);
  if (isLoading) {
    return <HomestayReservationSkeleton />;
  }
  return (
    unitHomestay && (
      <section className="space-y-8">
        <SingleContentWrapper>
          <Steps currentStep={currentStep} steps={steps} />
        </SingleContentWrapper>
        <SingleContentWrapper className="space-y-6 font-normal leading-loose">
          <Formik
            initialValues={initialValues}
            validationSchema={homestayReservationFormSchema}
            onSubmit={handleSubmit}
          >
            <HomestayReservationForm
              isPending={isPending} 
              deposit_percentage={deposit_percentage}
              currentStep={currentStep}
              weathers={weathers}
              unitHomestay={unitHomestay}
              handleSelectedUnit={handleSelectedUnit}
              isSelected={isSelected}
              uniqueUnitType={uniqueUnitType}
              selectedUnit={selectedUnit}
              handleNextStep={handleNextStep}
              setCheckIn={setCheckIn}
            />
          </Formik>
          <HomestayReservationFinish
            reservationId={reservationId}
            currentStep={currentStep}
          />
        </SingleContentWrapper>
      </section>
    )
  );
};

export default HomestayReservationPage;
