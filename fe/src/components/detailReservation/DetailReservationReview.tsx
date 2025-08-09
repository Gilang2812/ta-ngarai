"use client";
import React from "react";
import { ContentSplitted } from "../common/ContentSplitted";
import { SingleContentWrapper } from "../common/SingleContentWrapper";
import { useDetailReservationReview } from "@/hooks/useDetailReservationReview";
import ManagementSkeletonLoader from "../loading/ManagementSkeletonLoader";
import PackageReview from "./PackageReview";
import HomestayReview from "./HomestayReview";

type Props = {
  id: string;
};

const DetailReservationReview = ({ id }: Props) => {
  const {
    data,
    isLoading,
    packageInitialValues,
    handleSubmitPackage,
    handleSubmitHomestay,
    packageData,
    isUpdatingDetail,
    isUpdatingReservation,
  } = useDetailReservationReview(id);
  if (isLoading) {
    return <ManagementSkeletonLoader />;
  }
  return (
    data && (
      <ContentSplitted
        left={
          <SingleContentWrapper>
            {!data.package ? (
              <p className="text-gray-600 text-center py-4">
                No package included in this reservation.
              </p>
            ) : (
              <PackageReview
                initialValues={packageInitialValues}
                onSubmit={handleSubmitPackage}
                packageData={packageData}
                isPending={isUpdatingReservation}
                rating={data.rating}
                review={data.review}
              />
            )}
          </SingleContentWrapper>
        }
        right={
          <SingleContentWrapper>
            {data?.detail ? (
              <>
                <header className="textcenter capitalize mb-3 text-xl w-full ">
                  <h2 className="text-center">Review Homestay</h2>
                </header>
                <HomestayReview
                  onSubmit={handleSubmitHomestay}
                  detail={data.detail}
                  isPending={isUpdatingDetail}
                />
              </>
            ) : (
              <p className="text-gray-600 text-center py-4">
                No homestay included in this reservation.
              </p>
            )}
          </SingleContentWrapper>
        }
      />
    )
  );
};

export default DetailReservationReview;
