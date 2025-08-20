import { useFormikContext } from "formik";
import { useEffect } from "react";

export const CheckError = () => {
  const { errors, values } = useFormikContext();
  useEffect(() => {
    if (errors || values) {
      console.error("Form errors:", errors);
      console.log(values);
    }
    console.log("Form values:", values);
  }, [errors, values]);
  return null;
};
