"use client";

import Button from "@/components/common/Button"; 
import { ContentWrapper } from "@/components/common/ContentWrapper";
import { EqualsContentChildren } from "@/components/common/EqualsContentChildren";
import FilePondComponent from "@/components/common/Filepond";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { FormInput } from "@/components/inputs/FormInput";
import { useNewPackage } from "@/hooks/useNewPackage";
import { editPackageFormSchema } from "@/validation/package.validation";
import { Form, Formik } from "formik";

const NewPackage = () => {
  const { isPending, types, initialValues, handleSubmit } = useNewPackage();

  return (
    <ContentWrapper>
      <EqualsContentChildren>
        <SingleContentWrapper>
          <header className="text-center pb-4">
            <h2>New Package</h2>
          </header>
          <section>
            <Formik
              initialValues={initialValues}
              validationSchema={editPackageFormSchema}
              onSubmit={handleSubmit}
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
                <Button
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending}
                >
                  Save
                </Button>
              </Form>
            </Formik>
          </section>
        </SingleContentWrapper>
      </EqualsContentChildren>
    </ContentWrapper>
  );
};

export default NewPackage;
