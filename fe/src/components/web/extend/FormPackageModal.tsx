import { Modal } from "@/components/modal/Modal";
import { Formik } from "formik";
import React from "react";
import ModifyPackageForm from "./ModifyPackageForm";
import {
  detailPackageFormSchema,
  packageDayFormSchema,
} from "@/validation/package.validation";
import { detailServiceFormSchema } from "@/validation/service.validation";
import {
  DetailPackageSchema,
  PackageActivityFormSchema,
  PackageDay,
  PackageDayFormSchema,
} from "@/types/schema/PackageSchema";
import { DetailServiceFormSchema } from "@/types/schema/ServiceSchema";

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
  formType: "activity" | "day" | "update" | "service";
  getActivityInitialValues: PackageActivityFormSchema;
  dayInitialValues: PackageDayFormSchema;
  getServiceInitialValues: DetailServiceFormSchema;
  handleSubmit: (
    values:
      | PackageDayFormSchema
      | PackageActivityFormSchema
      | DetailServiceFormSchema
  ) => void;
  isPending: boolean;
  packageDays: (PackageDay & {
    detailPackages: DetailPackageSchema[];
  })[];
};

const FormPackageModal = (props: Props) => {
  const {
    isOpen,
    toggleModal,
    formType,
    getActivityInitialValues,
    dayInitialValues,
    getServiceInitialValues,
    handleSubmit,
    packageDays,
    isPending,
  } = props;

  return (
    <Modal title="Package Day" isOpen={isOpen} onClose={toggleModal}>
      <Formik
        initialValues={
          formType === "activity"
            ? getActivityInitialValues
            : formType === "day" || formType === "update"
            ? dayInitialValues
            : getServiceInitialValues
        }
        onSubmit={handleSubmit}
        validationSchema={
          formType === "day" || formType === "update"
            ? packageDayFormSchema
            : formType === "activity"
            ? detailPackageFormSchema
            : detailServiceFormSchema
        }
        enableReinitialize
      >
        <ModifyPackageForm
          packageDays={packageDays}
          isPending={isPending}
          formType={formType}
          isUpdate={!!dayInitialValues.day}
        />
      </Formik>
    </Modal>
  );
};

export default FormPackageModal;
