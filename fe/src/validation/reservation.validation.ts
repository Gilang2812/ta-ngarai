import * as yup from "yup";

export const cancelSchema = yup.object().shape({
  cancel: yup.string().required("Select this before proceeding"),
});

export const cancelRefundSchema = yup.object().shape({
  cancel: yup.string().required("Select this before proceeding"),
  account_refund: yup.string().required("Input your bank account for refund"),
});

export const checkRefundSchema = yup.object().shape({
  id: yup.string().required(),
  refund_check: yup.number().required("Select an option").oneOf([0, 1]),
});
