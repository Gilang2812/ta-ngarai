import { useFetchRatingItems } from "@/features/web/checkout/useFetchRatingItems";
import { useUpdateItemReview } from "@/features/web/checkout/useUpdateItemReview";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { ShippingItem } from "@/type/schema/CraftTransactionSchema";
import {
  ReviewFormSchema,
  ReviewGallerySchema,
} from "@/type/schema/ReviewSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useModal } from "@/utils/ModalUtils";
import { FormikProps } from "formik";
import { useRef, useState } from "react";

export const useRatingItems = (id: string) => {
  const { data, refetch, isLoading } = useFetchRatingItems(id);

  const { isOpen, toggleModal } = useModal();

  const formikRef =
    useRef<FormikProps<ReviewFormSchema | { seller_response: string }>>(null);
  const actionRef = useRef<"review" | "response">("review");

  const [selectedItemId, setSelectedItemId] = useState<{
    craft_variant_id: string;
    checkout_id: string;
    id_souvenir_place: string;
  }>();

  const initialValues = {
    review_rating: 0,
    review_text: "",
    images: [],
    craft_variant_id: "",
    checkout_id: "",
    id_souvenir_place: "",
  };

  const responseInitialValues = {
    seller_response: "",
  };

  const { mutate: updateItemReview, isPending } = useUpdateItemReview({
    onSuccess: () => {
      cornerAlert("Rating submitted successfully!");
      toggleModal();
      refetch();
    },
  });

  const handleOpenModal = (
    craft_variant_id: string,
    checkout_id: string,
    id_souvenir_place: string,
    item: ShippingItem & { reviewGalleries: ReviewGallerySchema[] }
  ) => {
    console.log("Opening modal for item:", item);
    actionRef.current = "review";
    const url = item?.reviewGalleries?.map((gallery) => gallery?.url || "");
    const images = formatImageUrls(url);
    setTimeout(() => {
      if (formikRef.current) {
        formikRef?.current?.setFieldValue("craft_variant_id", craft_variant_id);
        formikRef?.current?.setFieldValue("checkout_id", checkout_id);
        formikRef?.current?.setFieldValue(
          "id_souvenir_place",
          id_souvenir_place
        );
        formikRef?.current?.setFieldValue("review_rating", item.review_rating);
        formikRef?.current?.setFieldValue(
          "review_text",
          item?.review_text ?? ""
        );
        formikRef?.current?.setFieldValue("images", images);
      }
    }, 0);
    setSelectedItemId({ craft_variant_id, checkout_id, id_souvenir_place });

    toggleModal();
  };

  const handleCloseModal = () => {
    setSelectedItemId(undefined);
    toggleModal();
  };

  const handleSubmitRating = async (
    values: ReviewFormSchema | { seller_response: string }
  ) => {
    console.log("values", values);
    if (isPending) return;
    if (!selectedItemId && actionRef.current !== "response") {
      cornerAlert("Please select an item to rate.");
      return;
    }
    const formData = createFormData({
      ...values,
      shipping_id: id,
    });
    updateItemReview(formData);
  };

  const handleResponse = async (
    craft_variant_id: string,
    checkout_id: string,
    id_souvenir_place: string,
    seller_response: string | null
  ) => {
    actionRef.current = "response";
    setTimeout(() => {
      if (formikRef.current) {
        formikRef.current.setFieldValue("craft_variant_id", craft_variant_id);
        formikRef.current.setFieldValue("checkout_id", checkout_id);
        formikRef.current.setFieldValue("id_souvenir_place", id_souvenir_place);
        formikRef.current.setFieldValue("seller_response", seller_response);
      }
    }, 0);
    toggleModal();
  };

  return {
    data,
    isLoading,
    isOpen,
    handleOpenModal,
    handleCloseModal,
    initialValues,
    responseInitialValues,
    formikRef,
    handleSubmitRating,
    handleResponse,
    actionRef,
  };
};
