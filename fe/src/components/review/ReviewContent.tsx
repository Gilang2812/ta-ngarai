import Image from "next/image";
import React from "react";
import { Rating } from "../craft/Rating";
import ImgCraft from "../common/ImgCraft";
import { Button } from "flowbite-react";
import { useAuthStore } from "@/stores/AuthStore";

type Props = {
  customerName: string;
  reviewRating: number;
  reviewText: string;
  reviewDate: string;
  imgUrls: string[];
  handleResponse?: (
    craftVariantId: string,
    checkoutId: string,
    idSouvenirPlace: string,
    seller_response: string | null
  ) => void;
  craftVariantId: string;
  checkoutId: string;
  idSouvenirPlace: string;
  sellerResponse: string | null;
  response_date?: string;
};

const ReviewContent = ({
  customerName,
  reviewRating,
  reviewText,
  reviewDate = new Date().toLocaleDateString(),
  imgUrls = [],
  craftVariantId,
  checkoutId,
  idSouvenirPlace,
  sellerResponse,
  response_date,
  handleResponse,
}: Props) => {
  const date = reviewDate ? new Date(reviewDate).toLocaleDateString() : "";
  const responseDate = response_date
    ? new Date(response_date).toLocaleDateString()
    : "";
  const { user } = useAuthStore();

  return (
    <article className="p-4 relative rounded-xl border space-y-4">
      {user?.id_souvenir_place === idSouvenirPlace && handleResponse && (
        <Button
          onClick={() =>
            handleResponse?.(
              craftVariantId,
              checkoutId,
              idSouvenirPlace,
              sellerResponse
            )
          }
          className="absolute top-4 right-4 "
        >
          {sellerResponse ? "Edit Reply" : "Reply"}
        </Button>
      )}
      <section className="flex items-start gap-4 font-bold text-lg capitalize text-wrap">
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
          <div className="flex gap-4">
            {imgUrls?.map((url, index) => (
              <ImgCraft
                key={index}
                width={100}
                src={url}
                alt="Review Image"
                height={100}
                className="aspect-square object-cover rounded-lg "
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </section>
      {sellerResponse && (
        <section className="flex items-start gap-4 font-bold text-lg capitalize text-wrap">
          <Image
            alt="profile"
            width={32}
            height={32}
            src="/images/carousel-1.jpg"
            className="size-12 rounded-full "
          />
          <div className="flex-1 space-y-2">
            <p className="font-medium text-sm text-gray-900">{`Seller`}</p>
            <p className="text-sm text-gray-700 mb-2">{sellerResponse} </p>

            <p className="text-xs text-gray-400">{responseDate}</p>
          </div>
        </section>
      )}
    </article>
  );
};

export default ReviewContent;
