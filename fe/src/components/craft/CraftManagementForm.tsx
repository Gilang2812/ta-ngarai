import React, { useEffect } from "react";
import { FormInput } from "../inputs/FormInput";
import FilePondComponent from "../common/Filepond";
import { CraftResponse } from "@/type/schema/CraftSchema";
import { useFormikContext } from "formik";
import { DetailCraftSchema } from "@/type/schema/DetailCraftSchema";

type Props = {
  formType: "craft" | "variant" | "detail";
  crafts: CraftResponse[];
};

const CraftManagementForm = ({ formType, crafts }: Props) => {
  const { values, errors } = useFormikContext<
    DetailCraftSchema & { id_craft: string }
  >();

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);
  const variants = crafts.find(
    (craft) => craft.id === values.id_craft
  )?.variants;
  switch (formType) {
    case "craft":
      return (
        <>
          <FormInput type="text" label="name" name="name" />
        </>
      );
    case "variant":
      return (
        <>
          <FormInput label="craft" name="id_craft" as="select">
            {crafts?.map((craft) => (
              <option key={craft.id} value={craft.id}>
                {craft.name}
              </option>
            ))}
          </FormInput>
          <FormInput type="text" label="names" name="name" />
        </>
      );
    case "detail":
      return (
        <>
          <FormInput label="craft " name="id_craft" as="select">
            {crafts?.map((craft) => (
              <option key={craft.id} value={craft.id}>
                {craft.name}
              </option>
            ))}
          </FormInput>
          <FormInput label="craft variant" name="craft_variant_id" as="select">
            {variants?.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
              </option>
            ))}
          </FormInput>
          <FormInput type="number" label="price" name="price" />
          <FormInput type="number" label="weight (gram)" name="weight" />
          <FormInput type="number" label="modal" name="modal" />
          <FormInput type="number" label="stock" name="stock" />
          <FormInput
            type="text"
            rows="4"
            as="textarea"
            label="description"
            name="description"
          />
          <FilePondComponent />
        </>
      );
  }
};

export default CraftManagementForm;
