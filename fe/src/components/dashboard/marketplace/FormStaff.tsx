import Button from "@/components/common/Button";
import { FormInput } from "@/components/inputs/FormInput";
import { Form } from "formik";
import React from "react";

const FormStaff = ({
  souvenirPlace,
  isPending,
}: {
  souvenirPlace: {
    id: string;
    name: string;
  }[];
  isPending: boolean;
}) => {
  return (
    <Form className="leading-loose p-6 space-y-4">
      <FormInput as="select" name="id_souvenir_place" label="Souvenir Place">
        {souvenirPlace.map((place) => (
          <option key={place.id} value={place.id}>
            {place.name}
          </option>
        ))}
      </FormInput>
      <FormInput
        type="text"
        name="user"
        placeholder="email or username"
        label="Email or Username"
      />
      <Button disabled={isPending} type="submit" isLoading={isPending}>
        Recrut
      </Button>
    </Form>
  );
};

export default FormStaff;
