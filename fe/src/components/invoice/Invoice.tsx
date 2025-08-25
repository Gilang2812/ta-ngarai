"use client";
import { useGetHomestayReservation } from "@/features/reservation/useGetHomestayReservation";
import useAuth from "@/hooks/useAuth";
import { formatPrice } from "@/lib/priceFormatter";
import { ReservationDetails } from "@/type/schema/ReservationSchema";
import {
  getReservationStatus,
  getReservationStatusClass,
} from "@/utils/common/getReservationStatus";
import dayjs from "dayjs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export const Invoice = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetHomestayReservation(id);
  const searchParams = useSearchParams();
  const userSearch = searchParams.get("user");
  const { detail, ...reservation } = data || {};
  const status = getReservationStatus(reservation as ReservationDetails);
  const { user: userAuth } = useAuth();
  const user = userAuth || (userSearch ? JSON.parse(userSearch) : null);

  return (
    !isLoading &&
    detail &&
    data && (
      <div className="min-w-fit max-w-[794px] mx-auto">
        <div
          className="bg-white text-black mx-auto"
          style={{
            width: "794px", // A4 width at 96dpi
            minHeight: "1123px", // A4 height
            padding: "32px",
            fontSize: "10px",
            fontFamily: "Helvetica, Arial, sans-serif",
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 overflow-hidden">
              <Image src="/images/kage.png" alt="Logo" width={50} height={50} />
            </div>
            <div className="font-medium">
              <h1 className="text-[12px] font-bold">Desa Wisata Koto Gadang</h1>
              <p>Koto Gadang village, IV Koto District</p>
              <p>Agam Regency, West Sumatra 26160</p>
            </div>
          </div>

          {/* Horizontal line */}
          <div className="border-t-2 border-black my-4" />

          {/* Invoice Title */}
          <div className="text-right mb-4">
            <h2 className="text-lg font-extrabold">RESERVATION INVOICE</h2>
          </div>

          {/* Customer & Invoice Info */}
          <div className="mb-6">
            <p>
              <span className="font-medium">Kepada Yth.</span>
            </p>
            <article className="flex w-full   gap-8">
              <section className="w-full">
                <table>
                  <tbody>
                    <tr>
                      <td className="font-medium w-28">Name</td>
                      <td>:</td>
                      <td>@{user?.username} test</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Address</td>
                      <td>:</td>
                      <td>{` ${user?.address || "(profil is incomplete)"}`}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Phone</td>
                      <td>:</td>
                      <td>{` ${user?.phone || "(profil is incomplete)"}`}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="w-full">
                <table>
                  <tbody>
                    <tr>
                      <td className="font-medium">No.Invoice</td>
                      <td>:</td>
                      <td>{data.id}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Request at</td>
                      <td>:</td>
                      <td>
                        {dayjs(data.request_date).format(
                          "dddd, D MMMM YYYY HH:mm:ss"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </article>
          </div>

          {/* Reservation Detail */}
          <div className="mb-6">
            <h3 className="font-bold">Reservation Detail</h3>
            <table>
              <tbody>
                <tr>
                  <td className="font-medium w-40">Homestay Name</td>
                  <td>:</td>
                  <td>Homestay 10</td>
                </tr>
                <tr>
                  <td className="font-medium">Check In</td>
                  <td>:</td>
                  <td>
                    {dayjs(data.check_in).format(
                      " dddd, DD MMMM YYYY HH:mm:ss"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Check Out</td>
                  <td>:</td>
                  <td>
                    {dayjs(data.check_in)
                      .add(data.days_of_stay, "day")
                      .format(" dddd, DD MMMM YYYY HH:mm:ss")}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Day of Stay</td>
                  <td>:</td>
                  <td>{data.days_of_stay} days</td>
                </tr>
                <tr>
                  <td className="font-medium">Total People</td>
                  <td>:</td>
                  <td>2 people</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Table */}
          <div className="mb-6">
            <table className="w-full border border-black border-collapse">
              <thead>
                <tr className="bg-[#a9a9a9] text-xs font-body">
                  <th className="border border-black p-1 text-left">
                    Homestay
                  </th>
                  <th className="border border-black p-1 text-left">
                    Unit Name
                  </th>
                  <th className="border border-black p-1 text-center">
                    Unit Capacity
                  </th>
                  <th className="border border-black p-1 text-center">
                    Unit Guest
                  </th>
                  <th className="border border-black p-1 text-left">
                    Unit Price
                  </th>
                  <th className="border border-black p-1 text-left">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {detail?.length > 0 &&
                  detail?.map((detail, index) => (
                    <tr key={index}>
                      <td className="border border-black p-1 align-top">
                        <div>{detail?.homestay?.homestay?.name}</div>
                      </td>
                      <td className="border border-black p-1 align-top">
                        <div>{detail?.homestay?.unit_name}</div>
                      </td>
                      <td className="border border-black text-center">
                        {detail.homestay.capacity}
                      </td>
                      <td className="border border-black text-center">
                        {data.total_people}
                      </td>
                      <td className="border border-black text-left">
                        {formatPrice(detail?.homestay?.price)}
                      </td>
                      <td className="border border-black text-left">
                        {formatPrice(
                          detail?.homestay?.price * data.days_of_stay
                        )}
                      </td>
                    </tr>
                  ))}

                <tr>
                  <td
                    colSpan={5}
                    className="border border-black p-1 align-top font-bold text-left"
                  >
                    Grand Total
                  </td>
                  <td className="border border-black p-1 align-top font-bold text-right">
                    {formatPrice(data.total_price)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={5}
                    className="border border-black p-1 align-top font-bold text-left"
                  >
                    Deposit
                  </td>
                  <td className="border border-black p-1 align-top font-bold text-right">
                    {formatPrice(data.deposit)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Instructions */}
          <div className="mb-6">
            <p>
              Please make payment via the web application through the
              Reservation menu → select Reservation ID → click Payment.
            </p>
          </div>

          {/* Status Info */}
          <div className="mb-6">
            <table>
              <tbody>
                <tr>
                  <td className="font-medium w-40 align-top">Confirmation</td>
                  <td className="align-top">:</td>
                  <td className="align-top">
                    {data.confirmation_date
                      ? `confirmation on ${dayjs(data.confirmation_date).format(
                          "dddd, DD MMMM YYYY HH:mm:ss"
                        )}`
                      : "Incomplete"}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium align-top">Deposit Payment</td>
                  <td className="align-top">:</td>
                  <td className="align-top">
                    {data.deposit_date
                      ? `complete on ${dayjs(data.deposit_date).format(
                          "dddd, DD MMMM YYYY HH:mm:ss"
                        )}`
                      : "incomplete"}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium align-top">Full Payment</td>
                  <td className="align-top">:</td>
                  <td className="align-top">
                    {data.payment_date
                      ? `complete on ${dayjs(data.payment_date).format(
                          "dddd, DD MMMM YYYY HH:mm:ss"
                        )}`
                      : "incomplete"}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium align-top">Status</td>
                  <td className="align-middle">:</td>
                  <td className="align-middle">
                    <div className={getReservationStatusClass(status)}>
                      {status}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex w-full items-center justify-end mt-16">
            <article className="text-center">
              <p>Agam, {dayjs().format("D MMMM YYYY")}</p>
              <p className="mt-8">Best regards,</p>
              <p className="font-medium">Pokdarwis Kage</p>
            </article>
          </div>
        </div>
      </div>
    )
  );
};
