import React, { FC } from "react";
import { FormInput } from "../inputs/FormInput";
import { NextStepButton } from "./NextStepButton";
import { PrevStepButton } from "./PrevStepButton";
import { StepFooter } from "./StepFooter";
import { UnitHomestayReservation } from "@/features/reservation/useFetchUnitHomestayReservation";
import { CheckBoxInput } from "../common/CheckBoxInput";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  currentStep: number;
  unitHomestayReservation?: UnitHomestayReservation[];
};
export const SecondStep: FC<Props> = ({
  nextStep,
  prevStep,
  currentStep,
  unitHomestayReservation,
}) => {
  const isVisibile = currentStep == 2;

  const RenderUnitHomestay = () => {
    return unitHomestayReservation?.map((unit, index) => (
      <tr key={index}>
        <td>
         <CheckBoxInput name="choosed" id={`choosed${index}`}/>
        </td>
        <td>asd</td>
        <td className="flex"><div>
          </div></td>
        <td>unit name</td>
        <td>price</td>
        <td>capacity</td>
      </tr>
    ));
  };

  return (
    <section className={`bg-white ${!isVisibile && "hidden"} rounded-xl p-5`}>
      <header className="col-span-2 text-center max-w-lg mx-auto">
        <h4>homestay</h4>
        <div className="flex text-left  gap-4">
          <FormInput
            name="total_unit"
            readonly
            type="text"
            label="total_unit"
          />
          <FormInput
            name="total_people_homestay"
            readonly
            type="text"
            label="total_people_homestay"
          />
        </div>
      </header>
      <section className="col-span-2">
        <table className="w-full [&_thead]:capitalize [&_thead]:border-b border-b">
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
        <PrevStepButton prevStep={prevStep} />
        <NextStepButton nextStep={nextStep} />
      </StepFooter>
    </section>
  );
};
