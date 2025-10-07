import Image from "next/image";
import React, { useState } from "react";
import { DayButton } from "@/components/web/explore/DayButton";
import { useFetchPackages } from "@/features/web/package/useFetchPackage";
import { Spinner } from "flowbite-react";
import { Packages } from "@/types/schema/PackageSchema";
import Link from "next/link";
import { ROUTES } from "@/data/routes";

// Main component
export const Package = () => {
  const { data, isLoading } = useFetchPackages<Packages>({ package: true });
  const [buttonActive, setButtonActive] = useState<string | null>(null);
  const RenderPackage = () => {
    return (
      !isLoading &&
      data &&
      data?.map((item, index) => (
        <React.Fragment key={index}>
          <tr>
            <td>
              <Link
                className="flex items-center gap-4 p-4 capitalize border-b"
                href={ROUTES.DETAIL_PACKAGE(item.id)}
              >
                <Image
                  src="/images/bg-header.jpg"
                  alt="gambar"
                  width={1000}
                  height={1000}
                  className="w-12 h-12"
                />
                {item.name.split("extend")[0]}
              </Link>
            </td>
          </tr>
          <tr className="border-b ">
            <td className="flex relative flex-wrap gap-y-2 py-2">
              <DayButton
                buttonActive={buttonActive}
                setButtonActive={setButtonActive}
                packageDays={item.packageDays}
              />
            </td>
          </tr>
        </React.Fragment>
      ))
    );
  };

  return (
    <div className="relative">
      <header className="space-y-8 mb-8 text-lg text-center">
        <h1 className="text-xl text-wrap px-4 capitalize">
          explore village with our package
        </h1>
      </header>
      <section className="relative max-h-[450px] overflow-auto  ">
        {!isLoading ? (
          <table className="w-full animate-[fadeIn_1s_linear_forwards] table-auto overflow-x-clip  text-base capitalize">
            <thead>
              <tr className="border-b-2">
                <th className="py-6">Package Name</th>
              </tr>
            </thead>
            <tbody className="hover:[&_tr]:bg-stone-200">
              <RenderPackage />
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </section>
    </div>
  );
};
