"use client";
import { useRatingItems } from "@/hooks/useRatingItems";
import React from "react";
import Button from "../common/Button";
import { Modal } from "../modal/Modal";
import { Form, Formik } from "formik";
import { FormInput } from "../inputs/FormInput";
import ReviewRatingInput from "../craft/ReviewRatingInput";
import FilePondComponent from "../common/Filepond";
import ReviewTransactionSkeleton from "../loading/ReviewTransactionSkeleton";
import { reviewFormSchema } from "@/type/schema/ReviewSchema";
import ReviewItem from "./ReviewItem";
import ReviewContent from "./ReviewContent";

type Props = {
  id: string;
};

const ReviewItemCard = ({ id }: Props) => {
  const {
    data,
    isOpen,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    handleSubmitRating,
    formikRef,
  } = useRatingItems(id);

  if (isLoading) return <ReviewTransactionSkeleton />;

  return (
    <>
      {data &&
        data.shippingItems.map((item, index) => (
          <section
            key={index}
            className="space-y-4 p-4 rounded-xl border items-center"
          >
            <article className="flex justify-between gap-8 ">
              <ReviewItem
                imageUrl={item.craftVariant?.craftGalleries?.[0]?.url}
                craftFullName={`${item?.craftVariant?.craft?.name} ${item?.craftVariant?.name}`}
                price={item?.craftVariant?.price}
                quantity={item?.jumlah}
              />
              <section>
                <Button
                  onClick={() =>
                    handleOpenModal(
                      item.craft_variant_id,
                      item.checkout_id,
                      item
                    )
                  }
                  className="h-fit"
                >
                  {item.review_rating ? "Edit Rate" : "Rate Now"}
                </Button>
              </section>
            </article>
            <ReviewContent
              customerName={
                item.checkout.shippingAddress.addressCustomer.fullname
              }
              reviewRating={item.review_rating}
              reviewText={item.review_text}
              reviewDate={item.review_date}
            />
          </section>
        ))}
      <Modal
        title="Rate Your Experience"
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <Formik
          innerRef={formikRef}
          initialValues={{ review_rating: 0, review_text: "", images: [] }}
          onSubmit={handleSubmitRating}
          validationSchema={reviewFormSchema}
        >
          <Form className="space-y-4">
            <div>
              <label> Rating</label>
              <ReviewRatingInput />
            </div>
            <FormInput as="textarea" rows={4} name="review_text" type="text" />
            <FilePondComponent />
            <Button type="submit">submit</Button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default ReviewItemCard;
