import { formatPrice } from "@/lib/priceFormatter";
import { DetailReservationPackage } from "@/type/schema/ReservationSchema";
import { localeDayDateTime } from "@/utils/localeDate";
import dayjs from "dayjs";

export const ReservationPackage = ({
  data,
}: {
  data: DetailReservationPackage;
}) => {
  const RenderData = () => {
    const totalPeople = data?.total_people || 0;
    const minCapacity = data?.package?.min_capacity || 1;

    const totalPrice =
      data?.package?.price *
      (totalPeople < minCapacity
        ? 1
        : Math.floor(totalPeople / minCapacity) +
          (totalPeople % minCapacity < 0.5 * minCapacity ? 0.5 : 1));

    return (
      data && (
        <tbody className="[&_td]:p-2 ">
          <tr>
            <td>Package Name</td>
            <td>{data?.package?.name}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{data?.package?.type?.type_name}</td>
          </tr>
          <tr>
            <td>Request Date</td>
            <td>
              <time dateTime={data?.request_date}>
                {localeDayDateTime(data?.request_date)}
              </time>
            </td>
          </tr>
          <tr>
            <td>Days Package</td>
            <td>{data?.package?.packageDays?.length} days</td>
          </tr>
          <tr>
            <td>Check In</td>
            <td>
              <time dateTime={data?.check_in}>
                {dayjs(data?.check_in).format("dd, DD MMMM YYYY HH:mm:ss")}
              </time>
            </td>
          </tr>
          <tr>
            <td>Check Out</td>
            <td>
              <time
                dateTime={dayjs(data?.check_in)
                  .add(data?.package?.packageDays?.length - 1, "day")
                  .format("dd, DD MMMM YYYY HH:mm:ss")}
              >
                {dayjs(data?.check_in)
                  .add(data?.package?.packageDays?.length - 1, "day")
                  .format("dd, DD MMMM YYYY HH:mm:ss")}
              </time>
            </td>
          </tr>
          <tr>
            <td>Max Capacity</td>
            <td>{data?.package?.min_capacity} people</td>
          </tr>
          <tr>
            <td>Total People</td>
            <td>{data?.total_people} people</td>
          </tr>
          <tr>
            <td>Refund Amount</td>
            <td>{data?.refund_amount}</td>
          </tr>
          <tr>
            <td>Date Now</td>
            <td>
              {new Date()
                .toLocaleString()
                .replaceAll("/", "-")
                .replaceAll(",", "")
                .replaceAll(".", ":")}
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{formatPrice(data?.package?.price)}</td>
          </tr>
          <tr>
            <td>Total Price Package</td>
            <td>{formatPrice(totalPrice)}</td>
          </tr>
        </tbody>
      )
    );
  };
  return (
    <table className="w-full ">
      <RenderData />
    </table>
  );
};
