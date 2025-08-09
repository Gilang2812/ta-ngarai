import { FormInput } from "../inputs/FormInput";
import { Form } from "formik";
import { CheckBoxLabel } from "../common/CheckBoxLabel";
import Button from "../common/Button";
import { Accordion } from "../web/detailReservation/Accordion";

import dayjs from "dayjs";
import useHomestayReservationForm from "@/hooks/useHomestayReservationForm";
import HomestrayReservationList from "./HomestrayReservationList";
import { AllUnitHomestayResponseSchema } from "@/type/schema/HomestaySchema";
import ReservationWeather from "./ReservationWeather";
import { OpenMeteoDailyResponse } from "@/type/schema/OpenMeteoSchema";
import { cn } from "@/utils/common/cn";
import BookingItem from "./BookingItem";
import TableHeaderManagement from "../admin/TableHeaderManagement";
import { formatPrice } from "@/lib/priceFormatter";

type Props = {
  unitHomestay: AllUnitHomestayResponseSchema[];
  handleSelectedUnit: (unit: AllUnitHomestayResponseSchema) => void;
  isSelected: (unit: AllUnitHomestayResponseSchema) => boolean;
  uniqueUnitType?: string[];
  selectedUnit?: AllUnitHomestayResponseSchema[];
  handleNextStep?: () => void;
  currentStep?: number;
  weathers?: OpenMeteoDailyResponse | null;
  setCheckIn: (date: string) => void;
};

