"use client";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import FormUpdateProfile from "@/components/web/profile/FormUpdateProfile";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Formik } from "formik";

export default function UpdateProfile() {
  const { initialValues, handleSubmit } = useUpdateProfile();
  return (
    <SingleContentWrapper className="relative mx-auto overflow-x-hidden">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Update Profile</h1>
        <Button aria-label="Edit profile information">Edit Profile</Button>
      </header>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <FormUpdateProfile />
      </Formik>
    </SingleContentWrapper>
  );
}
