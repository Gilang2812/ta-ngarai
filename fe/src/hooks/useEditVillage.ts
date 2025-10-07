import { ROUTES } from "@/data/routes";
import { useEditTourism } from "@/features/web/useEditTourism";
import { useFetchTourism } from "@/features/web/useFetchTourism";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { FilepondType } from "@/types/common/FilepondType";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import * as yup from "yup";

export const tourismVillageSchema = yup.object({
  id: yup.string().required("ID is required"),
  name: yup.string().required("Name is required"),
  type_of_tourism: yup.string().required("Type of tourism is required"),
  address: yup.string().required("Address is required"),
  open: yup.string().required("Open time is required"),
  close: yup.string().required("Close time is required"),
  ticket_price: yup.number().required("Ticket price is required"),
  deposit_percentage: yup
    .number()
    .required("Deposit percentage is required")
    .min(0)
    .max(100),
  contact_person: yup.string().required("Contact person is required"),
  bank_code: yup.string().required("Bank code is required"),
  bank_account_holder: yup.string().required("Bank account holder is required"),
  bank_account_number: yup.string().required("Bank account number is required"),
});

type EditVillageForm = {
  id: string;
  name: string;
  type_of_tourism: string;
  address: string;
  open: string;
  close: string;
  ticket_price: number;
  contact_person: string;
  deposit_percentage: number;
  bank_code: string;
  bank_name: string;
  bank_account: string;
  bank_account_holder: string;
  bank_account_number: string;
  qr_url: FilepondType;
  images: FilepondType;
};

export const useEditVillage = (id: string) => {
  const router = useRouter();
  const { data, isLoading, refetch } = useFetchTourism(id);
  const qr = useMemo(() => {
    if (!data?.qr_url) return [];
    return formatImageUrls([data.qr_url]);
  }, [data?.qr_url]);

  const images = useMemo(() => {
    if (!data?.galleries?.length) return [];
    const urls = data.galleries.map((gallery) => gallery.url);
    return formatImageUrls(urls);
  }, [data?.galleries]);

  const initialValues: EditVillageForm = {
    id: data?.id ?? "",
    name: data?.name ?? "",
    type_of_tourism: data?.type_of_tourism ?? "",
    address: data?.address ?? "",
    open: data?.open ?? "",
    close: data?.close ?? "",
    ticket_price: data?.ticket_price ?? ("" as unknown as number),
    deposit_percentage: data?.deposit_percentage ?? 0,
    contact_person: data?.contact_person ?? "",
    bank_code: data?.bank_code ?? "",
    bank_name: data?.bank_name ?? "",
    bank_account: data?.bank_account ?? "",
    bank_account_holder: data?.bank_account_holder ?? "",
    bank_account_number: data?.bank_account_number ?? "",
    qr_url: qr,
    images: images,
  };

  const { mutate, isPending } = useEditTourism({
    onSuccess: () => {
      cornerAlert("Village updated successfully");
      refetch();
      router.push(ROUTES.MANAGE_VILLAGE);
    },
  });

  const handleSubmit = (values: EditVillageForm) => {
    const formData = createFormData<EditVillageForm>(values);
    mutate(formData);
  };

  return {
    data,
    isLoading,
    initialValues,
    handleSubmit,
    isPending,
  };
};
