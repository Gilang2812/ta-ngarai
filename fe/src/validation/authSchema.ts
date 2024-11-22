import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email or Username is required"),
  password: yup.string().required("Password must be at least 6 characters long"),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    username: yup.string().min(3).max(20).required("Username is required"),
    password: yup.string().min(8).max(20).required("Password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

export type RegisterSchema = yup.InferType<typeof registerSchema>;

