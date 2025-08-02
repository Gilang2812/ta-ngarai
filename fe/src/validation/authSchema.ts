import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email or Username is required"),
  password: yup
    .string()
    .required("Password must be at least 6 characters long"),
});

export type LoginSchema = yup.InferType<typeof loginSchema> & {
  credential?: string;
};

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  username: yup.string().min(3).max(20).required("Username is required"),
  password: yup.string().min(8).max(20).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export type UserLogin = {
  id: number;
  email: string;
  username: string;
  role: number;
  name: string;
  phone: string;
  address: string;
  id_souvenir_place: string;
};

export type LoginResponse = {
  token: string;
  user: UserLogin;
};

export type UpdateProfileForm = {
  fullname: string;
  phone: string;
  address: string;
};

export type RegisterSchema = yup.InferType<typeof registerSchema>;
