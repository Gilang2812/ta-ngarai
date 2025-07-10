import React from "react";
import ImgCraft from "../common/ImgCraft";
import { formatPrice } from "@/lib/priceFormatter";

type Props = {
    imageUrl : string;
    craftFullName: string;
    price: number;
    quantity: number;
};

const ReviewItem = ({imageUrl, craftFullName, price, quantity}: Props) => {
  return (
    <div className="flex items-start gap-4 font-bold text-lg capitalize text-wrap">
      <ImgCraft
        src={imageUrl}
        alt={"craft image"}
      /> 
      <div>
        <p>
          {craftFullName}
        </p>
        <p className="text-sm font-normal">
          price : {formatPrice(price)}
        </p>
        <p className="text-sm font-normal lowercase">
          quantity : x {quantity}
        </p>
      </div>
    </div>
  );
};

export default ReviewItem;
