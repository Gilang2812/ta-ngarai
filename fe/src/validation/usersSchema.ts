import * as yup from "yup";

export const createUserSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email must be a google address"
    ),
  username: yup
    .string()
    .min(3, "Username must be at least 8 characters")
    .max(20)
    .required("Username is required"),
});



export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
