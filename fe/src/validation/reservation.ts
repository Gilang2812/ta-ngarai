import * as yup from "yup";
export const packageSchema = yup.object().shape({
  id: yup.string().required(),
  review: yup.string().nullable(),
  review_rating: yup.number().min(1).max(5).required(),
});

export const homestaySchema = yup.object().shape({
  date: yup.string().required(),
  unit_type: yup.string().required(),
  unit_number: yup.string().required(),
  homestay_id: yup.string().required(),
  reservation_id: yup.string().required(),
  review: yup.string().nullable(),
  review_rating: yup.number().min(1).max(5).required(),
});

export const confirmationSchema = yup.object().shape({
  id: yup.string().required("ID is required"),
  status: yup.string().required("select status confirmation"),
  feedback: yup.string().required("Feedback is required"),
});
