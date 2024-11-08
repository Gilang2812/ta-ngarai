import { useFetchTourism } from "@/features/web/useFetchTourism"; 
import { RawSkeleton } from "@/components/loading/RawSkeleton";

export const TourismData = () => {
  const {data,isLoading } = useFetchTourism('KG01')
  if(isLoading)  return <RawSkeleton />;
  return (
    <table className="  text-lg border-separate border-spacing-5">
      <tbody className="text-left">
        <tr>
          <td>Name</td>
          <td>{data?.name}</td>
        </tr>
        <tr>
          <td>Type of Tourism</td>
          <td>{data?.type_of_tourism}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{data?.address}</td>
        </tr>
        <tr>
          <td>Open</td>
          <td>{data?.open}</td>
        </tr>
        <tr>
          <td>Close</td>
          <td>{data?.close}</td>
        </tr>
        <tr>
          <td>Contact Person</td>
          <td>{data?.contact_person}</td>
        </tr>
      </tbody>
    </table>
  );
};
