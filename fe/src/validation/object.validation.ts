import * as yup from "yup";

export const attractionSchema = yup.object().shape({
  name: yup.string().required("Please enter the attraction name"),
  type: yup.string().required("Please select the attraction type"),
  category: yup.number().oneOf([1, 2]).required("Please select a category"),
  min_capacity: yup.number().required("Please enter the minimum capacity"),
  price: yup
    .number()
    .min(1000, "Price must be at least 1000")
    .required("Please enter the price"),
  description: yup.string().required("Please provide a description"),
  geom: yup.string().required("Please draw the location on the map"),
});

export const culinarySchema = yup.object().shape({
  name: yup.string().required("Please enter the restaurant name"),
  address: yup.string().required("Please enter the address"),
  contact_person: yup.string().required("Please enter the contact person"),
  open: yup.string().required("Please enter the opening time"),
  close: yup.string().required("Please enter the closing time"),
  status: yup
    .number()
    .oneOf([0, 1], "Please select a valid status")
    .required("Please select a status"),
  capacity: yup.number().required("Please enter the capacity"),
  description: yup.string().required("Please provide a description"),
  geom: yup.string().required("Please draw the location on the map"),
});

export const worshipSchema = yup.object().shape({
  name: yup.string().required("Please enter the place of worship name"),
  address: yup.string().required("Please enter the address"),
  capacity: yup.number().required("Please enter the capacity"),
  description: yup.string().required("Please provide a description"),
  geom: yup.string().required("Please draw the location on the map"),
});
