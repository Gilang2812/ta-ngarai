import * as yup from "yup";

export const packageDayFormSchema = yup.object().shape({
  package_id: yup.string().required(),
  current_day: yup.number().min(1).nullable().optional(),
  day: yup.number().min(1).required(),
  description: yup.string().required(),
});

export const detailPackageFormSchema = yup.object().shape({
  package_id: yup.string().required(),
  day: yup.number().min(1).required(),
  description: yup.string().required(),
  activity: yup.number().min(1).required(),
  object_id: yup.string().required('select the tourism object'),
});
