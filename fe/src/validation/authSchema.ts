import { axiosServer } from "@/lib/axiosServer";
import { CheckSUserResponse } from "@/types/schema/UsersSchema";
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
    .required("Email is required")
    .test("unique-email", "Email is already taken", async (value) => {
      if (!value) return false;
      const { data } = await axiosServer.post<CheckSUserResponse>(
        "/unique-field",
        {
          field: value,
        }
      );
      return data.available;
    }),
  username: yup
    .string()
    .min(3)
    .max(20)
    .required("Username is required")
    .test("unique-username", "Username is already taken", async (value) => {
      if (!value) return false;
      const { data } = await axiosServer.post<CheckSUserResponse>(
        "/unique-field",
        {
          field: value,
        }
      );
      return data.available;
    }),
  password: yup.string().min(8).max(20).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const updateProfileSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  username: yup
    .string()
    .min(3)
    .max(20)
    .required("Username is required")
    .test("unique-username", "Username is already taken", async (value) => {
      if (!value) return false;
      const { data } = await axiosServer.post<CheckSUserResponse>(
        "/unique-field",
        {
          field: value,
        }
      );
      return data.available;
    }),
  phone: yup.string().required("Phone is required"),
});
export const updateProfileSchemaWithoutUsername = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  phone: yup.string().required("Phone is required"),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: yup.string().min(8).max(20).required("New Password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword")],
      "Confirm Passwords must match New Password"
    )
    .required("Confirm Password is required"),
});

export type UserLogin = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  username?: string;
  phone?: string;
  address?: string;
  store?: UserStore[];
};

export type UserStore = {
  user_id: string;
  id_souvenir_place: string;
  isOwner: number;
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

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>;
