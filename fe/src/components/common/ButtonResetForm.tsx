import React, { ComponentProps, MouseEvent } from "react";
import Button from "./Button";
import { useFormikContext } from "formik";

const ButtonResetForm = ({
  children,
  onClick,
  ...props
}: ComponentProps<typeof Button>) => {
  const { resetForm } = useFormikContext();
  return (
    <Button
      {...props}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        resetForm();
      }}
      type="button"
    >
      {children}
    </Button>
  );
};

export default ButtonResetForm;
