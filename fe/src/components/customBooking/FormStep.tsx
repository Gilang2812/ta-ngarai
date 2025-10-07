import React, { FC } from "react";
import { FormInput } from "../inputs/FormInput";
import { Accordion } from "../web/detailReservation/Accordion";
import { NextStepButton } from "./NextStepButton";
import { Guide } from "./Guide";
import { StepFooter } from "./StepFooter";
import { PrevStepButton } from "./PrevStepButton";
import { useFormikContext } from "formik";
import { ReservationFormSchema } from "./SecondStep";
import { useService } from "@/utils/ServiceCategory";
import { DetailServiceSchema } from "@/types/schema/ServiceSchema";
import { PackageServiceGallery } from "@/types/schema/PackageSchema";
import Button from "../common/Button";
import { SingleContentWrapper } from "../common/SingleContentWrapper";
type Props = {
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  steps: number[];
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  total: number | null;
  minReservation: string | number;
  isValid: string | false;
  packageItem?: PackageServiceGallery;
  isWithHomestay?: boolean;
  isPending: boolean;
};

export const FormStep: FC<Props> = ({
  nextStep,
  prevStep,
  currentStep,
  steps,
  handleCheck,
  total,
  minReservation,
  isValid,
  packageItem,
  isWithHomestay,
  isPending,
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length - 1;
  const isVisibile = isFirstStep || isLastStep;
  const include = useService(1, packageItem);
  const exclude = useService(0, packageItem);
  const { values } = useFormikContext<ReservationFormSchema>();

  const LastStepForm = () => {
    return (
      isLastStep && (
        <>
          {isWithHomestay && (
            <FormInput
              name="total_price_homestay"
              type="text"
              label="total price homestay"
              readonly
            />
          )}
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

  const RenderHomestayUnits = () => {
    return values?.selectedUnits?.map((unit, index) => (
      <tr key={index}>
        <th> {values.check_in} </th>
        <th>{unit.homestay_id}</th>
        <th>{unit.unitType.name_type}</th>
        <th>{unit.unit_number}</th>
        <th>{unit.homestay.name}</th>
        <th>{unit.unit_name}</th>
        <th>{unit.price}</th>
        <th>{unit.capacity}</th>
      </tr>
    ));
  };
  const RenderService = ({ service }: { service?: DetailServiceSchema[] }) => {
    return service?.map((service, index) => (
      <li key={index}>{service.service.name}</li>
    ));
  };
  const RenderActivity = () => {
    return packageItem?.packageDays.map((day, index) => (
      <article key={index} className="p-2">
        <p>{day.description}</p>
        <ul className="list-decimal px-6">
          {day.detailPackages.map((activity, i) => (
            <li key={i}>{activity.description}</li>
          ))}
        </ul>
      </article>
    ));
  };

  const Summary = () => {
    return (
      <div className="flex gap-20 text-right leading-loose">
        <div>
          <p>total package</p>
          {isWithHomestay && <p>total homestay</p>}
          <p>total reservation</p>
        </div>
        <div className="font-normal">
          <p>Rp {values?.total_package?.toLocaleString()}</p>
          {isWithHomestay && (
            <p>Rp {values?.total_price_homestay?.toLocaleString()}</p>
          )}
          <p>Rp {values.total_price_reservation?.toLocaleString()}</p>
        </div>
      </div>
    );
  };
  return (
    <SingleContentWrapper
      className={`  ${
        isVisibile ? "block" : "hidden"
      } transition-ease-in-out p-5  [&_h2]:text-xl [&_header]:col-span-2  [&_h2]:text-center `}
    >
      <header className="space-y-12">
        <h2>Reservation Preview</h2>
        <Guide isLastStep={isLastStep} handleCheck={handleCheck} />
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
              <ul className="p-4 list-disc">
                <RenderService service={include} />
              </ul>
            </Accordion>
            <Accordion title="Package Exclude">
              <ul className="p-4 list-disc">
                <RenderService service={exclude} />
              </ul>
            </Accordion>
            <Accordion title="Package Activity">
              <RenderActivity />
            </Accordion>
          </div>
        </section>
        <section className="leading-loose">
          <div className="flex appearance-auto flex-wrap gap-10 items-end">
            <FormInput
              name="check_in"
              type="date"
              label="Check in"
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

          <div className={`${!isLastStep && "hidden"} space-y-4`}>
            <FormInput
              placeholder="Make request that you want to be on the reservation record. such as the proposed food menu and price range of the package"
              label="Note"
              name="note"
              type="text"
              as="textarea"
              rows={4}
            />
            {isWithHomestay && (
              <Accordion defaultOpen={true} title="Homestay Units">
                <div className=" overflow-x-scroll">
                  <table className="[&_th]:p-2 w-full">
                    <thead>
                      <tr className="border-b-2">
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
                      <RenderHomestayUnits />
                    </tbody>
                  </table>
                </div>
              </Accordion>
            )}
          </div>
        </section>

        {isLastStep && (
          <section className="col-span-2  flex justify-end">
            <Summary />
          </section>
        )}
        <StepFooter>
          {isFirstStep && total && <p>total: Rp {total?.toLocaleString()} </p>}

          {isLastStep ? (
            <>
              <PrevStepButton prevStep={prevStep} />
              <Button type="submit" isLoading={isPending} disabled={isPending}>
                Submit
              </Button>
            </>
          ) : (
            <NextStepButton disabled={!isValid} nextStep={nextStep} />
          )}
        </StepFooter>
      </section>
    </SingleContentWrapper>
  );
};
