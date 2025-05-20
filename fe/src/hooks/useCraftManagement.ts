import { type CraftVariant, type Craft } from "@/type/schema/CraftSchema";
import { useModal } from "@/utils/ModalUtils";
import { useCallback, useMemo, useState } from "react";

export const useCrafManagement = () => {
  const [isFormCraft, setFormType] = useState<boolean>(true);
  const { isOpen, toggleModal } = useModal();
  const getDefaultCraft = (): Craft => ({
    id: "",
    name: "",
  });

  const getDefaultVariant = (): CraftVariant => ({
    id: "",
    id_craft: "",
    name: "",
    price: 0,
    modal: 0,
    stock: 0,
    description: "",
  });

  const initialValues = useMemo(() => {
    return isFormCraft ? getDefaultCraft() : getDefaultVariant();
  }, [isFormCraft]);

  const handleCraftForm = useCallback(() => {
    toggleModal();
    setFormType(true);
  }, [toggleModal]);
  const handleVariantForm = useCallback(() => {
    toggleModal();
    setFormType(false);
  }, [toggleModal]);

  const handleSubmit = (values: Craft | CraftVariant) => {
    console.log(values);
  };
  return {
    isOpen,
    toggleModal,
    handleCraftForm,
    handleVariantForm,
    isFormCraft,
    initialValues,
    handleSubmit,
  };
};
