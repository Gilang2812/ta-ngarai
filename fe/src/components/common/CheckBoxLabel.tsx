import React, { memo } from "react";
import { CheckBoxInput } from "./CheckBoxInput";

type Props = {
  id: string;
  label:  React.ReactNode;
} & React.ComponentProps<"input">;

const CheckBoxLabelComponent = ({ id, label, ...props }: Props) => {
  return (
    <div className="space-x-1 ">
      <CheckBoxInput className="border-2 border-slate-300 " id={id} {...props} />
      <label htmlFor={id}> {label}</label>
    </div>
  );
};

CheckBoxLabelComponent.displayName = "CheckBoxLabel";

export const CheckBoxLabel = memo(CheckBoxLabelComponent)
