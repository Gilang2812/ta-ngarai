import React from "react";
import HomestayReviewForm from "./HomestayReviewForm";
import { Formik } from "formik";
import {
  DetailReservationReviewSchema,
  HomestayReviewFormSchema,
} from "@/types/schema/ReservationSchema";
import { formatPrice } from "@/lib/priceFormatter";
import { homestaySchema } from "@/validation/reservation";
import { Rating } from "../craft/Rating";

type Props = {
  onSubmit: (values: HomestayReviewFormSchema) => void;
  detail: DetailReservationReviewSchema[];
  isComplete?: boolean;
  isPending?: boolean;
};

const HomestayReview = ({
  onSubmit,
  detail,
  isComplete = true,
  isPending,
}: Props) => {
  return detail.map((item, index) => (
    <section key={index} className="overflow-hidden border-b pt-3 pb-6">
      <table className="w-full [&_td]:p-2">
        <tbody className="space-y-4">
          <tr>
            <td>Homestay Name</td>
            <td>{item.homestay.homestay.name}</td>
          </tr>
          <tr>
            <td>Unit Homestay</td>
            <td>{item.homestay.unit_name} </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{formatPrice(item.homestay.price)}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td className="text-gray-900 py-2 leading-relaxed"></td>
          </tr>
          <tr>
            <td colSpan={2}>
              Jl. Raya Sumpu No.123, Sumpu, Kec. Sumpu, Kabupaten Sianok,
              Sumatera Barat 12345
            </td>
          </tr>
        </tbody>
      </table>
      {!isComplete ? (
        <section>
          <p className="mt-6 bg-yellow-300 font-bold text-black px-4 py-2 rounded text-sm ">
            User can add a review if this reservation is complete
          </p>
        </section>
      ) : (
        <>
          {item.rating ? (
            <table className="w-full [&_svg]:size-8 [&_td]:p-2">
              <tbody className="space-y-4">
                <tr>
                  <td>Rating</td>
                  <td>
                    <Rating rating={item.rating} />
                  </td>
                </tr>
                <tr>
                  <td>Review</td>
                  <td>{item.review} </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <Formik
              initialValues={{
                date: item.date,
                homestay_id: item.homestay_id,
                reservation_id: item.reservation_id,
                unit_number: item.unit_number,
                unit_type: item.unit_type,
                review: "",
                review_rating: 0,
              }}
              onSubmit={onSubmit}
              validationSchema={homestaySchema}
            >
              <HomestayReviewForm isPending={isPending} />
            </Formik>
          )}
        </>
      )}
    </section>
  ));
};

export default HomestayReview;
