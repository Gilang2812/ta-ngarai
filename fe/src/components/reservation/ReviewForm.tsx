import { ShippingData } from "@/types/schema/CraftTransactionSchema";
import React from "react";

type Props = {
  shippingData: ShippingData;
};

const ReviewForm = ({ shippingData }: Props) => {
  return (
    <section>
      {shippingData.shippingItems.map((item, index) => (
        <div key={index}></div>
      ))}
    </section>
  );
};

export default ReviewForm;
