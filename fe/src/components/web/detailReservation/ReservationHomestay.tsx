import { ReservationSchema } from "@/type/schema/ReservationSchema";

export const ReservationHomestay = ({ data }: { data: ReservationSchema }) => {
  return (
    <section className=" space-y-4  mt-4">
      <table className=" [&_td]:px-2   w-full">
        <thead className="capitalize">
          <tr>
            <th>no</th>
            <th>date</th>
            <th>homestay name</th>
            <th>unit guest</th>
            <th>unit priec</th>
          </tr>
        </thead>
        <tbody>
          {data.detail.map((d, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-nowrap">
                {new Date(d.date).toLocaleString("id", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td>
                [{d.homestay.Homestay.name}]{" "}
                {d.homestay.HomestayUnitType.name_type} {d.unit_number}{" "}
                {d.homestay.unit_name}
              </td>
              <td>{d.unit_guest}</td>
              <td>{d.homestay.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table-fixed [&_td]:pr-8 ">
        <tbody>
          <tr>
            <td>Total day</td>
            <td>: {data.package.packageDays.length}</td>
          </tr>
          <tr>
            <td>Total Price</td>
            <td>: {data.package.packageDays.length}</td>
          </tr>
          <tr>
            <td>Homestay</td>
            <td>: {data.detail.map(d=>d.homestay.price).reduce((a,b)=>a+b)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
