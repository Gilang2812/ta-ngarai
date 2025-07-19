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
    responseInitialValues,
    actionRef,
    handleResponse,
    initialValues,
  } = useRatingItems(id);

  if (isLoading) return <ReviewTransactionSkeleton />;

  return (
    <>
      {data &&
        data.shippingItems.map((item, index) => (
          <section
            key={index}
            className="relative space-y-4 p-4 rounded-xl border border-gray-200"
          >
            <article className="flex justify-between gap-8 ">
              <ReviewItem
                imageUrl={item.detailCraft?.craftGalleries?.[0]?.url}
                craftFullName={`${item?.detailCraft?.variant?.craft?.name} ${item?.detailCraft?.variant?.name}`}
                price={item?.detailCraft?.price}
                quantity={item?.jumlah}
              />
              <section>
                <Button
                  onClick={() =>
                    handleOpenModal(
                      item.craft_variant_id,
                      item.checkout_id,
                      item.id_souvenir_place,
                      item
                    )
                  }
                  className="h-fit"
                >
                  {item.review_rating ? "Edit Rate" : "Rate Now"}
                </Button>
              </section>
            </article>
            {item.review_rating && (
              <ReviewContent
                customerName={
                  item.checkout.shippingAddress.addressCustomer.fullname
                }
                reviewRating={item.review_rating}
                reviewText={item.review_text}
                reviewDate={item.review_date}
                imgUrls={item.reviewGalleries.map((img) => img.url)}
                handleResponse={handleResponse}
                craftVariantId={item.craft_variant_id}
                checkoutId={item.checkout_id}
                idSouvenirPlace={item.id_souvenir_place}
                sellerResponse={item.seller_response}
                response_date={item.response_date}
              />
            )}
          </section>
        ))}
      <Modal
        title="Rate Your Experience"
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <Formik
          innerRef={formikRef}
          initialValues={
            actionRef.current === "response"
              ? responseInitialValues
              : initialValues
          }
          onSubmit={handleSubmitRating}
          validationSchema={
            actionRef.current === "response" ? null : reviewFormSchema
          }
        >
          <Form className="space-y-4">
            {actionRef.current === "response" ? (
              <FormInput
                as="textarea"
                rows={4}
                name="seller_response"
                type="text"
                placeholder="Your response here..."
              />
            ) : (
              <>
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
              </>
            )}

            <Button type="submit">submit</Button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default ReviewItemCard;
