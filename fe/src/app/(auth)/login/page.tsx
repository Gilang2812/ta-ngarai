"use client";
import { Form, Formik } from "formik";
import { FaRegUser, FaShieldVirus } from "react-icons/fa";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import Heading from "@/components/auth/Heading";
import { FormSubmit } from "@/components/inputs/FormSubmit";
import { FormInput } from "@/components/inputs/FormInput";
import { cornerAlert, cornerError } from "@/utils/AlertUtils";
import { loginSchema } from "@/validation/authSchema";
import Button from "@/components/common/Button";
import { FaGoogle } from "react-icons/fa6";

interface LoginFormValues {
  email: string;
  password: string;
}
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Login({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const callbackUrlParam = use(searchParams).callbackUrl;
  const callbackUrl: string = Array.isArray(callbackUrlParam)
    ? callbackUrlParam[0]
    : callbackUrlParam || "/web";
  const handleCredentialsLogin = async (values: LoginFormValues) => {
    setIsPending(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        cornerError("Invalid credentials. Please try again.");
        return;
      }

      if (result?.ok) {
        cornerAlert("Login successful!");

        router.replace(callbackUrl);
      }
    } catch (error) {
      console.error("Login error:", error);
      cornerError("An error occurred during login. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  const handleGoogleLogin = async (credential: string) => {
    setIsPending(true);
    try {
      const result = await signIn("google", {
        credential,
        redirect: false,
      });

      if (result?.error) {
        console.log("error");
        cornerError("Google login failed. Please try again.");
        return;
      }

      if (result?.ok) {
        cornerAlert("Google login successful!");
        // Get the updated session
        const session = await getSession();
        console.log("Session after Google login:", session);
        router.replace("/web");
      }
    } catch (error) {
      console.error("Google login error:", error);
      cornerError("An error occurred during Google login. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section
      className="p-8 bg-white space-y-4 rounded-xl"
      aria-labelledby="login-heading"
    >
      <Heading id="login-heading">Login</Heading>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleCredentialsLogin}
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

      {/* <GoogleLogin
        onSuccess={(tokenResponse) => {
          console.log("Google login successful:", tokenResponse);
          if (tokenResponse.credential) {
            handleGoogleLogin(tokenResponse.credential);
          }
        }}
        onError={() => {
          console.log("Login Failed");
          cornerError("Google login failed. Please try again.");
        }}
      /> */}
      <Button
        onClick={() => signIn("google")}
        className="w-full text-black"
        variant={"regSecondary"}
      >
        <FaGoogle className="text-red-600" /> Login With Google
      </Button>

      <a
        href="/register"
        className="block text-center font-bold transition-ease-in-out text-primary hover:text-secondary"
      >
        Need an account?
      </a>
    </section>
  );
}
