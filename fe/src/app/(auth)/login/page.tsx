"use client";
import { Form, Formik } from "formik";
import { FaRegUser, FaShieldVirus } from "react-icons/fa";
import Heading from "@/components/auth/Heading";
import { FormSubmit } from "@/components/inputs/FormSubmit";
import { FormInput } from "@/components/inputs/FormInput";
import { LoginResponse, loginSchema } from "@/validation/authSchema";
import { cornerAlert, showErrorAlert } from "@/utils/AlertUtils";
import { useLogin } from "@/features/auth/useLogin";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";

// Define the validation schema using Yup

export default function Login() {
  const { setUser } = useAuthStore();
  const route = useRouter();
  const { mutate, isPending } = useLogin({
    onSuccess: (data) => {
      const response = data as LoginResponse;
      console.log("Login successful:", data);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      cornerAlert("Login successful!");
      localStorage.setItem("token", response.token);
      route.replace("/web");
    },
    onError: (e) => {
      showErrorAlert(e);
      console.error("Error during login:", e);
    },
  });

  return (
    <section
      className="p-8 bg-white space-y-4 rounded-xl"
      aria-labelledby="login-heading"
    >
      <Heading id="login-heading">Login</Heading>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        <Form>
          <fieldset className="mb-8 space-y-4">
            <legend className="sr-only">Login Form</legend>

            <FormInput
              name="email"
              icon={FaRegUser}
              type="text"
              placeholder="Email or Username"
            />

            <FormInput
              icon={FaShieldVirus}
              name="password"
              type="password"
              placeholder="Password"
            />
          </fieldset>

          <FormSubmit isLoading={isPending} value="Login" />
        </Form>
      </Formik>
      <GoogleLogin
        onSuccess={(tokenResponse) => {
          console.log("Google login successful:", tokenResponse);
          mutate({
            credential: tokenResponse.credential,
            email: "",
            password: "",
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      ></GoogleLogin>
      <a
        href="/register"
        className="block text-center font-bold transition-ease-in-out text-primary hover:text-secondary"
      >
        Need an account?
      </a>
    </section>
  );
}
