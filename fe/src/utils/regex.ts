export const allowedCharsRegex = /^[a-zA-Z0-9\s+'.,/&()\-@:]*$/;

import { ChangeEvent } from "react";

export const handleAllowedInput = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
) => {
  const value = e.target.value;
  if (allowedCharsRegex.test(value)) {
    onChange(e);
  }
};
