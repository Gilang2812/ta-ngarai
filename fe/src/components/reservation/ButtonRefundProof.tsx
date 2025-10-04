import React from "react";
import Button from "../common/Button";
import { FaCheck, FaMoneyBill } from "react-icons/fa6";
import { Modal } from "../modal/Modal";
import { useModal } from "@/utils/ModalUtils";
import { ErrorMessage, Form, Formik } from "formik";
import { checkRefundSchema } from "@/validation/reservation.validation";
import { FaTimes } from "react-icons/fa";
import { useUpdateReservation } from "@/features/reservation/useUpdateReservation";
import { cornerAlert } from "@/utils/AlertUtils";
import ImgCraft from "../common/ImgCraft";

type Props = {
  id: string;
  refund_check: number | null;
  refetchData: () => void;
  proof_refund: string | null;
};

interface RefundProofFormSchema {
  id: string;
  refund_check: number;
}

const ButtonRefundProof = ({
  id,
  refund_check,
  proof_refund,
  refetchData,
}: Props) => {
  const correct = !!refund_check;
  const { isOpen, toggleModal } = useModal();
  const initialValues: RefundProofFormSchema = {
    id: id,
    refund_check: "" as unknown as number,
  };
  const { mutate: updateReservation } =
    useUpdateReservation<RefundProofFormSchema>({
      onSuccess: () => {
        cornerAlert("Proof of refund submitted successfully");
        toggleModal();
        refetchData();
      },
    });
  const handleSubmit = (values: RefundProofFormSchema) => {
 
    updateReservation(values);
  };
  return (
    proof_refund && (
      <>
        <Button
          onClick={toggleModal}
          variant={"regDanger"}
          className="bg-white"
        >
          <FaMoneyBill /> Proof of Refund
        </Button>
        <Modal title="Proof of Refund" onClose={toggleModal} isOpen={isOpen}>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={checkRefundSchema}
          >
            {({ handleChange }) => (
              <Form className="space-y-4 py-4">
                {refund_check !== null ? (
                  <div>
                    <p>
                      Proof of refund is{" "}
                      <span
                        className={` text-white rounded p-1 ${
                          correct ? " bg-green-500 " : "text-white bgred-600 "
                        }`}
                      >
                        {correct ? "correct" : "incorrect"}
                      </span>
                    </p>
                  </div>
                ) : (
                  <section className="space-y-2 ">
                    <p>is this prof of refund Correct?</p>
                    <article className="flex items-center  gap-4">
                      <div className="flex gap-2 cursor-pointer py-1 rounded-full p-2 border w-fit">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            onChange={handleChange}
                            name="refund_check"
                            value={0}
                            type="radio"
                            className="cursor-pointer"
                          />
                          <span className=" flex gap-2 items-center">
                            <FaTimes /> incorrect
                          </span>
                        </label>
                      </div>
                      <div className="flex gap-2 cursor-pointer py-1 rounded-full p-2 border w-fit">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            onChange={handleChange}
                            name="refund_check"
                            value={1}
                            type="radio"
                            className="cursor-pointer"
                          />
                          <span className=" flex gap-2 items-center">
                            <FaCheck /> Yes
                          </span>
                        </label>
                      </div>
                    </article>
                    <ErrorMessage
                      name="refund_check"
                      component="p"
                      className="text-red-500"
                    />
                    <Button className="p-1" type="submit">
                      Submit
                    </Button>
                  </section>
                )}
                <section>
                  <ImgCraft
                    src={proof_refund}
                    alt="proof of refund"
                    loading="lazy"
                    width={100}
                    height={100}
                    className="w-full object-contain"
                  />
                </section>
              </Form>
            )}
          </Formik>
        </Modal>
      </>
    )
  );
};

export default ButtonRefundProof;
