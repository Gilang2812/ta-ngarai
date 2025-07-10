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
  const formikRef = useRef<FormikProps<ReviewFormSchema>>(null);

  const [selectedItemId, setSelectedItemId] = useState<{
    craft_variant_id: string;
    checkout_id: string;
  }>();

  const initialValues = {
    review_rating: 0,
    craft_variant_id: "",
    checkout_id: "",
    review_text: "",
    images: [],
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
    item: ShippingItem & { reviewGalleries: ReviewGallerySchema[] }
  ) => {
    console.log("Opening modal for item:", item);

    const url = item?.reviewGalleries?.map((gallery) => gallery?.url || "");
    const images = formatImageUrls(url);
    setTimeout(() => {
      if (formikRef.current) {
        formikRef?.current?.setFieldValue("craft_variant_id", craft_variant_id);
        formikRef?.current?.setFieldValue("checkout_id", checkout_id);
        formikRef?.current?.setFieldValue("review_rating", item.review_rating);
        formikRef?.current?.setFieldValue(
          "review_text",
          item?.review_text ?? ""
        );
        formikRef?.current?.setFieldValue("images", images);
      }
    }, 0);
    setSelectedItemId({ craft_variant_id, checkout_id });

    toggleModal();
  };

  const handleCloseModal = () => {
    setSelectedItemId(undefined);
    toggleModal();
  };

  const handleSubmitRating = async (values: ReviewFormSchema) => {
    if (isPending) return;
    if (!selectedItemId) {
      cornerAlert("Please select an item to rate.");
      return;
    }
    const formData = createFormData({
      ...values,
      craft_variant_id: selectedItemId.craft_variant_id,
      checkout_id: selectedItemId.checkout_id,
    });
    updateItemReview(formData);
  };
  return {
    data,
    isLoading,
    isOpen,
    handleOpenModal,
    handleCloseModal,
    initialValues,
    formikRef,
    handleSubmitRating,
  };
};
