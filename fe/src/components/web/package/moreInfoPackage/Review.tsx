import { PackageReservationSchema } from "@/type/schema/PackageSchema";
import { FC } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

type Props = {
  reservations: PackageReservationSchema[];
};
export const Review: FC<Props> = ({ reservations }) => {
  const ratings = reservations?.filter((item) => item.rating > 0 && item) || [];
  return (
    <section className="p-5 bg-white rounded-xl">
      <header className="mb-8 text-lg text-center">
        <h3 className="font-semibold">Package Review</h3>
      </header>
      {ratings?.length > 0 ? (
        ratings?.map((item, index) => (
          <article
            key={index}
            className="mb-4 border-b p-4 space-y-2  [&_dl]:flex [&_dl]:items-center [&_dl]:gap-2"
          >
            <h4>@{item?.customer?.fullname}</h4>
            <dl>
              <dt>Rating :</dt>
              <dd className="flex items-center   text-yellow-300 text-2xl">
                {Array.from({ length: item.rating }, (_, i) =>
                  i < item.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                )}
              </dd>
            </dl>
            <dl>
              <dt>Review :</dt>
              <dd>{item?.review}</dd>
            </dl>
          </article>
        ))
      ) : (
        <article className="text-center">
          <p>There are no reviews yet</p>
        </article>
      )}
    </section>
  );
};
