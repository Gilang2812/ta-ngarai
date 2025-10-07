import { useUpdateReservation } from "@/features/reservation/useUpdateReservation";
import { formatPrice } from "./../lib/priceFormatter";
import { useGetReservationReview } from "@/features/web/detailReservation/useGetReservationReview";
import { useUpdateDetailReservation } from "@/features/web/detailReservation/useUpdateDetailResevation";
import {
  HomestayReviewFormSchema,
  PackageReviewFormSchema,
} from "@/types/schema/ReservationSchema";
import { cornerAlert } from "@/utils/AlertUtils";

export const useDetailReservationReview = (id: string) => {
  const { data, isLoading, refetch } = useGetReservationReview(id);

  const packageInitialValues = {
    id: id,
    review: "",
    review_rating: 0,
  };

  const packageData = data?.package
    ? [
        {
          label: "Package name",
          value: data?.package?.name,
        },
        {
          label: "type",
          value: data?.package?.type.type_name,
        },
        {
          label: "price",
          value: formatPrice(data?.package?.price) || 0,
        },
        {
          label: "Description",
          value: data?.package?.description,
        },
      ]
    : [];

  const { mutate: updateDetailReservation, isPending: isUpdatingDetail } =
    useUpdateDetailReservation({
      onSuccess: () => {
        cornerAlert("Homestay Review successfully updated");
        refetch();
      },
    });

  const { mutate: updateReservation, isPending: isUpdatingReservation } =
    useUpdateReservation<PackageReviewFormSchema>({
      onSuccess: () => {
        cornerAlert("Package Review updated successfully");
        refetch();
      },
    });

  const handleSubmitPackage = (values: typeof packageInitialValues) => {
    const body = {
      id: id,
      review: values.review,
      review_rating: values.review_rating,
    }; 
    updateReservation(body);
  };
  const handleSubmitHomestay = (values: HomestayReviewFormSchema) => {
    updateDetailReservation(values);
  };

  return {
    data,
    packageInitialValues,
    isLoading,
    handleSubmitPackage,
    handleSubmitHomestay,
    packageData,
    isUpdatingDetail,
    isUpdatingReservation,
  };
};
