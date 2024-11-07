import { ErrorMessage, Field, useField } from "formik";
import { IconType } from "react-icons";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface FormInputProps {
  label?: string;
  icon?: IconType;
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
}

export const FormInput = ({
  label,
  icon: Icon,
  type,
  name,
  value,
  placeholder,
}: FormInputProps) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {label && (<label className="font-bold" htmlFor={name}>{label}</label>)}
      <div
        className={`flex items-center border ${
          meta.touched && meta.error
            ? "border-red-500 text-red-500"
            : "border-black"
        } transition ease-in-out focus-within:ring-4  focus-within:text-primary ring-secondary/10 rounded-lg px-3 py-1`}
      >
        {Icon && <Icon className="" />}
        <Field
          {...field}
          className="ml-3 w-full bg-transparent text-black focus:outline-none"
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
        />
        {meta.touched && meta.error && (
          <HiOutlineExclamationCircle className="text-red-500 text-lg" />
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
