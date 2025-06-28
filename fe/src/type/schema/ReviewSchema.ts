import * as yup from 'yup';

export const reviewFormSchema = yup.object().shape({
  review_rating: yup.number().min(1).max(5).required(),
  review_text: yup.string().min(10).max(500).required(),
});

export type ReviewFormSchema = yup.InferType<typeof reviewFormSchema>;