import React, { useState } from "react";
import { DeleteButton } from "@/components/common/DeleteButton";
import { InfoModal } from "@/components/modal/InfoModal";
import { SetStatus } from "@/components/reservation/SetStatus";
import { useFetchReservations } from "@/features/web/myreservation/useFetchReservations";
import { ReservationSchema } from "@/type/schema/ReservationSchema";
import { localeDate, localeDayDate } from "@/utils/localeDate";
import { useModal } from "@/utils/ModalUtils";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";

import { FaCircleInfo, FaComments } from "react-icons/fa6";
import { motion } from "framer-motion";

 
const PackageReservation = () => {
  const [reservation, setReservation] = useState<ReservationSchema | null>(
    null
  );
  const { data } = useFetchReservations();
  const { isOpen, toggleModal } = useModal();

  const handleHistoryClick = (r: ReservationSchema) => {
    toggleModal();
    setReservation(r);
  };

  const RenderReservation = () => {
    return data?.map((r, index) => (
      <tr
        key={r.id}
        className="py-2 border-b [&_td]:px-2 hover:bg-stone-200/50 transition-ease-out"
      >
        <td className="py-2">{index + 1}</td>
        <td className="py-2">{r.id}</td>
        <td className="py-2">{r.package.name}</td>
        <td>{localeDate(r.request_date)}</td>
        <td className="py-2">{localeDate(r.check_in)}</td>
        <td className="py-2 text-nowrap [&_p]:mx-auto text-center ">
          {SetStatus({ s: r.status, c: r.cancel, r: r.refund_check })}
        </td>
        <td className="py-2 gap-x-2 flex flex-wrap justify-center xl:flex-nowrap">
          <Link
            href={`./detailReservation/${r.id}`}
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
            href={`./`}
            className="transition ease-in-out duration-300 bg-white border border-cyan-400 text-cyan-400 hover:bg-cyan-400 p-3 hover:text-white rounded"
            aria-label="Chat about reservation R0055"
          >
            <FaComments />
          </Link>
          <DeleteButton />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <motion.section layoutId="reservation-list" >
        <table className="w-full ">
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
        </table>
      </motion.section>
      <InfoModal
        isOpen={isOpen}
        onClose={() => {
          setReservation(null);
          toggleModal();
        }}
        title="history reservation"
      >
        {reservation && (
          <table className="font-bold mt-4 [&_td]:pr-8">
            <tbody>
              <tr>
                <td>Status</td>
                <td className="flex items-center gap-1">
                  : {SetStatus({ s: reservation!.status })}
                </td>
              </tr>
              <tr>
                <td>Confirm Date</td>
                <td>: {localeDayDate(reservation.confirmation_date)}</td>
              </tr>
              <tr>
                <td>Feedback Admin</td>
                <td>: {`${reservation.feedback} ()`}</td>
              </tr>
            </tbody>
          </table>
        )}
      </InfoModal>
    </>
  );
};

export default PackageReservation;
