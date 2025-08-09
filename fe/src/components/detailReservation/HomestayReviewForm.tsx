import { Form } from "formik";
import React from "react";
import ReviewRatingInput from "../craft/ReviewRatingInput";
import { FormInput } from "../inputs/FormInput";
import Button from "../common/Button";
 
type Props = {
  isPending?: boolean;
};
const HomestayReviewForm = ({ isPending }: Props) => {
  return (
    <Form className="space-y-4 leading-loose">
      <div>
        <p>Rating</p>
        <ReviewRatingInput />
      </div>
      <FormInput label="review" name="review" as="textarea" rows={4} />
      <div>
        <Button
          isLoading={isPending}
          type="submit"
          className="h-fit py-1"
          disabled={isPending}
        >
          send
        </Button>
      </div>
    </Form>
  );
};

export default HomestayReviewForm;
