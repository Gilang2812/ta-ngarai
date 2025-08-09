import { useFetchTourism } from "@/features/web/useFetchTourism";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useMemo } from "react";

export const useEditVillage = (id: string) => {
  const { data, isLoading } = useFetchTourism(id);
  const qr = useMemo(() => {
    if (!data?.qr_url) return [];
    return formatImageUrls([data.qr_url]);
  }, [data?.qr_url]);

  const images = useMemo(() => {
    if (!data?.galleries?.length) return [];
    const urls = data.galleries.map((gallery) => gallery.url);
    return formatImageUrls(urls);
  }, [data?.galleries]);

  console.log(qr)
  console.log(images)
  const initialValues = {
    id: data?.id ?? "",
    name: data?.name ?? "",
    type_of_tourism: data?.type_of_tourism ?? "",
    address: data?.address ?? "",
    open: data?.open ?? "",
    close: data?.close ?? "",
    ticket_price: data?.ticket_price ?? "",
    contact_person: data?.contact_person ?? "",
    bank_code: data?.bank_code ?? "",
    bank_name: data?.bank_name ?? "",
    bank_account: data?.bank_account ?? "",
    bank_account_holder: data?.bank_account_holder ?? "",
    qr_url: qr,
    images: images,
  };

  return {
    data,
    isLoading,
    initialValues,
  };
};
