"use client";
import useExtendPackage from "@/hooks/useModifyPackage";

import Button from "@/components/common/Button";
import { ContentSplitted } from "@/components/common/ContentSplitted";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";

import { FaTimes } from "react-icons/fa";
import { FaCartPlus, FaCircleInfo } from "react-icons/fa6";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { formatPrice } from "@/lib/priceFormatter";
import { Itinerary } from "../package/moreInfoPackage/Itinerary";

import Link from "next/link";
import { ROUTES } from "@/data/routes";
import { Table } from "@/components/common/Table";
import DetailPackageSection from "./DetailPackageSection";
import PackageServiceSection from "./PackageServiceSection";
import FormPackageModal from "./FormPackageModal";
type Props = {
  id: string;
  type: "custom" | "extend";
};
const ModifyPackagePage = ({ id, type }: Props) => {
  const {
    isOpen,
    handleAddDay,
    handleAddActivity,
    handleEditDay,
    toggleModal,
    formType,
    getActivityInitialValues,
    dayInitialValues,
    handleSubmit,
    getServiceInitialValues,
    data,
    isLoading,
    isPending,
    handleAddService,
    handleDeleteService,
    handleDeleteActivity,
    handleDeleteDay,
    handleDeletePackage,
    capacityFormik,
  } = useExtendPackage(id);

  if (isLoading) return <ManagementSkeletonLoader />;

  return (
    data && (
      <div className="space-y-8">
        <SingleContentWrapper>
          <header className=" text-center">
            <h1 className="text-xl font-semibold">{type} This Package</h1>
          </header>

          <section className="px-6 py-4 flex justify-end items-center">
            <div className="flex items-center border-2 rounded overflow-hidden">
              <Button asChild className="rounded-none text-nowrap">
                <Link href={ROUTES.DETAIL_PACKAGE(id)}>
                  <FaCircleInfo /> View Package
                </Link>
              </Button>
              <Button
                asChild
                variant={"success"}
                className="rounded-none text-nowrap"
              >
                <Link href={ROUTES.PACKAGE_RESERVATION(id)}>
                  <FaCartPlus /> Booking This Package
                </Link>
              </Button>
              <Button
                variant={"danger"}
                className="rounded-none text-nowrap"
                onClick={handleDeletePackage}
              >
                <FaTimes /> Cancel {type} This Package
              </Button>
            </div>
          </section>

          <article>
            <Table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{`${data.name}`}</td>
                </tr>
                <tr>
                  <td>Package Type</td>
                  <td>{data?.type?.type_name}</td>
                </tr>
                <tr>
                  <td>Minimal Capacity</td>
                  <td>
                    {type === "extend" ? (
                      `${data?.min_capacity} Orang`
                    ) : (
                      <form
                        onSubmit={capacityFormik.handleSubmit}
                        className="flex items-center "
                      >
                        <input
                          type="number"
                          id="min_capacity"
                          name="min_capacity"
                          onChange={capacityFormik.handleChange}
                          value={capacityFormik.values.min_capacity}
                          className="w-20 p-2 border   focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary"
                        />
                        <Button
                          variant={"regSecondary"}
                          type="submit"
                          className="  rounded-none   font-medium  "
                        >
                          Save
                        </Button>
                      </form>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Contact Person</td>
                  <td>{data?.contact_person}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td className="py-3  font-semibold">
                    {formatPrice(data?.price)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </article>

          <section>
            <p className="flex items-start">
              <span className="text-red-700 mr-2">*</span>
              Package price is the calculation of package activities and package
              services.
            </p>
          </section>
        </SingleContentWrapper>
        <ContentSplitted
          left={
            <section className="space-y-8">
              <DetailPackageSection
                handleAddActivity={handleAddActivity}
                handleAddDay={handleAddDay}
                handleDeleteActivity={handleDeleteActivity}
                handleDeleteDay={handleDeleteDay}
                handleEditDay={handleEditDay}
                packageDays={data?.packageDays}
              />
              <PackageServiceSection
                detailServices={data?.detailServices}
                handleAddService={handleAddService}
                handleDeleteService={handleDeleteService}
              />
            </section>
          }
          right={
            <SingleContentWrapper>
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Google Map</h2>
              </div>
              <Itinerary data={data} />
            </SingleContentWrapper>
          }
        />
        <FormPackageModal
          dayInitialValues={dayInitialValues}
          formType={formType}
          getActivityInitialValues={getActivityInitialValues}
          getServiceInitialValues={getServiceInitialValues}
          handleSubmit={handleSubmit}
          isPending={isPending}
          packageDays={data?.packageDays}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      </div>
    )
  );
};

export default ModifyPackagePage;
