import React from "react";
import { Table } from "../common/Table";
import TableHeaderManagement from "../admin/TableHeaderManagement";
import { useManagePackageReservation } from "@/hooks/useManagePackageReservation";
import TableManagementHeader from "../admin/TableManagementHeader";
import ManagementFooter from "../admin/ManagementFooter";
import dayjs from "dayjs";
import Link from "next/link";
import { ROUTES } from "@/data/routes";
import { FaCircleInfo, FaComments } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import ManagementSkeletonLoader from "../loading/ManagementSkeletonLoader";
import {
  getReservationStatus,
  getReservationStatusClass,
} from "@/utils/common/getReservationStatus";
import { InfoModal } from "../modal/InfoModal";
import ReservationStep from "../reservation/ReservationStep";

const ManagePackageReservation = () => {
  const {
    isLoading,
    searchTerm,
    handleSearch,
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
    handleHistoryClick,
    isOpen,
    toggleModal,
    reservation,
  } = useManagePackageReservation();

  if (isLoading) return <ManagementSkeletonLoader />;

  return (
    currentItems && (
      <section>
        <TableManagementHeader
          handleItemsPerPage={handleItemsPerPage}
          handleSearch={handleSearch}
          itemsPerPage={itemsPerPage}
          searchTerm={searchTerm}
        />
        <Table>
          <TableHeaderManagement
            headers={[
              "ID",
              "Customer",
              "Package Name",
              "Request Date",
              "Check In",
              "Status",
            ]}
          />
          <tbody>
            {currentItems?.map((item, index) => (
              <tr className="text-sm" key={item.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.id}</td>
                <td>{item?.customer?.fullname || item?.customer?.username}</td>
                <td>{item?.package?.name ?? "only homestay reservation"}</td>
                <td>
                  {dayjs(item.request_date).format("DD MMMM YYYY, HH:mm:ss A")}
                </td>
                <td>
                  {dayjs(item.check_in).format("DD MMMM YYYY, HH:mm:ss A")}
                </td>
                <td>
                  <div className="flex  items-center justify-center">
                    <span
                      className={getReservationStatusClass(
                        getReservationStatus(item)
                      )}
                    >
                      {getReservationStatus(item).replaceAll("-", "")}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="py-2 gap-2 flex flex-wrap justify-center xl:flex-nowrap">
                    <Link
                      href={
                        item.package_id
                          ? ROUTES.DETAIL_RESERVATION(item.id)
                          : ROUTES.DETAIL_RESERVATION_HOMESTAY(item.id)
                      }
                      className="p-3 transition-ease-in-out bg-white border rounded border-primary text-primary hover:bg-primary hover:text-white"
                      aria-label="View Details"
                    >
                      <FaCircleInfo />
                    </Link>
                    <button
                      onClick={() => handleHistoryClick(item)}
                      className="transition ease-in-out duration-300 bg-white border border-green-700 text-green-700 hover:bg-green-700 p-3 hover:text-white rounded"
                      aria-label="Comment on reservation R0055"
                    >
                      <FaHistory />
                    </button>
                    <Link
                      href={ROUTES.DETAIL_RESERVATION_REVIEW(item.id)}
                      className="transition ease-in-out duration-300 bg-white border border-cyan-400 text-cyan-400 hover:bg-cyan-400 p-3 hover:text-white rounded"
                      aria-label="Chat about reservation R0055"
                    >
                      <FaComments />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ManagementFooter
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={totalItems}
        />
        <InfoModal
          isOpen={isOpen}
          onClose={() => {
            toggleModal();
          }}
          title="history reservation"
        >
          <ReservationStep reservation={reservation} />
        </InfoModal>
      </section>
    )
  );
};

export default ManagePackageReservation;
