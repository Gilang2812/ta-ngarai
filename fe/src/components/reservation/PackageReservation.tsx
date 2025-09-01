import React from "react";
import { DeleteButton } from "@/components/common/DeleteButton";
import { InfoModal } from "@/components/modal/InfoModal";
import { ReservationDetails } from "@/type/schema/ReservationSchema";
import { localeDate } from "@/utils/localeDate";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";

import { FaCircleInfo, FaComments } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  getReservationStatus,
  getReservationStatusClass,
} from "@/utils/common/getReservationStatus";
import ManagementSkeletonLoader from "../loading/ManagementSkeletonLoader";
import { ROUTES } from "@/data/routes";
import usePackageReservation from "@/hooks/usePackageReservation";
import ReservationStep from "./ReservationStep";
import TableManagementHeader from "../admin/TableManagementHeader";
import ManagementFooter from "../admin/ManagementFooter";
import { Table } from "../common/Table";

const PackageReservation = () => {
  const {
    reservation,
    setReservation,
    isOpen,
    toggleModal,
    handleHistoryClick,
    isLoading,
    handleSearch,
    handleDeleteReservation,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
    searchTerm,
  } = usePackageReservation();

  const RenderReservation = () => {
    return currentItems?.map((r, index) => (
      <tr
        key={r.id + index}
        className="py-2 border-b [&_td]:px-2 hover:bg-stone-200/50 transition-ease-out"
      >
        <td className="py-2">{indexOfFirstItem + index + 1}</td>
        <td className="py-2">{r.id}</td>
        <td className="py-2">{r?.package?.name ?? "Homestay Reservation"}</td>
        <td>{localeDate(r.request_date)}</td>
        <td className="py-2">{localeDate(r.check_in)}</td>
        <td className="py-2 text-nowrap [&_p]:mx-auto text-center ">
          <span
            className={getReservationStatusClass(
              getReservationStatus(r as ReservationDetails)
            )}
          >
            {getReservationStatus(r as ReservationDetails).replaceAll("-", " ")}
          </span>
        </td>
        <td className="py-2 gap-x-2 flex flex-wrap justify-center xl:flex-nowrap">
          <Link
            href={
              r.package_id
                ? ROUTES.DETAIL_RESERVATION(r.id)
                : ROUTES.DETAIL_RESERVATION_HOMESTAY(r.id)
            }
            className="p-3 transition-ease-in-out bg-white border rounded border-primary text-primary hover:bg-primary hover:text-white"
            aria-label="View Details"
          >
            <FaCircleInfo />
          </Link>
          <button
            onClick={() => handleHistoryClick(r)}
            className="transition ease-in-out duration-300 bg-white border border-green-700 text-green-700 hover:bg-green-700 p-3 hover:text-white rounded"
            aria-label="Comment on reservation R0055"
          >
            <FaHistory />
          </button>
          <Link
            href={ROUTES.DETAIL_RESERVATION_REVIEW(r.id)}
            className="transition ease-in-out duration-300 bg-white border border-cyan-400 text-cyan-400 hover:bg-cyan-400 p-3 hover:text-white rounded"
            aria-label="Chat about reservation R0055"
          >
            <FaComments />
          </Link>
          <DeleteButton
            onClick={() => handleDeleteReservation(r.id)}
            disabled={
              !(
                getReservationStatus(r as ReservationDetails) ===
                "Awaiting-Approval"
              )
            }
          />
        </td>
      </tr>
    ));
  };

  if (isLoading) {
    return <ManagementSkeletonLoader />;
  }
  return (
    <>
      <motion.section layout="size" layoutId="reservation-list">
        <TableManagementHeader
          handleItemsPerPage={handleItemsPerPage}
          handleSearch={handleSearch}
          itemsPerPage={itemsPerPage}
          searchTerm={searchTerm}
        />
        <Table className="w-full ">
          <thead>
            <tr className="border-b-2 ">
              <th scope="col" className="p-2">
                #
              </th>
              <th scope="col" className="p-2">
                ID
              </th>

              <th scope="col" className="p-2">
                Package Name
              </th>
              <th scope="col" className="p-2">
                Request Date
              </th>
              <th scope="col" className="p-2">
                Check In
              </th>
              <th scope="col" className="p-2">
                Status
              </th>
              <th scope="col" className="p-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <RenderReservation />
          </tbody>
        </Table>
        <ManagementFooter
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={totalItems}
          totalPages={totalPages}
        />
      </motion.section>
      <InfoModal
        isOpen={isOpen}
        onClose={() => {
          setReservation(null);
          toggleModal();
        }}
        title="history reservation"
      >
        <ReservationStep reservation={reservation} />
      </InfoModal>
    </>
  );
};

export default PackageReservation;
