import { cn } from "@/utils/common/cn";
import { handleAllowedInput } from "@/utils/regex";
import { ErrorMessage, Field, useField } from "formik";
import { ChangeEvent } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const FormInput = ({
  label,
  icon: Icon,
  id,
  name,
  as,
  readonly = false,
  children,
  ...props
}: React.ComponentProps<typeof Field>) => {
  const [field, meta] = useField(name); 

  return (
    <div className="grow">
      {label && (
        <label className="font-bold text-nowrap capitalize" htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={cn(
          `flex items-center border ${
            meta.touched && meta.error
              ? "border-red-500 text-red-500"
              : "border-black"
          } transition ease-in-out ${
            readonly ? "bg-slate-200" : "focus-within:ring-4"
          } focus-within:text-primary ring-primary/30 rounded  px-4 py-1`
        )}
      >
        {as === "select" ? (
          <Field
            {...field}
            className="font-normal [&_option]:px-1 w-full !border-none focus:!ring-0 focus:!border-none !p-0 bg-transparent text-black focus:!outline-none"
            id={id || name}
            as={as}
            readOnly={readonly}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               handleAllowedInput(e, field.onChange);
            }}
            {...props}
          >
            <option value="">select</option>
            {children}
          </Field>
        ) : (
          <>
            {Icon && <Icon className="" />}
            <Field
              {...field}
              className="font-normal !appearance-none !border-none !p-0 w-full bg-transparent focus:!border-none focus:!ring-0 text-black focus:!outline-none"
              id={id || name}
              as={as || "input"}
              readOnly={readonly}
              {...props}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // Hanya izinkan huruf, angka, dan spasi 
                handleAllowedInput(e, field.onChange);
              }}
            />
            {meta.touched && meta.error && (
              <HiOutlineExclamationCircle className="text-red-600 text-lg" />
            )}
          </>
        )}
      </div>

      <ErrorMessage
        component="p"
        className="text-red-600 font-bold text-sm"
        name={name}
      />
    </div>
  );
};
