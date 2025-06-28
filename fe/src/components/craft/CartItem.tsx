import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/priceFormatter";
import { QuantitySelector } from "./QuantitySelector";
import { Form, Formik, useFormikContext } from "formik";
import {
  CraftCartForm,
  CraftCartSchema,
  type CartItemProps,
} from "@/type/schema/CraftCartSchema";
import ImgCraft from "../common/ImgCraft";
import { CheckBoxInput } from "../common/CheckBoxInput";
import { hideLoadingAlert, showLoadingAlert } from "@/utils/AlertUtils";

type Props = {
  item: CartItemProps;
  updateCart: (values: CraftCartForm) => void;
  isUpdating?: boolean;
  setDirty: Dispatch<SetStateAction<boolean>>;
  handleDeleteCart: (idVariant: string, name: string) => void;
  handleCheckedCraft: (craft: CraftCartSchema) => void;
  selectedCraft: CraftCartForm[];
};

export const CartItemComponent = ({
  item,
  updateCart,
  isUpdating,
  setDirty,
  handleDeleteCart,
  handleCheckedCraft,
  selectedCraft,
}: Props) => {
  const AutoSubmitOnChange = () => {
    const { values, submitForm, setFieldValue } =
      useFormikContext<CraftCartForm>();
    const prevJumlah = useRef(values.jumlah);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isDirty = prevJumlah.current !== values.jumlah;
    useEffect(() => {
      if (prevJumlah.current !== values.jumlah) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          submitForm();
        }, 1000);
      }
      // submitForm();
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [values.jumlah, submitForm]);
    useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (isDirty || isUpdating) {
          setDirty(true);
          e.preventDefault();
          e.returnValue = ""; // For some browsers
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [isDirty]);

    useEffect(() => {
      setFieldValue("jumlah", item.jumlah);
    }, [setFieldValue]);

    return null;
  };

  
  const handleSubmit = (values: CraftCartForm) => {
    updateCart(values);
  };

  return (
    <tr className="  py-4 border-b border-gray-200">
      <td>
        <CheckBoxInput
          name={`cartItems.${item.craft_variant_id}`}
          onChange={() =>
            handleCheckedCraft({
              craft_variant_id: item.craft_variant_id,
              jumlah: item.jumlah,
              price: item.cartCraft.price,
            })
          }
          checked={selectedCraft.some(
            (itemChecked) =>
              itemChecked.craft_variant_id.toLowerCase() ===
              item.craft_variant_id.toLowerCase()
          )}
        />
      </td>
      <td className="flex items-center">
        <div className="flex-shrink-0 w-16 h-16 mr-4 relative overflow-hidden rounded">
          <ImgCraft
            src={item.cartCraft.craftGalleries?.[0].url}
            alt={item.cartCraft.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="font-bold align-middle text-gray-800">
          {item.cartCraft.craft.name} {item.cartCraft.name}
        </p>
      </td>

      <td className="mx-4">
        <p className="text-gray-600">{formatPrice(item.cartCraft.price)}</p>
      </td>

      <td className="">
        <Formik
          initialValues={{
            craft_variant_id: item.craft_variant_id,
            jumlah: item.jumlah,
            price: item.cartCraft.price,
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <AutoSubmitOnChange />
            <QuantitySelector />
          </Form>
        </Formik>
      </td>
      <td className="w-24 text-center">
        <span className="font-medium text-nowrap">
          {formatPrice(item.cartCraft.price * item.jumlah)}
        </span>
      </td>
      <td>
        <button
          onClick={() =>
            handleDeleteCart(
              item.craft_variant_id,
              `${item.cartCraft.craft.name} ${item.cartCraft.name}`
            )
          }
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};
