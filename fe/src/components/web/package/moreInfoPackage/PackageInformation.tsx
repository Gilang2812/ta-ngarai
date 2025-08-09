import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper"; 
import { PackageServiceGallery } from "@/type/schema/PackageSchema";
import { useService } from "@/utils/ServiceCategory";
import { FaCirclePlay } from "react-icons/fa6";

export const PackageInformation = ({ data }: { data: PackageServiceGallery }) => {
  const include = useService(1,data)
  const exclude = useService(0, data);

  return (
    <SingleContentWrapper>
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
            <td>Rp {data?.price?.toLocaleString()} </td>
          </tr>
        </tbody>
      </table>
      {include && (
        <section className="my-4">
          <h3 className="text-lg font-semibold">Service Include</h3>
          <ul className="px-8 list-disc">
            {include?.map((ic) => (
              <li key={ic.service_package_id}>{ic.service.name}</li>
            ))}
          </ul>
        </section>
      )}

      {exclude && (
        <section className="">
          <h3 className="text-lg font-semibold">Service Exclude</h3>
          <ul className="px-8 list-disc">
            {exclude?.map((ec) => (
              <li key={ec.service_package_id}>{ec.service.name}</li>
            ))}
          </ul>
        </section>
      )}
      <footer className="mt-16">
        <Button disabled={!data.video_url} type="button" variant={"primary"}>
          <FaCirclePlay /> Play Video
        </Button>
      </footer>
    </SingleContentWrapper>
  );
};
