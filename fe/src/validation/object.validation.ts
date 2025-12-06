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
  country: yup.string().max(30).required("Please enter the country"),
  province: yup.string().max(30).required("Please enter the province"),
  regency: yup.string().max(50).required("Please enter the regency"),
  district: yup.string().max(30).required("Please enter the district"),
  village: yup.string().max(30).required("Please enter the village"),
  postal_code: yup
    .string()
    .length(5, "Postal code must be exactly 5 characters")
    .required("Please enter the postal code"),
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
  country: yup.string().max(30).required("Please enter the country"),
  province: yup.string().max(30).required("Please enter the province"),
  regency: yup.string().max(50).required("Please enter the regency"),
  district: yup.string().max(30).required("Please enter the district"),
  village: yup.string().max(30).required("Please enter the village"),
  postal_code: yup
    .string()
    .length(5, "Postal code must be exactly 5 characters")
    .required("Please enter the postal code"),
  capacity: yup.number().required("Please enter the capacity"),
  description: yup.string().required("Please provide a description"),
  geom: yup.string().required("Please draw the location on the map"),
});
export const traditionalSchema = yup.object().shape({
  name: yup.string().required("Please enter the traditional house name"),
  country: yup.string().max(30).required("Please enter the country"),
  province: yup.string().max(30).required("Please enter the province"),
  regency: yup.string().max(50).required("Please enter the regency"),
  district: yup.string().max(30).required("Please enter the district"),
  village: yup.string().max(30).required("Please enter the village"),
  postal_code: yup
    .string()
    .length(5, "Postal code must be exactly 5 characters")
    .required("Please enter the postal code"),
  contact_person: yup.string().required("Please enter the contact person"),
  ticket_price: yup
    .number()
    .min(1000, "Ticket price must be at least 1000")
    .required("Please enter the ticket price"),
  category: yup.number().oneOf([1, 2]).required("Please select a category"),
  min_capacity: yup.number().required("Please enter the minimum capacity"),
  open: yup.string().required("Please enter the opening time"),
  close: yup.string().required("Please enter the closing time"),
  description: yup.string().required("Please provide a description"),
  geom: yup.string().required("Please draw the location on the map"),
});
