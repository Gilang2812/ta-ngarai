"use client";
import { Form, Formik } from "formik";
import Heading from "@/components/auth/Heading";
import { FormInput } from "@/components/inputs/FormInput";
import { FormSubmit } from "@/components/inputs/FormSubmit";
import { registerSchema } from "@/validation/authSchema";
import { useRegister } from "@/features/auth/useRegister";
import { cornerAlert } from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/data/routes";

// Define schema with Yup for validation

export default function Register() {
  const router = useRouter();
  const { mutate, isPending } = useRegister({
    onSuccess: () => {
      cornerAlert("Registration successful!");
      router.push("/login");
    },
  });

  return (
    <section
      className="p-8 bg-white rounded-xl"
      aria-labelledby="register-heading"
    >
      <Heading id="register-heading">Register</Heading>

      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        <Form>
          <fieldset className="mb-8 space-y-4">
            <legend className="sr-only">Register Form</legend>

            <FormInput type="email" name="email" placeholder="Email" />
            <small className="text-gray-500">
              We&apos;ll never share your email with anyone else
            </small>

            <FormInput type="text" name="username" placeholder="Username" />

            <FormInput type="password" name="password" placeholder="Password" />
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </fieldset>

          <FormSubmit value="Register" isLoading={isPending} />

          <Link
            href={ROUTES.LOGIN}
            className="block mt-4 text-center text-primary hover:text-secondary transition-ease-in-out"
          >
            <strong>Already have an account? Login</strong>
          </Link>
        </Form>
      </Formik>
    </section>
  );
}
