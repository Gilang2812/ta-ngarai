"use client";
import { useRatingItems } from "@/hooks/useRatingItems";
import React from "react";
import ImgCraft from "../common/ImgCraft";
import Button from "../common/Button";
import { formatPrice } from "@/lib/priceFormatter";
import { Modal } from "../modal/Modal";
import { Form, Formik } from "formik";
import { FormInput } from "../inputs/FormInput";
import ReviewRatingInput from "../craft/ReviewRatingInput";
import FilePondComponent from "../common/Filepond";
import ReviewTransactionSkeleton from "../loading/ReviewTransactionSkeleton";

type Props = {
  id: string;
};

const ReviewItems = ({ id }: Props) => {
  const {
    data,
    isOpen,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    handleSubmitRating,
  } = useRatingItems(id);
  if (isLoading) return <ReviewTransactionSkeleton />;
  return (
    data &&
    data.shippingItems.map((item, index) => (
      <article
        className="flex justify-between gap-8 p-4 rounded-xl border items-center"
        key={index}
      >
        <div className="flex items-start gap-4 font-bold text-lg capitalize text-wrap">
          <ImgCraft
            src={item.craftVariant?.craftGalleries?.[0]?.url}
            alt={"craft image"}
          />
          <div>
            <p>
              {item.craftVariant.craft.name} {item.craftVariant?.name}
            </p>
            <p className="text-sm font-normal">
              price : {formatPrice(item.craftVariant?.price)}
            </p>
            <p className="text-sm font-normal lowercase">
              quantity : x {item.jumlah}
            </p>
          </div>
        </div>
        <div>
          <Button
            onClick={() =>
              handleOpenModal(item.craft_variant_id, item.checkout_id)
            }
            className="h-fit"
          >
            Rate Now
          </Button>
        </div>
        <Modal
          title="Rate Your Experience"
          isOpen={isOpen}
          onClose={handleCloseModal}
        >
          <Formik
            initialValues={{ review_rating: 0, review_text: "" }}
            onSubmit={handleSubmitRating}
          >
            <Form className="space-y-4">
              <div>
                <label> Rating</label>
                <ReviewRatingInput />
              </div>
              <FormInput
                as="textarea"
                rows={4}
                name="review_text"
                type="text"
              />
              <FilePondComponent />
              <Button  type="submit">Submit</Button>
            </Form>
          </Formik>
        </Modal>
      </article>
    ))
  );
};

export default ReviewItems;
