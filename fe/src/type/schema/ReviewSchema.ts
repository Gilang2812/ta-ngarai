import * as yup from "yup";

export const reviewFormSchema = yup.object().shape({
  review_rating: yup.number().min(0).max(5).required(),
  review_text: yup.string().max(500),
});

export type ReviewFormSchema = yup.InferType<typeof reviewFormSchema> & {
  craft_variant_id?: string;
  checkout_id?: string;
  images: { source: string; option: { type: string } }[] | string[];
};

export type ReviewGallerySchema = {
  craft_id: string;
  id: string;
  checkout_id: string;
  url: string;
};
