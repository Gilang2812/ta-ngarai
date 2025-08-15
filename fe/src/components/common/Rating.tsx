import { cn } from "@/utils/common/cn";
import React, { ComponentProps } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

type Props = ComponentProps<"div"> & {
  rating: number;
};

const Rating = ({ rating, className }: Props) => {
  return (
    <div className={cn(`flex gap-2 text-2xl text-orange-500`, className)}>
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
      )}
    </div>
  );
};

export default Rating;
