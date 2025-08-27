"use client";
import { useState } from "react";
import { DayButton } from "../../explore/DayButton";
import MapLayout from "../../MapLayout";
import { cn } from "@/utils/common/cn";
import {
  PackageService,
  PackageServiceGallery,
} from "@/type/schema/PackageSchema";

type ItineraryProps = {
  data?: PackageService | PackageServiceGallery;
};
export const Itinerary = ({ data }: ItineraryProps) => {
  const [activeDay, setActiveDay] = useState<string | null>(null);
  return (
  data && (
      <section className="p-5 bg-white rounded-xl space-y-4">
        <MapLayout containerStyle={{ height: "500px" }} zoom={18}></MapLayout>
        <div className="flex flex-grow relative flex-wrap gap-y-2 py-2">
          <DayButton
            buttonActive={activeDay}
            setButtonActive={setActiveDay}
            packageDays={data.packageDays}
          />
        </div>
        <header className="text-center ">
          <h2 className="  text-lg font-semibold  ">Package Itinerary</h2>
        </header>

        {data?.packageDays?.map((item, index) => (
          <section
            className={cn("p-4 border border-transparent", {
              " border-primary rounded-lg": activeDay?.includes(
                `${item.day}${item.package_id}`
              ),
            })}
            key={index}
          >
            <h3 className="text-lg font-semibold">Day {item.day}</h3>
            <ol className="px-4 list-decimal">
              {item?.detailPackages.map((d, index) => (
                <li key={index}>{d.description}</li>
              ))}
            </ol>
          </section>
        ))}
      </section>
    )
  );
};
