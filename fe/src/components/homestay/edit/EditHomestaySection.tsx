"use client";
import { FormInputSkeleton } from "@/components/loading/FormInputSekelton";
import { Form, Formik } from "formik";
import { useEditHomestay } from "@/hooks/useEditHomestay";
import FormNewHomestay from "../new/FormNewHomestay";
import { DetailFacilitySection } from "./DetailFacilitySection";
import { Modal } from "@/components/modal/Modal";
import { FormInput } from "@/components/inputs/FormInput";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/common/Button";
import { createHomestaySchema } from "@/validation/homestaySchema";
import {
  createDetailFacilitySchema,
  createFacilitySchema,
} from "@/validation/facilitySchema";

export const EditHomestaySection = ({ id }: { id: string }) => {
  const {
    data,
    initialValues,
    handleSubmit,
    isPending,
    toggleModal,
    isLoading,
    formType,
    handleAddDetailFacility,
    handleAddFacility,
    handleFacilitySubmit,
    handleDeletedDetailHomestayFacility,
    isOpen,
    facilityInitialValues,
    deatailFacilityInitialValues,
    facilities,
  } = useEditHomestay(id);
  if (isLoading) {
    return (
      <div className="grid grid-cols-2  gap-8">
        <FormInputSkeleton />
        <FormInputSkeleton />
      </div>
    );
  }
  return (
    data && (
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={createHomestaySchema}
        >
          <FormNewHomestay
            isPending={isPending}
            geom={data?.geom}
            formType="edit"
            right={
              <>
                <DetailFacilitySection
                  detailsFacility={data?.details}
                  handleDeletedDetailHomestayFacility={
                    handleDeletedDetailHomestayFacility
                  }
                  toggleDetailFacility={handleAddDetailFacility}
                  toggleFacility={handleAddFacility}
                />
              </>
            }
          />
        </Formik>
        <Modal isOpen={isOpen} title="facility homestay" onClose={toggleModal}>
          <Formik
            initialValues={
              formType === "detail"
                ? deatailFacilityInitialValues
                : facilityInitialValues
            }
            onSubmit={handleFacilitySubmit}
            validationSchema={
              formType === "detail"
                ? createDetailFacilitySchema
                : createFacilitySchema
            }
          >
            <Form className="space-y-6  ">
              {formType === "detail" ? (
                <div className="space-y-4 leading-loose border-b pb-6">
                  <FormInput
                    name="facility_homestay_id"
                    type="text"
                    label="Facility"
                    placeholder="facility"
                    as="select"
                    required
                  >
                    {facilities?.map((hf, index) => (
                      <option key={index} value={hf.id}>
                        {hf.name}
                      </option>
                    ))}
                  </FormInput>
                  <FormInput
                    name="description"
                    type="text"
                    label="Description"
                    as="textarea"
                    placeholder="description"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-4 px-4 leading-loose border-b pb-6">
                  <FormInput
                    name="name"
                    type="text"
                    label="Facility Name"
                    required
                  />
                </div>
              )}

              <div className="border-t flex justify-end items-center gap-2 py-4">
                <Button type="submit">
                  <FaPlus />
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      </>
    )
  );
};
