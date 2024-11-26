import { ReservationSchema } from "@/type/schema/ReservationSchema";
import { addDays, localeDayDateTime } from "@/utils/localeDate";

export const ReservationPackage = ({ data }: { data: ReservationSchema }) => {
  const RenderData = () => {
    return (
      data && (
        <tbody className="[&_td]:p-2 ">
          <tr>
            <td>Package Name</td>
            <td>{data?.package?.name}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{data?.package?.PackageType?.type_name}</td>
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
                {localeDayDateTime(data?.check_in)}
              </time>
            </td>
          </tr>
          <tr>
            <td>Check Out</td>
            <td>
              <time
                dateTime={addDays(
                  data?.check_in,
                  (data?.package?.packageDays?.length || 0) - 1
                ).toISOString()}
              >
                {localeDayDateTime(
                  addDays(
                    data?.check_in,
                    (data?.package?.packageDays?.length || 0) - 1
                  )
                )}
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
            <td>Rp 2.975.000</td>
          </tr>
          <tr>
            <td>Total Price Package</td>
            <td>Rp 2.975.000</td>
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
