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

export type User = {
  id: number;
  email: string;
  username: string;
  fullname: string;
  user_image: string;
  address: string;
  phone: string;
  password_hash: string;
  reset_hash: string | null;
  reset_at: string | null;
  reset_expires: string | null;
  activate_hash: string | null;
  status: string | null;
  status_message: string | null;
  active: number;
  force_pass_reset: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type AuthGroupUser = {
  group_id: number;
  user_id: number;
  user: User;
};

export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
