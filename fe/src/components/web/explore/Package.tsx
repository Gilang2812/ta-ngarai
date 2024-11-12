/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

import { useFetchDetailPackage } from "@/features/web/explore/useFetchDetailPackage";
import { DetailPackage, PackageSchema } from "@/type/schema/detailPackage";
import { DayButton } from "./DayButton";

// Main component
export const Package = () => {
  const { data, isLoading } = useFetchDetailPackage();
  const seen: { [key: string]: boolean } = {};

  if (isLoading) return <div>Loading...</div>;

  const packageData = data
    ?.filter((item: DetailPackage) => {
      const packageId = item?.packageDay?.package?.id;
      if (packageId && !seen[packageId]) {
        seen[packageId] = true;
        return true;
      }
      return false;
    })
    .map((item: DetailPackage) => item?.packageDay?.package);

  const RenderPackage = () => {
    return packageData?.map((item: PackageSchema) => (
      <React.Fragment key={item.id}>
        <tr>
          <td className="flex items-center gap-4 p-4 capitalize border-b">
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
          <td className="flex relative flex-wrap gap-y-2 py-2">
            {[
              ...new Map(
                data
                  ?.filter(
                    (day: DetailPackage) => day.packageDay.package_id == item.id
                  )
                  .map((day: DetailPackage) => [day.packageDay.day, day])
              ).values(),
            ].map((day: any, index: number) => (
              <DayButton
                key={index}
                day={`  ${day.packageDay.day} `}
                activity={data?.filter(
                  (ac: DetailPackage) =>
                    ac.package_id == day.package_id && ac.day == day.day
                )}
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
          explore village with our package
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
