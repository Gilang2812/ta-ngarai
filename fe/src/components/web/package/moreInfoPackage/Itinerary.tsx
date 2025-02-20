 
import { DayButton } from "../../explore/DayButton";
import { PackageService } from "@/features/web/package/useFetchPackage";

type ItineraryProps = {
  data: PackageService | undefined;
};
export const Itinerary = ({ data }: ItineraryProps) => {

 
  return (
    <section className="p-5 bg-white rounded-xl space-y-4">
      <div className="flex flex-grow relative flex-wrap gap-y-2 py-2">
        {data?.packageDays?.map((item, index) => (
          <DayButton day={item.day} key={index} activity={item.detailPackages} />
        ))}
      </div>
      <header className="text-center ">
        <h2 className="  text-lg font-semibold  ">Package Itinerary</h2>
      </header>

      {data?.packageDays?.map((item, index) => (
        <section key={index}>
          <h3 className="text-lg font-semibold">Day {item.day}</h3>
          <ol className="px-4 list-decimal">
            {item?.detailPackages.map((d, index) => (
                <li key={index}>{d.description}</li>
              ))}
          </ol>
        </section>
      ))}
    </section>
  );
};
