import { FormInputProps } from "@/type/props/FormInputProps";
import { ErrorMessage, Field, useField } from "formik";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const FormInput = ({
  label,
  icon: Icon,
  type,
  name,
  placeholder,
  as,
  readonly,
  required,
  children,
  value,
}: FormInputProps) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {label && (
        <label className="font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={`flex items-center border ${
          meta.touched && meta.error
            ? "border-red-500 text-red-500"
            : "border-black"
        } transition ease-in-out ${
          readonly ? "bg-slate-200" : "focus-within:ring-4"
        } focus-within:text-primary ring-primary/30 rounded  px-4 py-1`}
      >
        {as === "select" ? (
          <Field
            {...field}
            className="font-normal w-full bg-transparent text-black focus:outline-none"
            as={as}
            type={type}
            id={name}
            value={value}
            name={name}
            placeholder={placeholder}
            readOnly={readonly}
            required={required}
          >
            <option defaultValue="">select</option>
            {children}
          </Field>
        ) : (
          <>
            {Icon && <Icon className="" />}
            <Field
              {...field}
              className="font-normal w-full bg-transparent text-black focus:outline-none"
              as={as || "input"}
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              readOnly={readonly}
              required={required}
            />
            {meta.touched && meta.error && (
              <HiOutlineExclamationCircle className="text-red-500 text-lg" />
            )}
          </>
        )}
      </div>

      <ErrorMessage
        component="p"
        className="text-red-500 font-bold text-sm"
        name={name}
      />
    </div>
  );
};
