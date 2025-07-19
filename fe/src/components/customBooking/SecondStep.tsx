import React, { FC } from "react";
import { FormInput } from "../inputs/FormInput";
import { NextStepButton } from "./NextStepButton";
import { PrevStepButton } from "./PrevStepButton";
import { StepFooter } from "./StepFooter";
import { UnitHomestayReservation } from "@/features/reservation/useFetchUnitHomestayReservation";
import { CheckBoxInput } from "../common/CheckBoxInput";
import { useFormikContext } from "formik";
import { FormReservationSchema } from "@/app/(user)/web/(auth)/reservation/custombooking/[id]/page";
import Img from "../common/Img";
import { FaUser } from "react-icons/fa";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  currentStep: number;
  unitHomestayReservation?: UnitHomestayReservation[];
  isWithHomestay?: boolean;
  packageTotal: number | null;
};

export type ReservationFormSchema = FormReservationSchema & {
  total_unit: number;
  total_people_homestay: number;
  selectedUnits: UnitHomestayReservation[];
};
export const SecondStep: FC<Props> = ({
  nextStep,
  prevStep,
  currentStep,
  packageTotal,
  unitHomestayReservation,
  isWithHomestay 
}) => {
  const isVisibile =isWithHomestay&& currentStep == 2;

  const { setFieldValue, values } = useFormikContext<ReservationFormSchema>();

  const handleCheckboxChange = (
    unit: UnitHomestayReservation,
    isChecked: boolean
  ) => {
    const newSelectedUnits = isChecked
      ? [...values.selectedUnits, unit]
      : values.selectedUnits.filter((unitIndex) => unitIndex !== unit);
    const totalPrice =
      newSelectedUnits.reduce((sum, unit) => sum + (unit?.price || 0), 0) || 0;
    const totalReservation = Number(packageTotal) + totalPrice;
    setFieldValue("selectedUnits", newSelectedUnits);
    setFieldValue("total_unit", newSelectedUnits.length); 
    setFieldValue("total_price_homestay", totalPrice);
    setFieldValue("total_price_reservation", totalReservation);
    setFieldValue("total_deposit", totalReservation / 5);
  };

  const RenderUnitHomestay = () => {
    return unitHomestayReservation?.map((unit, index) => (
      <tr className="align-top" key={index}>
        <td>
          <CheckBoxInput
            onChange={(e) => handleCheckboxChange(unit, e.target.checked)}
            name={`choosed_units`}
            checked={values.selectedUnits.includes(unit)}
            id={`choosed${index}`}
          />
        </td>
        <td>{values.check_in}</td>
        <td>
          <section className="flex gap-2">
            <figure>
              <Img
                alt="homestay image"
                width={200}
                height={200}
                className=" object-contain"
                src={"sum1.jpeg"}
              />
            </figure>
            <div className="text-wrap">
              <h4>{unit.homestay.name}</h4>
              <article>
                <p>Facilities : {unit?.facilityDetails?.length} </p>
              </article>
              <ul>
                {unit?.facilityDetails?.map((fac, index) => (
                  <li key={index}>{fac.unitFacility.name}</li>
                ))}
              </ul>
            </div>
          </section>
        </td>
        <td>{unit?.unit_name}</td>
        <td>{unit?.price}</td>
        <td>
          <div className="flex items-center  justify-center gap-2">
            <FaUser /> {unit?.capacity}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <section className={`bg-white ${!isVisibile && "hidden"} rounded-xl p-5`}>
      <header className="col-span-2 text-center max-w-lg mx-auto">
        <h4>homestay </h4>
        <div className="flex text-left gap-4">
          <FormInput
            name="total_unit"
            readonly
            type="text"
            label="total_unit"
            value={values.total_unit || 0} // Ensure default value
          />
          <FormInput
            name="total_people_homestay"
            readonly
            type="text"
            label="total_people_homestay"
            value={values.total_people_homestay || 0} // Ensure default value
          />
        </div>
      </header>
      <section className="col-span-2">
        <table className="w-full [&_thead]:capitalize [&_thead]:border-b [&_td]:p-2 border-b">
          <thead>
            <tr>
              <th>#</th>
              <th>date</th>
              <th>homestay name</th>
              <th>unit name</th>
              <th>price</th>
              <th>capacity</th>
            </tr>
          </thead>
          <tbody>
            <RenderUnitHomestay />
          </tbody>
        </table>
      </section>
      <StepFooter>
        <p>
          Total :
          {(
            Number(packageTotal ?? 0) + Number(values.total_price_homestay ?? 0)
          ).toLocaleString()}
        </p>
        <PrevStepButton prevStep={prevStep} />
        <NextStepButton nextStep={nextStep} />
      </StepFooter>
    </section>
  );
};
