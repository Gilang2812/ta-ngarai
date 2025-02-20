import React, { FC, useState } from "react";
import { FormInput } from "../inputs/FormInput";
import { Accordion } from "../web/detailReservation/Accordion";
import { NextStepButton } from "./NextStepButton";
import { Guide } from "./Guide";
import { StepFooter } from "./StepFooter";
import { PrevStepButton } from "./PrevStepButton";
import { FormSubmit } from "../inputs/FormSubmit";
import { useFormikContext } from "formik";
import { FormSchema } from "@/app/(user)/web/reservation/custombooking/[id]/page";
import { cornerError } from "@/utils/AlertUtils";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  steps: number[];
};

export const FormStep: FC<Props> = ({
  nextStep,
  prevStep,
  currentStep,
  steps,
}) => {
  const [total, setTotal] = useState<number | null>(null);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length - 1;
  const isVisibile = isFirstStep || isLastStep;
  const { values, setFieldValue } = useFormikContext<FormSchema>();
  const [reqValid, setReqValid] = useState({
    guide: false,
    agree: false,
    total: 0,
    date: "",
  });

  const isValid =
    reqValid.agree &&
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

  const LastStepForm = () => {
    return (
      isLastStep && (
        <>
          <FormInput
            name="total_price_homestay"
            type="text"
            label="total price homestay"
            readonly
          />
          <FormInput
            name="total_price_reservation"
            type="text"
            label="total price reservation"
            readonly
          />
          <FormInput
            name="total_deposit"
            type="text"
            label="total deposit"
            readonly
          />
        </>
      )
    );
  };

  const Summary = () => {
    return (
      <div className="flex gap-20 text-right leading-loose">
        <div>
          <p>total package</p>
          <p>total homestay</p>
          <p>total reservation</p>
        </div>
        <div>
          <p>Rp package</p>
          <p>Rp homestay</p>
          <p>Rp reservation</p>
        </div>
      </div>
    );
  };
  return (
    <section
      className={`bg-white rounded-xl  ${
        isVisibile ? "block" : "hidden"
      } transition-ease-in-out p-5  [&_h2]:text-xl [&_header]:col-span-2  [&_h2]:text-center `}
    >
      <header className="space-y-12">
        <h2>Reservation Preview</h2>
        <Guide handleCheck={handleCheck} />
      </header>
      <section className="grid grid-cols-2 gap-16">
        <section className="leading-loose ">
          <FormInput name="package" type="text" label="package" readonly />
          <div className="flex flex-wrap  [&_div]:grow gap-x-8 w-full">
            <FormInput
              name="min_capacity"
              type="text"
              label="minimal capacity"
              readonly
            />
            <FormInput name="day" type="text" label="day activities" readonly />
          </div>
          <FormInput name="price" type="text" label="Price Package" readonly />
          <div className="flex gap-8">
            <FormInput
              name="total_people"
              type="number"
              label="total people"
              onInput={handleTotalPeopleInput}
              readonly={isLastStep}
            />
            <FormInput
              name="package_order"
              type="text"
              label="package order"
              readonly
            />
          </div>
          <FormInput
            name="total_package"
            type="text"
            label="total price package"
            readonly
          />
          <LastStepForm />
          <div className="py-16">
            <Accordion title="Package Include">
              <ul>
                <li>sadasd</li>
              </ul>
            </Accordion>
            <Accordion title="Package Exclude">
              <ul>
                <li>sadasd</li>
              </ul>
            </Accordion>
            <Accordion title="Package Service">
              <ul>
                <li>sadasd</li>
              </ul>
            </Accordion>
          </div>
        </section>
        <section className="leading-loose">
          <div className="flex appearance-auto flex-wrap gap-10 items-end">
            <FormInput
              name="check_in"
              type="date"
              label="Check in"
              onChange={handleDateInput}
              readonly={isLastStep}
              min={minReservation}
            />
            <FormInput name="check_in_time" type="time" readonly={isLastStep} />
          </div>
          <div className="flex flex-wrap gap-10 items-end">
            <FormInput
              name="check_out"
              type="date"
              label="Check out"
              readonly
            />
            <FormInput name="check_out_time" type="text" readonly />
          </div>
          <div
            className={`${
              !isFirstStep && "hidden"
            } py-8 space-y-4 pr-16  font-bold`}
          >
            <p className="text-red-600 capitalize">
              homestay resevation agreement
            </p>
            <p>
              This package has a duration of more than one day so it requires
              you to book a homestay. And to support equalization of
              reservations, homestay units are automatically selected by the
              system.
            </p>
            <label htmlFor="agree" className="flex gap-2 items-center ">
              <input
                type="checkbox"
                onChange={handleCheck}
                id="agree"
                name="agree"
                className="border-2  outline-none rounded-sm h-4 w-4 focus:outline-transparent focus:border-primary focus:hover:text-secondary focus:text-primary  focus:ring-transparent"
              />
              Yes, I Agree
            </label>
          </div>
          <div className={`${!isLastStep && "hidden"} space-y-4`}>
            <FormInput
              placeholder="Make request that you want to be on the reservation record. such as the proposed food menu and price range of the package"
              label="Note"
              name="note"
              type="text"
              as="textarea"
              rows={4}
            />
            <Accordion defaultOpen={true} title="Homestay Units">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Number</th>
                    <th>Homestay</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Cpty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Number</th>
                    <th>Homestay</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Cpty</th>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </div>
        </section>

        <section className="col-span-2  flex justify-end">
          <Summary />
        </section>
        <StepFooter>
          {isFirstStep && total && <p>total: Rp {total?.toLocaleString()} </p>}

          {isLastStep ? (
            <>
              <PrevStepButton prevStep={prevStep} />
              <FormSubmit className="px-8" value="Submit" />
            </>
          ) : (
            <NextStepButton disabled={!isValid} nextStep={nextStep} />
          )}
        </StepFooter>
      </section>
    </section>
  );
};
