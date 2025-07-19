import { ShippingItem } from "@/type/schema/CraftTransactionSchema";
import React from "react";
import Link from "next/link";
import ReviewItem from "./ReviewItem";
import ReviewContent from "./ReviewContent";
import { ReviewGallerySchema } from "@/type/schema/ReviewSchema";

type Props = {
  shippingItems: (ShippingItem & {
    reviewGalleries: ReviewGallerySchema[];
  })[];
};

const ReviewHistory = ({ shippingItems }: Props) => {
  return shippingItems.map((item, index) => (
    <section key={index} className="space-y-4 border-b-2 p-4">
      <article className="flex items-start gap-4 justify-between font-bold text-lg capitalize text-wrap">
        <ReviewItem
          imageUrl={item.detailCraft?.craftGalleries?.[0]?.url}
          craftFullName={`${item?.detailCraft?.variant?.craft?.name} ${item?.detailCraft?.variant.name}`}
          price={item?.detailCraft?.price}
          quantity={item?.jumlah}
        />
        <section>
          <Link
            href={`/web/reservation/${item.shipping_id}/rating-items`}
            className="text-orange-500 hover:underline font-normal"
          >
            Edit Review
          </Link>
        </section>
      </article>
      <ReviewContent
        customerName={item.checkout.shippingAddress.addressCustomer.fullname}
        reviewRating={item.review_rating}
        reviewText={item.review_text}
        reviewDate={item.review_date}
        imgUrls={item?.reviewGalleries?.map((img) => img.url)} 
        craftVariantId={item.craft_variant_id}
        checkoutId={item.checkout_id}
        idSouvenirPlace={item.id_souvenir_place}
        sellerResponse={item.seller_response}
        response_date={item.response_date}
      />
      {item.seller_response && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Seller Response:</p>
          <p className="text-sm text-gray-800">{item.seller_response}</p>
        </div>
      )}
    </section>
  ));
};

export default ReviewHistory;
