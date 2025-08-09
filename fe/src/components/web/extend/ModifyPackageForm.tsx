import React from "react";
import { ErrorMessage, Form } from "formik";
import { FormInput } from "@/components/inputs/FormInput";
import { FaSave } from "react-icons/fa";
import Button from "@/components/common/Button";
import { PackageDay } from "@/type/schema/PackageSchema";
import { FaPlus } from "react-icons/fa6";
import useModifyPackageForm from "@/hooks/useModifyPackageForm"; 
import { activityTypes } from "@/data/activity";

type Props = {
  formType: "day" | "update" | "activity" | "service";
 
  isUpdate: boolean;
  packageDays: PackageDay[];
  isPending: boolean;
};

const ModifyPackageForm = ({
  formType,
  isUpdate, 
  packageDays,
  isPending,
}: Props) => {
  const { data, serviceData } = useModifyPackageForm();

  return (
    <Form className="space-y-3">
      {formType === "day" || formType === "update" ? (
        <section className="p-4 space-y-3 border-b">
          <div className="flex gap-4">
            <FormInput
              readonly
              type="text"
              name="package_id"
              label="Package "
            />
            <FormInput type="number" name="day" label="day" />
          </div>
          <FormInput type="text" name="description" label="description" />
        </section>
      ) : formType === "activity" ? (
        <section className="p-4 space-y-3 border-b">
          <ErrorMessage
            name="object_id"
            component="div"
            className="text-red-500"
          />
          <FormInput as="select" type="text" name="day" label="Activity Day ">
            {packageDays?.map((day) => (
              <option key={day.day} value={day.day}>
                Day {day.day}
              </option>
            ))}
          </FormInput>
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-2">
              <FormInput type="number" name="activity" label="Activity " />
            </div>
            <div className="col-span-3">
              <FormInput
                as="select"
                type="text"
                name="activity_type"
                label="activity type "
              >
                {activityTypes.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </FormInput>
            </div>
            <div className="col-span-3">
              <FormInput
                as="select"
                type="number"
                name="object_id"
                label="Object"
              >
                {data?.map((object) => (
                  <option key={object.id} value={object.id}>
                    {object.name}
                  </option>
                ))}
              </FormInput>
            </div>
          </div>
          <FormInput type="text" name="description" label="description" />
        </section>
      ) : (
        <FormInput
          type="text"
          as="select"
          name="service_package_id"
          label="Service Name"
        >
          {serviceData?.map((service, index) => (
            <option key={`${service.id}-${index}`} value={service.id}>
              {`${service.name} - ${
                service.category === 1 ? "Group" : "Individu"
              } - ${service.price}`}
            </option>
          ))}
        </FormInput>
      )}
      <div className="flex justify-end">
        <Button
          disabled={isPending}
          isLoading={isPending}
          type="submit"
          variant={"primary"}
        >
          {!isUpdate ? (
            <FaPlus />
          ) : (
            <>
              <FaSave /> Save
            </>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default ModifyPackageForm;
