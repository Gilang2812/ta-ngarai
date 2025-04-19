/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import { DayButton } from "./DayButton";
import { useFetchPackages } from "@/features/web/package/useFetchPackage";
import ButtonTooltip from "@/components/common/ButtonTooltip";
import { FaRegCalendarAlt } from "react-icons/fa";
import Loading from "@/app/loading";
import Link from "next/link";

// Main component
export const Package = ({title}:{title:string}) => {
  const { data, isLoading } = useFetchPackages({ package: true });
  console.log(data)
  if (isLoading) return <Loading />;

  const RenderPackage = () => {
    return data?.map((item, index) => (
      <React.Fragment key={index}>
        <tr>
          <td className="flex items-center gap-4 p-4   capitalize border-b">
            <Image
              src="/images/bg-header.jpg"
              alt="gambar"
              width={1000}
              height={1000}
              className="w-12 h-12"
            />
            {item.name.split("extend")[0]}
          </td>
        </tr>
        <tr className="border-b ">
          <td className="flex gap-1 relative flex-wrap gap-y-2 p-2">
            <ButtonTooltip
              label="Book Now" 
              className="rounded-none"
              variant="success"
              asChild
            >
              <Link href={'/web/explore'}><FaRegCalendarAlt/></Link>
            </ButtonTooltip> 
            {item?.packageDays?.map((day, dayIndex) => (
              <DayButton
                key={dayIndex}
                day={`  ${day.day} `}
                activity={day.detailPackages}
              />
            ))}
          </td>
        </tr>
      </React.Fragment>
    ));
  };

  return (
    <div className="relative">
      <header className="space-y-8 mb-8 text-lg text-center">
        <h1 className="text-xl text-wrap px-4 capitalize">
          {title}
        </h1>
      </header>
      <section className="relative max-h-[450px] overflow-auto  ">
        <table className="w-full table-auto overflow-auto  text-base capitalize">
          <thead>
            <tr className="border-b-2">
              <th className="py-6">Package Name</th>
            </tr>
          </thead>
          <tbody className="hover:[&_tr]:bg-stone-200">
            <RenderPackage />
          </tbody>
        </table>
      </section>
    </div>
  );
};
