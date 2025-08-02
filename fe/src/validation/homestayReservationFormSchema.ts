import * as yup from "yup";

export const homestayReservationFormSchema = yup.object({
  check_in: yup.string().required(""),
  check_in_time: yup.string().required(),
  check_out: yup.string().required(),
  days_of_stay: yup.number().min(1).required(),
  total_people: yup.number().min(1).required(),
  whatsapp_number: yup.string().required(),
  agreed_to_terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required(),
});
