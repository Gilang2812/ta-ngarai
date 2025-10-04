"use client";
import Button from "@/components/common/Button";
import { FormInput } from "@/components/inputs/FormInput";
import useChangePassword from "@/hooks/useChangePassword";
import { changePasswordSchema } from "@/validation/authSchema";
import { Form, Formik } from "formik";

const ChangePassword = () => {
  const { handleSubmit, initialValues, isPending } = useChangePassword();
  return (
    <main className="p-5 bg-white rounded-xl">
      <header className="mb-6 text-lg capitalize">Change Password</header>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={changePasswordSchema}
        >
          <Form>
            <fieldset className="space-y-4 max-w-3xl">
              <legend className="sr-only">Change your password</legend>
              {/* Untuk aksesibilitas */}
              <FormInput
                name="newPassword"
                type="password"
                label="New Password"
                placeholder=" new password"
              />
              <FormInput
                name="confirmNewPassword"
                type="password"
                label="Confirm New Password"
                placeholder="Confirm new password"
              />
              <div className="flex justify-end items-center">
                <Button
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending}
                >
                  Submit
                </Button>
              </div>
            </fieldset>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default ChangePassword;
