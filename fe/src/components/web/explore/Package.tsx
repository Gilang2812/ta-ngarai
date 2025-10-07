/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useState } from "react";
import { DayButton } from "./DayButton";
import { useFetchPackages } from "@/features/web/package/useFetchPackage";
import ButtonTooltip from "@/components/common/ButtonTooltip";
import { FaRegCalendarAlt } from "react-icons/fa";
import Loading from "@/app/loading";
import Link from "next/link";
import { Packages } from "@/types/schema/PackageSchema";
import { ROUTES } from "@/data/routes";
import useUserRole from "@/hooks/useUserRole";
import { useToggleStore } from "@/stores/ToggleStore";

// Main component
export const Package = ({ title }: { title: string }) => {
  const { data, isLoading } = useFetchPackages<Packages>({ package: true });
  const [buttonActive, setButtonActive] = useState<string | null>(null);
  const { isUserAuth } = useUserRole();
  const { object_id } = useToggleStore();
  const filteredData = object_id
    ? data?.filter((item) =>
        item.packageDays.some((day) =>
          day.detailPackages.some((pkg) => pkg.object_id === object_id)
        )
      ) ?? []
    : data;
  if (isLoading) return <Loading />;
  const RenderPackage = () => {
    return filteredData && filteredData.length > 0 ? (
      filteredData?.map((item, index) => (
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
            <td className="flex gap-1 items-center relative flex-wrap gap-y-2 p-2">
              <ButtonTooltip
                label={`${isUserAuth ? "Book Now" : "Login As Customer First"}`}
                className="rounded-none"
                variant="success"
                disabled={!isUserAuth}
                asChild={isUserAuth}
              >
                {isUserAuth ? (
                  <Link href={ROUTES.PACKAGE_RESERVATION(item.id)}>
                    <FaRegCalendarAlt />
                  </Link>
                ) : (
                  <FaRegCalendarAlt />
                )}
              </ButtonTooltip>

              <DayButton
                buttonActive={buttonActive}
                setButtonActive={setButtonActive}
                packageDays={item.packageDays}
              />
            </td>
          </tr>
        </React.Fragment>
      ))
    ) : (
      <tr>
        <td className="text-center p-4" colSpan={1}>
          No packages available.
        </td>
      </tr>
    );
  };

  return (
    <div className="relative">
      <header className="space-y-8 mb-8 text-lg text-center">
        <h1 className="text-xl text-wrap px-4 capitalize">{title}</h1>
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
