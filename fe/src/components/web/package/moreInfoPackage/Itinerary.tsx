import { DetailPackage } from "@/type/schema/detailPackage";
import { FaCirclePlay } from "react-icons/fa6";
import { DayButton } from "../../explore/DayButton";

type ItineraryProps = {
  day: DetailPackage[] | undefined;
};
export const Itinerary = ({ day }: ItineraryProps) => {
  const uniqueDays = [
    ...new Map(day?.map((item: DetailPackage) => [item.day, item])).values(),
  ];

  console.log(day);
  return (
    <section className="p-5 bg-white rounded-xl space-y-4">
      <div className="flex flex-grow relative flex-wrap gap-y-2 py-2">
        {uniqueDays?.map((item: DetailPackage, index: number) => (
          <DayButton day={item.day} key={index} activity={day?.filter((d)=>d.day==item.day)} />
        ))}
      </div>
      <header className="text-center ">
        <h2 className="  text-lg font-semibold  ">Package Itinerary</h2>
      </header>

      {uniqueDays?.map((item: DetailPackage, index: number) => (
        <section key={index}>
          <h3 className="text-lg font-semibold">Day {item.day}</h3>
          <ol className="px-4 list-decimal">
            {day
              ?.filter((d: DetailPackage) => d.day === item.day)
              .map((d: DetailPackage, index: number) => (
                <li key={index}>{d.description}</li>
              ))}
          </ol>
        </section>
      ))}
    </section>
  );
};
