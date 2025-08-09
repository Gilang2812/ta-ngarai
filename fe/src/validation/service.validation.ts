import * as yup from "yup";

export const serviceFormSchema = yup.object({
  package_id: yup.string().required(),
  service_package_id: yup.string().required('select a service package'),
  status: yup.number().required(),
  status_created: yup.number().required(),
});
