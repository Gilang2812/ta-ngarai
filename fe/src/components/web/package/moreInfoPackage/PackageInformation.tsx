import { PackageService } from "@/features/web/package/useFetchPackage";

 
 
export const PackageInformation = ({ data }: {data:PackageService}) => {
  const include = data?.detailServices.filter((item) => item.service.category === 1);
  const exclude = data?.detailServices.filter((item) => item.service.category === 2);
 
  return (
    <section className="p-8 mb-4 bg-white rounded-xl">
      <header className="text-xl font-semibold text-center">
        <h2>Package Information</h2>
      </header>
      <table className="table-fixed w-full mt-12  ">
        <tbody className="[&_td]:py-2 ">
          <tr>
            <td>Name</td>
            <td>{data?.name}</td>
          </tr>
          <tr>
            <td>Package Type</td>
            <td>{data?.type?.type_name}</td>
          </tr>
          <tr>
            <td>Contact Person</td>
            <td>{data?.contact_person}</td>
          </tr>
          <tr>
            <td>Minimum Capacity</td>
            <td>{data?.min_capacity} people</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>Rp {data?.price.toLocaleString()} </td>
          </tr>
        </tbody>
      </table>
      {include && (
        <section className="my-4">
          <h3 className="text-lg font-semibold">Service Include</h3>
          <ul className="px-8 list-disc">
            {include.map((ic) => (
              <li key={ic.service_package_id}>{ic.service.name}</li>
            ))}
          </ul>
        </section>
      )}

      {exclude && (
        <section className="">
          <h3 className="text-lg font-semibold">Service Exclude</h3>
          <ul className="px-8 list-disc">
            {exclude.map((ec) => (
              <li key={ec.service_package_id}>{ec.service.name}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};
