"use client";

import { FinishStep } from "@/components/customBooking/FinishStep"; 
import { ReservationForms } from "@/components/customBooking/ReservationForms"; 
import { Steps } from "@/components/customBooking/Steps";
// import { useFetchUnitHomestayReservation } from "@/features/reservation/useFetchUnitHomestayReservation";
import { useGetPackage } from "@/features/web/package/useGetPackage"; 
import { scrollToTop } from "@/utils/ScrollUtil";
import { Formik } from "formik";
 
import { useParams } from "next/navigation";
import { useState } from "react";

export type FormSchema = {
  package: string;
  min_capacity: number;
  day: number;
  price: number;
  total_people: number;
  package_order: string;
  total_package: string;
  check_in: string;
  check_in_time: string;
  check_out: string;
  check_out_time: string;
  total_price_homestay: string;
  total_price_reservation: string;
  total_deposit: string;
};

const CustomBooking = () => {
  const steps: number[] = [...new Array(4)].map(() => 0);
  const [currentStep, setCurrentStep] = useState(1);
    const { id }: { id: string } = useParams();
    const { data: packageItem, isLoading } = useGetPackage(id);
      const nextStep = () => {
        if (currentStep < steps.length) {
          setCurrentStep((prev) => prev + 1);
          scrollToTop();
        }
      };
    
      const prevStep = () => {
        if (currentStep > 1) {
          setCurrentStep((prev) => prev - 1);
          scrollToTop();
        }
      };
    console.log(packageItem);
    if (isLoading) return <p>Loading...</p>;
  return (
    <div className="space-y-20 min-w-fit ">
      <Steps currentStep={currentStep} steps={steps} />
      <Formik
        onSubmit={(values) => console.log(values)}
        initialValues={{
          package: packageItem?.name,
          min_capacity: packageItem?.min_capacity,
          day: packageItem?.packageDays?.length,
          price: packageItem?.price,
          total_people: "",
          package_order: "",
          total_package: "",
          check_in: "",
          check_in_time: "10:00",
          check_out: "",
          check_out_time: "",
          total_price_homestay: "",
          total_price_reservation: "",
          total_deposit: "",
          total_people_unit: "",
          total_people_homestay: "",
        }}
      >
        <ReservationForms steps={steps} currentStep={currentStep} prevStep={prevStep} nextStep={nextStep} />
      </Formik>
      <FinishStep currentSteps={currentStep} steps={steps} />
    </div>
  );
};

export default CustomBooking;
