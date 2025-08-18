"use client";

import Loading from "@/app/loading";
import { FinishStep } from "@/components/customBooking/FinishStep";
import { ReservationForms } from "@/components/customBooking/ReservationForms";
import { Steps } from "@/components/customBooking/Steps";
import { useCreateReservation } from "@/features/reservation/useCreateReservation";
// import { useFetchUnitHomestayReservation } from "@/features/reservation/useFetchUnitHomestayReservation";
import { useGetPackage } from "@/features/web/package/useGetPackage";
import useFormStep from "@/hooks/useFormStep";
import { PackageServiceGallery } from "@/type/schema/PackageSchema";
import { cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { Formik } from "formik";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type FormReservationSchema = {
  package?: string | null;
  min_capacity: number;
  day: number;
  price: number;
  total_people: number | null;
  package_order: string;
  total_package: number | null;
  check_in: string;
  check_in_time: string;
  check_out: string;
  check_out_time: string;
  total_price_homestay: number | null;
  total_price_reservation: number | null;
  total_deposit: number | null;
};

const CustomBooking = () => {
  const { id }: { id: string } = useParams();
  const [reservationId, setReservationId] = useState<string | null>(null);
  const { data: packageItem, isLoading } = useGetPackage<PackageServiceGallery>(
    id,
    ["package", "service", "gallery"]
  );
  const isWithHomestay = packageItem && packageItem?.packageDays?.length > 1;
  const stepsLength = isWithHomestay ? 4 : 3;
  const { currentStep, steps, nextStep, prevStep } = useFormStep(stepsLength);
  const { mutate, isPending } = useCreateReservation({
    onSuccess: (response) => {
      const data = response as { id: string };
      nextStep();
      cornerAlert("Reservation created successfully");
      setReservationId(data.id);
    },
  });
  const handleSubmit = (value: FormReservationSchema) => {
    mutate(value);
  };

  useEffect(() => {
    if (isPending) {
      showLoadingAlert();
    }
  }, [isPending]);

  if (isLoading) return <Loading />;
  return (
    <div className="space-y-20 min-w-fit ">
      <Steps currentStep={currentStep} steps={steps} />
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          package_id: packageItem?.id,
          package: packageItem?.name,
          min_capacity: packageItem?.min_capacity || 0,
          day: packageItem?.packageDays?.length || 1,
          price: packageItem?.price || 0,
          total_people: 0,
          package_order: "",
          total_package: 0,
          check_in: "",
          check_in_time: "10:00",
          check_out: "",
          check_out_time: "",
          total_price_homestay: null,
          total_price_reservation: null,
          total_deposit: null,
          total_people_unit: null,
          total_people_homestay: "",
          total_unit: null,
          selectedUnits: [],
        }}
      >
        {!isLoading && packageItem && (
          <ReservationForms
            currentStep={currentStep}
            isWithHomestay={isWithHomestay}
            nextStep={nextStep}
            packageItem={packageItem}
            prevStep={prevStep}
            steps={steps}
            isPending={isPending}
          />
        )}
      </Formik>
      <FinishStep currentSteps={currentStep} id={reservationId} steps={steps} />
    </div>
  );
};

export default CustomBooking;
