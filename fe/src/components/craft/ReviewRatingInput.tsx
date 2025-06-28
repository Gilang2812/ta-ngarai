import { type ReviewFormSchema } from "@/type/schema/ReviewSchema";
import { useFormikContext } from "formik";
import React from "react";

const ReviewRatingInput = () => {
  const { values, setFieldValue } = useFormikContext<ReviewFormSchema>();
  const rating = values.review_rating;
  const [hovered, setHovered] = React.useState<number | null>(null);
  return (
    <div className="flex gap-2 items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 cursor-pointer  ${
            hovered && i <= hovered ? "text-yellow-500" : ""
          } ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
          onClick={() => setFieldValue("review_rating", i + 1)}
          onMouseOver={() => setHovered(i)}
          onMouseOut={() => setHovered(null)}
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );
};

export default ReviewRatingInput;
