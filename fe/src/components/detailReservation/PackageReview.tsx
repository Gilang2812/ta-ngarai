import { Formik } from "formik";
import React from "react";
import PackageReviewForm from "./PackageReviewForm";
import { PackageReviewFormSchema } from "@/type/schema/ReservationSchema";
import { packageSchema } from "@/validation/reservation";
import { Rating } from "../craft/Rating";

type Props = {
  initialValues: PackageReviewFormSchema;
  onSubmit: (values: PackageReviewFormSchema) => void;
  packageData: {
    label: string;
    value: string | number;
  }[];
  isComplete?: boolean;
  isPending?: boolean;
  rating: number | null;
  review: string | null;
};

const PackageReview = ({
  initialValues,
  onSubmit,
  packageData,
  isComplete = true,
  isPending = false,
  rating,
  review,
}: Props) => {
  return (
    <>
      <header className="textcenter capitalize mb-6 text-xl w-full ">
        <h2 className="text-center">Review Package</h2>
      </header>
      <article className="space-y-4">
        <table className="w-full [&_td]:p-2 ">
          <tbody className="space-y-4">
            {packageData.map((detail, index) => (
              <tr key={index}>
                <td colSpan={index === packageData.length - 1 ? 2 : 1}>
                  {detail.label}
                </td>
                <td colSpan={index === packageData.length - 1 ? 2 : 1}>
                  {detail.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      {isComplete ? (
        <section>
          <p className="mt-6 bg-yellow-300 font-bold text-black px-4 py-2 rounded text-sm ">
            User can add a review if this reservation is complete
          </p>
        </section>
      ) : rating ? (
        <table className="w-full [&_svg]:size-8 [&_td]:p-2">
          <tbody className="space-y-4">
            <tr>
              <td>Rating</td>
              <td>
                <Rating rating={rating} />
              </td>
            </tr>
            <tr>
              <td>Review</td>
              <td>{review} </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={packageSchema}
        >
          <PackageReviewForm isPending={isPending} />
        </Formik>
      )}
    </>
  );
};

export default PackageReview;
