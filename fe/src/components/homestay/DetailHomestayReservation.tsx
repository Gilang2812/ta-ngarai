"use client";
import { getCentroid } from "@/utils/common/getCentroid";
import MapLayout from "../web/MapLayout";
import ReservationHomestayMap from "./ReservationHomestayMap";
import ReservationInfo from "./ReservationInfo";
import useDetailHomestayReservation from "@/hooks/useDetailHomestayReservation";
import { SingleContentWrapper } from "../common/SingleContentWrapper";
import DetailHomestayReservationLoader from "../loading/DetailHomestayReservationloader";
import TableHeaderManagement from "../admin/TableHeaderManagement";
import { formatPrice } from "@/lib/priceFormatter";
import Button from "../common/Button";
import { FaPrint, FaXmark } from "react-icons/fa6"; 

const DetailHomestayReservation = ({ id }: { id: string }) => {
  const {
    data,
    geom,
    isLoading,
    homestayInfo,
    status,
    statusClassname,
    detail,
  } = useDetailHomestayReservation(id);
  const centroid = getCentroid(geom);
  if (isLoading) return <DetailHomestayReservationLoader />;
  return (
    data &&
    detail &&
    homestayInfo && (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReservationInfo homestayInfo={homestayInfo} data={data} />
        <SingleContentWrapper>
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-secondary  mb-6">
              Google Maps
            </h2>
          </header>
          <MapLayout
            containerStyle={{ width: "100%", height: "100%" }}
            zoom={18}
            center={centroid}
          >
            <ReservationHomestayMap geom={geom} />
          </MapLayout>
        </SingleContentWrapper>
        <SingleContentWrapper className="md:col-span-2">
          <header className="mb-8">
            <h2 className="text-2xl text-center font-bold text-secondary  mb-6">
              List Transaction
            </h2>
          </header>
          <table
            className="w-full [&_thead]:bg-gray-800 [&_thead]:text-white [&_td]:p-2 [&_th]:p-2  "
            role="table"
            aria-describedby="reservation-summary"
          >
            <TableHeaderManagement
              action={false}
              headers={["Description", "unit_type", "Unit Price", "Amount"]}
            />

            <tbody className="bg-gray-50">
              {detail?.length > 0 &&
                detail?.map((detail, index) => (
                  <tr key={index}>
                    <td className="text-center px-4 py-4 border-b border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 border-b border-gray-200">
                      <div>
                        <div className="font-medium">
                          {detail.homestay.unit_name}
                        </div>
                        <div className="text-sm text">
                          {detail.homestay.description}
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-4 py-4 border-b border-gray-200">
                      {detail.homestay.unitType.name_type}
                    </td>
                    <td className="text-center px-4 py-4 border-b border-gray-200">
                      {formatPrice(detail.homestay.price)}
                    </td>
                    <td className="text-center px-4 py-4 border-b border-gray-200">
                      {formatPrice(detail.homestay.price * data.days_of_stay)}
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={3}></td>

                <td className="text-center">Grand Total</td>
                <td className="text-center">
                  {formatPrice(
                    parseInt((data.total_price as unknown as string) || "0")
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </SingleContentWrapper>

        <SingleContentWrapper className="md:col-span-2">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-secondary  mb-6">
              Reservation Summary
            </h2>
          </header>
          <div className="[&_dt]:min-w-[12.5rem] border-b-2 p-4 space-y-4 ">
            <dl className="flex  items-center">
              <dt className="font-semibold">Total Price</dt>
              <dd>: {formatPrice(data.total_price)}</dd>
            </dl>
            <dl className="flex  items-center">
              <dt className="font-semibold">Deposit</dt>
              <dd>: {formatPrice(data.deposit)} (50% of total price) </dd>
            </dl>
          </div>
          <dl className="flex [&_dt]:min-w-[12.5rem] p-4 items-center">
            <dt className="font-semibold">Status</dt>
            <dd>
              : <span className={statusClassname}>{status}</span>
            </dd>
          </dl>
          <section className="flex p-4 gap-4 items-center justify-end">
            <Button variant={"success"}>
              <FaPrint /> Invoice
            </Button>
            <Button variant={"danger"}>
              <FaXmark /> Cancel
            </Button>
          </section>
        </SingleContentWrapper>
      </section>
    )
  );
};
export default DetailHomestayReservation;
