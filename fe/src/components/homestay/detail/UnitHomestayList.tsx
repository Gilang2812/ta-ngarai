import Button from "@/components/common/Button";
import Rating from "@/components/common/Rating";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import useToggleOpen from "@/hooks/useToggleOpen";
import { averageRating } from "@/lib/averageRating";
import { formatPrice } from "@/lib/priceFormatter";
import { UnitHomestay } from "@/type/schema/HomestaySchema";
import React from "react";
import { FaComment, FaPhotoFilm } from "react-icons/fa6";

type Props = {
  unit: UnitHomestay;
  handleSelectedUnit: () => void;
};

const UnitHomestayList = ({ unit, handleSelectedUnit }: Props) => {
  const { isOpen, toggle } = useToggleOpen();
  const reviews = unit.detailReservations.filter(
    (reservation) => !!reservation.rating
  );
  return (
    <SingleContentWrapper className=" shadow-sm  rounded-sm h-full border  ">
      <h1 className="text-xl font-bold mb-3">{unit.unit_name}</h1>

      <Rating rating={averageRating(unit?.detailReservations)} />
      <section className="mb-4 py-2">
        <p>Price : {formatPrice(unit?.price)}</p>
        <p>Capacity : {unit?.capacity} orang</p>
      </section>

      <p>{unit?.description}</p>

      <article className="mb-6 py-2">
        <h4>Facility :</h4>
        <ul className="space-y-2 list-disc px-4">
          {unit?.facilityDetails?.map((facility, index) => (
            <li key={index}>
              {`${facility?.unitFacility?.name} (${facility.description} )`}
            </li>
          ))}
        </ul>
      </article>

      <section className="flex gap-3  mb-5">
        <Button onClick={handleSelectedUnit} variant={"primary"}>
          <FaPhotoFilm />
        </Button>
        <Button onClick={toggle} variant={"regEdit"}>
          <FaComment />
        </Button>
      </section>
      <article
        className={`${!isOpen ? "max-h-0" : "max-h-[999px]"} overflow-hidden`}
      >
        {isOpen && reviews.length > 0 ? (
          reviews.map((unitReservation, index) => (
            <section key={index} className="space-y-4 py-2 border-b leading-6">
              <div>
                <p>@{unitReservation.reservation.customer.username}</p>
                <p>rating :</p>
              </div>
              <Rating
                className="text-gray-500 text-lg"
                rating={unitReservation.rating}
              />
              <p>Review : {unitReservation.review}</p>
            </section>
          ))
        ) : (
          <footer className="pt-4">
            <p>No reviews yet</p>
          </footer>
        )}
      </article>
    </SingleContentWrapper>
  );
};

export default UnitHomestayList;
