import { GalleryPackageSchema } from "@/type/schema/GallerySchema";
import { DetailServiceSchema } from "@/type/schema/ServiceSchema";

type InfoProps = {
  packageItem: GalleryPackageSchema;
  service?: DetailServiceSchema[];
};
export const PackageInformation = ({ packageItem, service }: InfoProps) => {
  const include = service?.filter((item) => item.ServicePackage.category === 1);
  const exclude = service?.filter((item) => item.ServicePackage.category === 2);
 
  return (
    <section className="p-8 mb-4 bg-white rounded-xl">
      <header className="text-xl font-semibold text-center">
        <h2>Package Information</h2>
      </header>
      <table className="table-fixed w-full mt-12  ">
        <tbody className="[&_td]:py-2 ">
          <tr>
            <td>Name</td>
            <td>{packageItem?.Package?.name}</td>
          </tr>
          <tr>
            <td>Package Type</td>
            <td>{packageItem?.Package?.PackageType?.type_name}</td>
          </tr>
          <tr>
            <td>Contact Person</td>
            <td>{packageItem?.Package?.contact_person}</td>
          </tr>
          <tr>
            <td>Minimum Capacity</td>
            <td>{packageItem?.Package?.min_capacity} people</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>Rp {packageItem?.Package?.price.toLocaleString()} </td>
          </tr>
        </tbody>
      </table>
      {include && (
        <section className="my-4">
          <h3 className="text-lg font-semibold">Service Include</h3>
          <ul className="px-8 list-disc">
            {include.map((ic) => (
              <li key={ic.service_package_id}>{ic.ServicePackage.name}</li>
            ))}
          </ul>
        </section>
      )}

      {exclude && (
        <section className="">
          <h3 className="text-lg font-semibold">Service Exclude</h3>
          <ul className="px-8 list-disc">
            {exclude.map((ec) => (
              <li key={ec.service_package_id}>{ec.ServicePackage.name}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};
