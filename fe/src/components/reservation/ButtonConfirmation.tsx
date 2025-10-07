import React from "react";
import Button from "../common/Button";
import { FaEnvelope } from "react-icons/fa";
import { ReservationStatus } from "@/utils/common/getReservationStatus";
import useUserRole from "@/hooks/useUserRole";
import { useModal } from "@/utils/ModalUtils";
import { Modal } from "../modal/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { confirmationSchema } from "@/validation/reservation";
import { FormInput } from "../inputs/FormInput";
import { ConfirmationFormSchema } from "@/types/schema/ReservationSchema";
import { useUpdateTokenReservation } from "@/features/reservation/useUpdateTokenReservation";
import { ItemDetails } from "@/types/common/paymentItemDetails";
type Props = {
  status: ReservationStatus;
  refetchData: () => void;
  reservation_id: string;
  item_details: ItemDetails[];
  deposit: number;
  total_price: number;
};

const ButtonConfirmation = ({
  status,
  refetchData,
  reservation_id,
  item_details,
  deposit,
  total_price,
}: Props) => {
  const { toggleModal, isOpen } = useModal();
  const { isAdmin } = useUserRole();
  const initialValues: ConfirmationFormSchema = {
    id: reservation_id,
    status: "",
    feedback: "",
  };

  const { mutate: updateTokenReservation, isPending: isUpdatingToken } =
    useUpdateTokenReservation<
      ConfirmationFormSchema & {
        item_details?:
          | []
          | {
              id: string;
              name: string;
              price: number;
              quantity: number;
            }[];
        deposit: number;
        total_price: number;
        deposit_date?: string;
        payment_date?: string;
      }
    >({
      onSuccess: () => {
        toggleModal();
        refetchData();
      },
    });

  const handleSubmit = (values: ConfirmationFormSchema) => {
    // Handle form submission logic here
    updateTokenReservation({
      ...values,
      status: values.status,
      item_details: [
        ...item_details,
        {
          id: "deposit_id",
          name: "Deposit",
          price: (deposit ?? 0) - (total_price ?? 0),
          quantity: 1,
        },
      ],
      deposit: deposit ?? 0,
      total_price: total_price ?? 0,
    });
  };

  return (
    isAdmin &&
    (status === "Rejected" ||
      (status === "Awaiting-Approval" && (
        <>
          <Button onClick={toggleModal}>
            <FaEnvelope />
            Confirmation
          </Button>
          <Modal title="Confirmation" isOpen={isOpen} onClose={toggleModal}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={confirmationSchema}
            >
              <Form className="space-y-4 p-4">
                <h2 className="text-lg font-bold">Status Confirmation</h2>
                <div className="flex gap-4 items-center [&_label]:border-2 [&_label]:p-2 [&_label]:rounded-full [&_label]:gap-2 [&_label]:items-center [&_label]:flex">
                  <label>
                    <Field type="radio" name="status" value="2" />
                    Rejected
                  </label>
                  <label>
                    <Field type="radio" name="status" value="1" />
                    Accepted
                  </label>
                </div>
                <ErrorMessage
                  name="status"
                  component="p"
                  className="text-red-600"
                />
                <FormInput
                  as="textarea"
                  name="feedback"
                  label="Feedback"
                  rows={4}
                  placeholder="Leave your feedback here..."
                />

                <Button
                  disabled={isUpdatingToken}
                  isLoading={isUpdatingToken}
                  className="h-fit py-1"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Formik>
          </Modal>
        </>
      )))
  );
};

export default ButtonConfirmation;
