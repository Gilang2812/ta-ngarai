"use client";

import { ReservationPackage } from "./ReservationPackage";
import { Description } from "./Description";
import { ReservationHomestay } from "./ReservationHomestay";
import { PaymentSection } from "./PaymentSection";
import { useDetailReservationPackage } from "@/hooks/useDetailReservationPackage";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";

export const DetailReservationSection = ({ id }: { id: string }) => {
  const { data, isLoading, handlePayment, item_details, refetch } =
    useDetailReservationPackage(id);

  if (isLoading) return <ManagementSkeletonLoader />;
  return (
    data && (
      <main className=" gap-6 grid grid-cols-2">
        <section className="col-span-1 p-5 bg-white rounded-lg ">
          <header className="text-lg text-center mb-8">
            <h2>Reservation Package</h2>
          </header>

          <ReservationPackage data={data} />
          <Description data={data} />
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
          <PaymentSection
            handlePayment={handlePayment}
            item_details={item_details}
            refetch={refetch}
            data={data}
          />
        </section>
      </main>
    )
  );
};
