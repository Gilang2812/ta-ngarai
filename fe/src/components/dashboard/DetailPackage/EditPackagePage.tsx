"use client";
import Button from "@/components/common/Button";
import { EqualsContentChildren } from "@/components/common/EqualsContentChildren";
import FilePondComponent from "@/components/common/Filepond";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { FormInput } from "@/components/inputs/FormInput";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import DetailPackageSection from "@/components/web/extend/DetailPackageSection";
import FormPackageModal from "@/components/web/extend/FormPackageModal";
import PackageServiceSection from "@/components/web/extend/PackageServiceSection";
import { Itinerary } from "@/components/web/package/moreInfoPackage/Itinerary";
import { useEditPackage } from "@/hooks/useEditPackage";
import { Form, Formik } from "formik";
import React from "react";

type Props = { id: string };

const EditPackagePage = ({ id }: Props) => {
  const {
    data,
    isLoading,
    initialValues,
    types,
    handleUpdatePackage,
    isOpen,
    toggleModal,
    formType,
    dayInitialValues,
    getActivityInitialValues,
    getServiceInitialValues,
    isPending,
    updatingPackage,
    handleAddActivity,
    handleAddDay,
    handleEditDay,
    handleAddService,
    handleDeleteDay,
    handleDeleteActivity,
    handleDeleteService,
    handleSubmit,
  } = useEditPackage(id);

  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    data && (
      <>
        <EqualsContentChildren>
          <SingleContentWrapper>
            <header className="text-center mb-4">
              <h2>Package</h2>
            </header>
            <Formik
              initialValues={initialValues}
              onSubmit={handleUpdatePackage}
              enableReinitialize
            >
              <Form className="leading-loose space-y-2">
                <FormInput type="text" name="name" label="Package Name" />
                <FormInput as="select" name="type_id" label="Package Type">
                  {types?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_name}
                    </option>
                  ))}
                </FormInput>

                <FormInput type="number" readonly name="price" label="Price" />

                <FormInput
                  type="number"
                  name="min_capacity"
                  label="Minimal Capacity"
                />
                <FormInput
                  type="number"
                  name="contact_person"
                  label="Contact Person"
                />
                <FormInput
                  type="text"
                  as="textarea"
                  rows={4}
                  name="description"
                  label="Description"
                />
                <FilePondComponent />
                <FilePondComponent
                  acceptedFileTypes={["video/*"]}
                  name="video_url"
                  label="Video"
                  allowMultiple={false}
                />
                <Button isLoading={updatingPackage} disabled={updatingPackage}>
                  Save Change
                </Button>
              </Form>
            </Formik>
          </SingleContentWrapper>
        </EqualsContentChildren>
        <EqualsContentChildren className="space-y-8">
          <SingleContentWrapper>
            <header className="space-y-2">
              <h3 className="text-lg font-semibold">Google Map</h3>
            </header>
            <Itinerary data={data} />
          </SingleContentWrapper>
          <DetailPackageSection
            handleAddActivity={handleAddActivity}
            handleAddDay={handleAddDay}
            handleDeleteActivity={handleDeleteActivity}
            handleDeleteDay={handleDeleteDay}
            handleEditDay={handleEditDay}
            packageDays={data?.packageDays}
            isManage
          />
          <PackageServiceSection
            isManage
            detailServices={data?.detailServices}
            handleAddService={handleAddService}
            handleDeleteService={handleDeleteService}
          />
        </EqualsContentChildren>
        <FormPackageModal
          dayInitialValues={dayInitialValues}
          formType={formType}
          getActivityInitialValues={getActivityInitialValues}
          getServiceInitialValues={getServiceInitialValues}
          handleSubmit={handleSubmit}
          isOpen={isOpen}
          isPending={isPending}
          packageDays={data?.packageDays}
          toggleModal={toggleModal}
        />
      </>
    )
  );
};

export default EditPackagePage;
