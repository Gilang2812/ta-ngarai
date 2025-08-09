"use client";
import useExtendPackage from "@/hooks/useModifyPackage";

import Button from "@/components/common/Button";
import { ContentSplitted } from "@/components/common/ContentSplitted";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";

import { FaTimes } from "react-icons/fa";
import { FaCartPlus, FaCircleInfo, FaPencil, FaPlus } from "react-icons/fa6";
import { Modal } from "@/components/modal/Modal";
import { Formik } from "formik";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { formatPrice } from "@/lib/priceFormatter";
import { Itinerary } from "../package/moreInfoPackage/Itinerary";
import {
  detailPackageFormSchema,
  packageDayFormSchema,
} from "@/validation/package.validation";
import { serviceFormSchema } from "@/validation/service.validation";
import ModifyPackageForm from "./ModifyPackageForm";
import Link from "next/link";
import { ROUTES } from "@/data/routes";
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
            <table className="w-full [&_td]:p-2 ">
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
            </table>
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
              <SingleContentWrapper className="space-y-4">
                <h2 className="text-lg text-center font-semibold mb-4">
                  Detail Package
                </h2>
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
                {data?.packageDays?.length > 0 &&
                  data?.packageDays.map((day, index) => (
                    <section key={`day-${index}-${day.package_id}-${day.day}`}>
                      <header className="flex gap-4 w-full justify-between py-4 items-center ">
                        <dl>
                          <dt>Day {day.day}</dt>
                          <dd>{day.description}</dd>
                        </dl>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditDay(day)}
                            variant={"primary"}
                          >
                            <FaPencil />
                          </Button>
                          <Button
                            onClick={() => handleDeleteDay(day)}
                            className="border"
                            variant={"regDanger"}
                            disabled={!day.status}
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
                                  <td className="text-center">
                                    {pkg.activity}
                                  </td>
                                  <td>{pkg?.object?.name}</td>
                                  <td>{pkg?.object?.price || 0}</td>
                                  <td>Description of the object.</td>
                                  <td className="flex gap-2 items-center justify-center">
                                    <Button
                                      onClick={() => handleDeleteActivity(pkg)}
                                      variant={"regDanger"}
                                      disabled={!pkg.status}
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
              <SingleContentWrapper className="space-y-4">
                <h2 className="text-lg text-center font-semibold mb-4">
                  Service Package
                </h2>
                <section className="flex items-center">
                  <Button
                    className="text-nowrap"
                    onClick={handleAddService}
                    variant={"regEdit"}
                  >
                    <FaPlus /> Add Service Package
                  </Button>
                </section>

                <section className="overflow-x-scroll py-4">
                  <table className="w-full min-w-fit [&_td]:p-2 [&_th]:p-2">
                    <thead>
                      <tr className="border-b-2">
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.detailServices?.length > 0 &&
                        data?.detailServices?.map((service, index) => (
                          <tr
                            className="border-b"
                            key={` -${service?.package_id}-${index}-${service.service_package_id}`}
                          >
                            <td className="text-center">{index + 1}</td>
                            <td>{service?.service?.name}</td>
                            <td>{formatPrice(service?.service?.price || 0)}</td>
                            <td>
                              {service?.service?.category === 2
                                ? "individu"
                                : "group"}
                            </td>
                            <td className="flex gap-2 items-center justify-center">
                              <Button
                                onClick={() =>
                                  handleDeleteService(service.service)
                                }
                                disabled={!service.status_created}
                                variant={"regDanger"}
                              >
                                <FaTimes />
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </section>
              </SingleContentWrapper>
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
        <Modal title="Package Day" isOpen={isOpen} onClose={toggleModal}>
          <Formik
            initialValues={
              formType === "activity"
                ? getActivityInitialValues
                : formType === "day" || formType === "update"
                ? dayInitialValues
                : getServiceInitialValues
            }
            onSubmit={handleSubmit}
            validationSchema={
              formType === "day" || formType === "update"
                ? packageDayFormSchema
                : formType === "activity"
                ? detailPackageFormSchema
                : serviceFormSchema
            }
            enableReinitialize
          >
            <ModifyPackageForm
              packageDays={data?.packageDays}
              isPending={isPending}
              formType={formType}
              isUpdate={!!dayInitialValues.day}
            />
          </Formik>
        </Modal>
      </div>
    )
  );
};

export default ModifyPackagePage;
