import { formatPrice } from "@/lib/priceFormatter";
import { DetailReservationPackage } from "@/type/schema/ReservationSchema";
import dayjs from "dayjs";

export const ReservationHomestay = ({
  data,
}: {
  data: DetailReservationPackage;
}) => {
  return (
    <section className=" space-y-4  mt-4">
      <table className=" [&_td]:px-2   w-full">
        <thead className="capitalize">
          <tr>
            <th>no</th>
            <th>date</th>
            <th>homestay name</th>
            <th>unit capacity</th>
            <th>unit priec</th>
          </tr>
        </thead>
        <tbody>
          {data?.detail
            ?.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((d, index) => (
              <tr key={index} className="text-sm">
                <td className="text-center">{index + 1}</td>
                <td className="text-wrap">
                  {dayjs(d?.date).format("D MMMM YYYY")}
                </td>
                <td>
                  [{d?.homestay?.homestay?.name}]{" "}
                  {d?.homestay?.unitType?.name_type} {d?.unit_number}{" "}
                  {d?.homestay?.unit_name}
                </td>
                <td className="text-center">{d?.homestay?.capacity}</td>
                <td>{d?.homestay?.price}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <table className="table-fixed [&_td]:pr-8 ">
        <tbody>
          <tr>
            <td>Total day</td>
            <td>: {data?.package?.packageDays?.length} days</td>
          </tr>
          <tr>
            <td>Total Price Homestay</td>
            <td>
              :{" "}
              {formatPrice(
                data?.detail?.reduce(
                  (acc, d) => acc + (d?.homestay?.price || 0),
                  0
                )
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
