import { useFetchTourism } from "@/features/web/useFetchTourism"; 
import { RawSkeleton } from "@/components/loading/RawSkeleton";

export const TourismData = () => {
  const {data,isLoading } = useFetchTourism('KG01')
  if(isLoading)  return <RawSkeleton />;
  return (
    <table className=" [&_th]:text-primary  text-sm border-separate border-spacing-5">
      <tbody className="text-left">
        <tr>
          <th>Name</th>
          <td>{data?.name}</td>
        </tr>
        <tr>
          <th>Type of Tourism</th>
          <td>{data?.type_of_tourism}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{data?.address}</td>
        </tr>
        <tr>
          <th>Open</th>
          <td>{data?.open}</td>
        </tr>
        <tr>
          <th>Close</th>
          <td>{data?.close}</td>
        </tr>
        <tr>
          <th>Contact Person</th>
          <td>{data?.contact_person}</td>
        </tr>
      </tbody>
    </table>
  );
};
