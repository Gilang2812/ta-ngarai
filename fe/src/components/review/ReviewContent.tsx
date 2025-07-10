import Image from "next/image";
import React from "react";
import { Rating } from "../craft/Rating";

type Props = {
  customerName: string;
  reviewRating: number;
  reviewText: string;
  reviewDate: string;
};

const ReviewContent = ({
  customerName,
  reviewRating,
  reviewText,
  reviewDate = new Date().toLocaleDateString(),
}: Props) => {
  const date = new Date(reviewDate).toLocaleDateString();
  return (
    <article className="p-4 rounded-xl border flex items-start gap-4 font-bold text-lg capitalize text-wrap">
      <Image
        alt="profile"
        width={32}
        height={32}
        src="/images/carousel-1.jpg"
        className="size-12 rounded-full "
      />
      <div className="flex-1 space-y-4">
        <p className="font-medium text-sm text-gray-900">{customerName}</p>
        <div>
          <Rating rating={reviewRating} showText={true} />
        </div>

        <p className="text-sm text-gray-700 mb-2">{reviewText} </p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </article>
  );
};

export default ReviewContent;
