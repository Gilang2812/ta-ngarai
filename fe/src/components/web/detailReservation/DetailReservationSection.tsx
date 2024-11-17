"use client";

import { useFetchReservationByID } from "@/features/web/detailReservation/useFetchReservationById";
import { useParams } from "next/navigation";
import { ReservationPackage } from "./ReservationPackage";
import { Description } from "./Description";
import { ReservationHomestay } from "./ReservationHomestay";
import { PaymentSection } from "./PaymentSection";

export const DetailReservationSection = () => {
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useFetchReservationByID(id?.toString());
  if (isLoading) return <p>loading...</p>;
  return (
    <main className=" gap-6 grid grid-cols-2">
      <section className="col-span-1 p-5 bg-white rounded-lg ">
        <header className="text-lg text-center mb-8">
          <h2>Reservation Package</h2>
        </header>
        {data && (
          <>
            <ReservationPackage data={data} />
            <Description data={data} />
          </>
        )}
      </section>

      {data && data!.detail.length > 0 && (
        <section className="col-span-1  ">
          <div className=" bg-white rounded-lg p-5">
            <header className="text-lg text-center mb-8">
              <h2>Reservation Homestay</h2>
            </header>
            <i>
              *This date is the day of the homestay reservation and the check
              out time is the next day at 12.00 WIB
            </i>
            <ReservationHomestay data={data} />
          </div>
        </section>
      )}
      <section className="col-span-2 ">
      { data && <PaymentSection data={data} />}
      </section>
    </main>
  );
};