const HomestayReservationForm: React.FC<Props> = ({
  unitHomestay,
  currentStep,
  handleSelectedUnit,
  isSelected,
  uniqueUnitType,
  selectedUnit = [],
  weathers,
  handleNextStep,
  setCheckIn,
}) => {
  const {
    filteredUnitHomestay,
    isCompleted,
    setFieldValue,
    handleRadioChange,
    reservedInComingDate,
    bookingInfoData,
    values,
  } = useHomestayReservationForm({
    unitHomestay,
    selectedUnit,
    uniqueUnitType,
    setCheckIn,
  });

  return (
    <Form className="">
      <section
        aria-label="first-step"
        className={cn(
          " grid grid-cols-1 md:grid-cols-2 divide-x-2 ",
          currentStep !== 1 && "hidden"
        )}
      >
     
        <div className="md:col-span-2">
          <ReservationWeather weathers={weathers} homestayName={unitHomestay?.[0]?.homestay?.name} />
        </div>
        <HomestrayReservationList
          filteredUnitHomestay={filteredUnitHomestay}
          handleSelectedUnit={handleSelectedUnit}
          isSelected={isSelected}
        />
        <section className=" p-4 space-y-4">
          <Accordion
            defaultOpen={reservedInComingDate?.length > 0}
            title="unable reservation dates"
          >
            <header className="text-center font-bold capitalize mb-8">
              {reservedInComingDate?.length > 0
                ? reservedInComingDate?.map((date, index) => (
                    <p key={`${date}-${index}`} className="text-red-500">
                      {dayjs(date).format("DD MMMM YYYY")}
                    </p>
                  ))
                : "All dates are available for reservation"}
            </header>
          </Accordion>
          <div className="flex gap-3">
            <FormInput
              type="date"
              label="Check in"
              name="check_in"
              min={dayjs().add(3, "day").format("YYYY-MM-DD")}
            />
            <FormInput
              readOnly
              type="time"
              label="Check in time"
              name="check_in_time"
            />
          </div>

          <FormInput
            readOnly
            type="datetime-local"
            label="Check out"
            name="check_out"
          />
          <div className="flex gap-3">
            <FormInput type="number" label="Day of Stay" name="days_of_stay" />
            <FormInput type="number" label="Total People" name="total_people" />
          </div>
          <FormInput as="select" label="Unit Type" name="unit_type">
            {uniqueUnitType?.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FormInput>

          <FormInput
            type="tel"
            label="Whatsapp Number"
            name="whatsapp_number"
          />

          <div className="  font-semibold gap-3 mb-8">
            <CheckBoxLabel
              id="agreedToTerms"
              name="agreed_to_terms"
              onChange={(e) =>
                setFieldValue("agreed_to_terms", e.target.checked)
              }
              label={
                <>
                  I have read and agree to the&nbsp;
                  <span className="text-primary">Terms and Conditions</span>
                </>
              }
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button
              disabled={!isCompleted}
              type="button"
              className="h-fit py-1"
              onClick={handleNextStep}
            >
              Next
            </Button>
          </div>
        </section>
      </section>
      <section
        aria-label="second-step"
        className={cn(" p-6  ", currentStep !== 2 && "hidden")}
      >
        {/* Header Information */}
        <section className="space-y-4 mb-8" aria-labelledby="booking-info">
          <h1 id="booking-info" className="sr-only">
            Booking Information
          </h1>
          <dl className="space-y-4">
            {bookingInfoData.map((item) => (
              <BookingItem
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </dl>
        </section>

        {/* Reservation Details Table */}
        <section className="mb-8" aria-labelledby="reservation-details">
          <h2 id="reservation-details" className="text-xl font-semibold mb-4 ">
            List Detail Reservation
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table
              className="w-full [&_thead]:bg-gray-800 [&_thead]:text-white [&_td]:p-2 [&_th]:p-2  "
              role="table"
              aria-describedby="reservation-summary"
            >
              <TableHeaderManagement
                action={false}
                headers={["Description", "unit_type", "Unit Price", "Amount"]}
              />

              <tbody className="bg-gray-50">
                {selectedUnit.length > 0 &&
                  selectedUnit.map((unit, index) => (
                    <tr key={index}>
                      <td className="text-center px-4 py-4 border-b border-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <div>
                          <div className="font-medium">{unit.unit_name}</div>
                          <div className="text-sm text">{unit.description}</div>
                        </div>
                      </td>
                      <td className="text-center px-4 py-4 border-b border-gray-200">
                        {unit.unitType.name_type}
                      </td>
                      <td className="text-center px-4 py-4 border-b border-gray-200">
                        {formatPrice(unit.price)}
                      </td>
                      <td className="text-center px-4 py-4 border-b border-gray-200">
                        {formatPrice(unit.price * values.days_of_stay)}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan={3}></td>

                  <td className="text-center">Grand Total</td>
                  <td className="text-center">
                    {formatPrice(
                      parseInt(
                        (values.total_price_reservation as unknown as string) ||
                          "0"
                      )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment Section */}
        <section className="mb-8" aria-labelledby="payment-options">
          <h3 id="payment-options" className="font-semibold mb-4">
            Add Additional notes and Payment information
          </h3>
          <fieldset className="space-y-2">
            <legend className="sr-only">Payment Options</legend>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="partial"
                onChange={handleRadioChange}
                className="mr-2 focus:bg-primary  focus:!outline-none focus:ring-2   focus:ring-transparent checked:bg-primary"
                aria-describedby="partial-desc"
              />
              <span>Partial (50% of Full Price)</span>
            </label>
            <p id="partial-desc" className="sr-only">
              Pay 50% of the total amount now
            </p>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="full"
                onChange={handleRadioChange}
                className="mr-2 focus:bg-primary  focus:!outline-none focus:ring-2   focus:ring-transparent checked:bg-primary"
                aria-describedby="full-desc"
              />
              <span>Full</span>
            </label>
            <p id="full-desc" className="sr-only">
              Pay the complete amount now
            </p>
          </fieldset>
        </section>

        {/* Total Amount and Pay Button */}
        <footer
          className=" flex flex-col items-center gap-4"
          role="contentinfo"
        >
          <div className="w-full flex items-end justify-end gap-4">
            <span
              className="font-semibold text-lg"
              aria-label="Final total amount"
            >
              Total Amount
            </span>
            <span className="text-2xl font-bold text-primary">
              {values.total_deposit &&
                formatPrice(
                  parseInt((values.total_deposit as unknown as string) || "0")
                )}
            </span>
          </div>

          <Button
            className="w-full max-w-md"
            type="submit"
            aria-describedby="payment-total"
          >
            Pay
          </Button>
        </footer>
      </section>
    </Form>
  );
};

export default HomestayReservationForm;
