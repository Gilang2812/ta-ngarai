import Button from "@/components/common/Button";
import { FormInput } from "@/components/inputs/FormInput";
import { ROUTES } from "@/data/routes";
import { Form, useFormikContext } from "formik";
import Link from "next/dist/client/link";
import Image from "next/image";
import React from "react";

const FormUpdateProfile = () => {
  const { setFieldValue } = useFormikContext();
  return (
    <Form>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-labelledby="profile-info">
          <h2 id="profile-info" className="sr-only">
            Profile Information
          </h2>

          <div className="space-y-8">
            <FormInput name="fullname" label="Fullname" />
            <FormInput name="username" label="Username" type="text" readonly/>
            <FormInput name="email" label="Email" type="email" readonly/>
            <FormInput
              name="phone"
              label="Phone"
              type="tel"
              pattern="[0-9]{10,15}"
              inputMode="numeric"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const onlyNumbers = e.target.value.replace(/[^0-9+]/g, "");
                setFieldValue("phone", onlyNumbers);
              }}
            />
            <div className="flex items-center gap-4">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant={"secondary"} asChild>
                <Link href={ROUTES.PROFILE}>Cancel</Link>
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="profile-picture">
          <h2 id="profile-picture" className="text-sm font-semibold mb-6">
            Profile Picture
          </h2>

          <div className="flex justify-center">
            <div className="relative">
              <div className="size-52 rounded-full   flex items-center justify-center shadow-lg">
                <Image
                  src="/images/default.jpg"
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-full w-full object-cover"
                />
              </div>

              <label
                className="absolute bottom-2 right-2 bg-white hover:bg-gray-50 p-2 rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Change profile picture"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </label>
            </div>
          </div>
        </section>
      </div>
    </Form>
  );
};

export default FormUpdateProfile;
