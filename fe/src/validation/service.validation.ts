import * as yup from "yup";

export const detailServiceFormSchema = yup.object({
  package_id: yup.string().required(),
  service_package_id: yup.string().required("select a service package"),
  status: yup.number().required(),
  status_created: yup.number().required(),
});

export const serviceFormSchema = yup.object({
  name: yup.string().required("Service name is required"),
  category: yup.number().required("Service category is required").oneOf([1, 2]),
  price: yup.number().required("Service price is required").min(0),
  min_capacity: yup
    .number()
    .required("Service minimum capacity is required")
    .min(0),
});
