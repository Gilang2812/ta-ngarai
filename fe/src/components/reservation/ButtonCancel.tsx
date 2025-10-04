import React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Button from "../common/Button";
import { useUpdateReservation } from "@/features/reservation/useUpdateReservation";
import { cornerAlert, cornerError } from "@/utils/AlertUtils";
import dayjs from "dayjs";
import { Modal } from "../modal/Modal";
import { useModal } from "@/utils/ModalUtils";
import { ErrorMessage, Form, Formik } from "formik";
import { FormInput } from "../inputs/FormInput";
import {
  cancelRefundSchema,
  cancelSchema,
} from "@/validation/reservation.validation";
import useUserRole from "@/hooks/useUserRole";

type Props = {
  id: string;
  check_in: string;
  payment_date: string | null;
  deposit_date: string | null;
  refund_date: string | null;
  deposit: number | null;
  depositRefundPercentage: number;
  total_price: number;
  refetchData: () => void;
  cancel_date: string | null;
};

interface CancelProps {
  id: string;
  cancel: number;
  cancel_date: string;
  account_refund?: string | null;
  refund_amount?: number | null;
}

const ButtonCancel = ({
  id,
  check_in,
  payment_date,
  deposit_date,
  refund_date,
  deposit,
  depositRefundPercentage,
  total_price,
  refetchData,
  cancel_date,
}: Props) => {
  const { isAdmin } = useUserRole();
  const isRefund =
    dayjs(check_in).isAfter(dayjs().add(2, "day")) &&
    (!!payment_date || !!deposit_date);

  const isCancel = dayjs().isBefore(dayjs(check_in));
  const isRefundFull = isRefund && !!payment_date;
  const { isOpen, toggleModal } = useModal();
  const { mutate: updateReservation, isPending } =
    useUpdateReservation<CancelProps>({
      onSuccess: () => {
        cornerAlert("Reservation canceled successfully");
        refetchData();
        toggleModal();
      },
    });

  const initialValues = {
    id: id,
    cancel: "" as unknown as number,
    cancel_date: dayjs().format(),
    account_refund: "",
  };
  const handleSubmit = (values: { cancel: number; account_refund: string }) => {
    const requestBody: CancelProps = {
      id: id,
      cancel_date: dayjs().format(),
      cancel: values.cancel,
    };

    if (!payment_date || !deposit_date) {
      cornerError("the reservation is not paid yet");
    }
    if (refund_date) {
      cornerAlert("the reservation is already refunded");
    }
    if (isRefund) {
      requestBody.account_refund = values.account_refund;
      requestBody.refund_amount = isRefundFull
        ? total_price - (deposit || 0)
        : (depositRefundPercentage / 100) * (deposit || 0);
    }
    updateReservation(requestBody); 
  };

  return (
    !isAdmin &&
    !cancel_date &&
    isCancel && (
      <>
        <Button variant={"danger"} onClick={toggleModal}>
          <FaXmark /> Cancel
        </Button>
        <Modal
          title={isRefund ? "Cancel Refund" : "Cancel"}
          onClose={toggleModal}
          isOpen={isOpen}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={isRefund ? cancelRefundSchema : cancelSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange }) => (
              <Form className="py-4 space-y-4 font-semibold">
                <div>
                  {isRefund &&
                    (isRefundFull ? (
                      <p className="p-2 rounded bg-gray-500 font-normal italic  text-white ">
                        Deposits will not be returned. We will only refund the
                        total cost minus the deposit (according to the full
                        payment that has been sent)
                      </p>
                    ) : (
                      <p className="p-2 rounded bg-gray-500  text-white ">
                        Deposit will be returned Only 50% of the deposit you
                        sent
                      </p>
                    ))}
                </div>
                <div>
                  <p>are you sure cancel this reservation?</p>
                  <div className="flex gap-2 cursor-pointer py-1 rounded-full p-2 border w-fit">
                    <label className="flex  items-center gap-2">
                      <input
                        onChange={handleChange}
                        name="cancel"
                        value={1}
                        type="radio"
                      />
                      <span className=" flex gap-2 items-center">
                        <FaCheck /> Yes
                      </span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="cancel"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                {isRefund && (
                  <div>
                    <p>you bank account for refund</p>
                    <FormInput
                      name="account_refund"
                      as="textarea"
                      rows={4}
                      placeholder="example :<Bank> <Account Number> a.n <Account Name>"
                    />
                  </div>
                )}

                <div>
                  <Button
                    isLoading={isPending}
                    disabled={isPending}
                    type="submit"
                  >
                    Confirm{" "}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </>
    )
  );
};

export default ButtonCancel;
