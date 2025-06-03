import { Field, useFormikContext } from "formik";
import { CraftCartForm } from "@/type/schema/CraftCartSchema";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  min = 1,
  max = 999,
}) => {
  const { setFieldValue, values } = useFormikContext<CraftCartForm>();
  const onDecrease = () => {
    if (values.jumlah > min) {
      setFieldValue("jumlah", values.jumlah - 1);
    }
  };

  const onIncrease = () => {
    if (values.jumlah < max) {
      setFieldValue("jumlah", values.jumlah + 1);
    }
  };
  return (
    <div className="flex items-center">
      <button
      type="button"
        onClick={onDecrease}
        disabled={values.jumlah <= min}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaMinus />
      </button>

      <Field
        type="text"
        name="jumlah"
        className="w-16 h-10 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={onIncrease}
        disabled={values.jumlah >= max}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaPlus />
      </button>
    </div>
  );
};
