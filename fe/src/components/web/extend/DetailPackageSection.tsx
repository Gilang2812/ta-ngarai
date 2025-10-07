import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { DetailPackageSchema, PackageDay } from "@/types/schema/PackageSchema";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaPencil, FaPlus } from "react-icons/fa6";

type Props = {
  packageDays: (PackageDay & { detailPackages: DetailPackageSchema[] })[];
  handleAddDay: () => void;
  handleAddActivity: () => void;
  handleEditDay: (
    day: PackageDay & { detailPackages: DetailPackageSchema[] }
  ) => void;
  handleDeleteDay: (
    day: PackageDay & { detailPackages: DetailPackageSchema[] }
  ) => void;
  handleDeleteActivity: (activity: DetailPackageSchema) => void;
  isManage?: boolean;
};

const DetailPackageSection = ({
  packageDays,
  handleAddActivity,
  handleAddDay,
  handleDeleteActivity,
  handleDeleteDay,
  handleEditDay,
  isManage = false,
}: Props) => {
  return (
    <SingleContentWrapper className="space-y-4">
      <h2 className="text-lg text-center font-semibold mb-4">Detail Package</h2>
      <section className="flex items-center">
        <Button
          onClick={handleAddDay}
          className="rounded-r-none"
          variant={"primary"}
        >
          <FaPlus /> Day
        </Button>
        <Button
          onClick={handleAddActivity}
          className="rounded-l-none"
          variant={"regEdit"}
        >
          <FaPlus /> Activity
        </Button>
      </section>
      {packageDays?.length > 0 &&
        packageDays.map((day, index) => (
          <section key={`day-${index}-${day.package_id}-${day.day}`}>
            <header className="flex gap-4 w-full justify-between py-4 items-center ">
              <dl>
                <dt>Day {day.day}</dt>
                <dd>{day.description}</dd>
              </dl>
              <div className="flex gap-2">
                <Button onClick={() => handleEditDay(day)} variant={"primary"}>
                  <FaPencil />
                </Button>
                <Button
                  onClick={() => handleDeleteDay(day)}
                  className="border"
                  variant={"regDanger"}
                  disabled={!isManage && !day.status}
                >
                  <FaTimes />
                </Button>
              </div>
            </header>
            <section className="overflow-x-scroll py-4">
              <table className="w-full min-w-fit [&_td]:p-2 [&_th]:p-2">
                <thead>
                  <tr className="border-b-2">
                    <th>Activity</th>
                    <th>Object</th>
                    <th>Price</th>
                    <th>Descrips</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {day?.detailPackages?.length > 0 &&
                    day?.detailPackages.map((pkg, pkgIndex) => (
                      <tr
                        className="border-b"
                        key={`day-${index}-package-${pkgIndex}-${pkg.package_id}-${pkg.activity}${pkg.day}`}
                      >
                        <td className="text-center">{pkg.activity}</td>
                        <td>{pkg?.object?.name}</td>
                        <td>{pkg?.object?.price || 0}</td>
                        <td>Description of the object.</td>
                        <td className="flex gap-2 items-center justify-center">
                          <Button
                            onClick={() => handleDeleteActivity(pkg)}
                            variant={"regDanger"}
                            disabled={!isManage && !pkg.status}
                          >
                            <FaTimes />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          </section>
        ))}
    </SingleContentWrapper>
  );
};

export default DetailPackageSection;
