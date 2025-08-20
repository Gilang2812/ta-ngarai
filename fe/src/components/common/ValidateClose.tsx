import { useFormikContext } from "formik";
import { useEffect } from "react";

type WithOpenClose = {
  open: string;
  close: string;
};
export const ValidateClose = <T extends WithOpenClose>() => {
  const { values, setFieldValue } = useFormikContext<T>();

  // contoh validasi
  useEffect(() => {
    if (values.open > values.close) {
      setFieldValue("close", values.open);
    }
  }, [values.open, values.close, setFieldValue]);

  return null;
};
