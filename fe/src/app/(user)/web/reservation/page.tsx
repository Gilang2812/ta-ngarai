import { DeleteButton } from "@/components/global/DeleteButton";
import { InfoButton } from "@/components/global/InfoButton";
import { NextPage } from "next";
import { FaHistory } from "react-icons/fa";
import { FaCircleInfo, FaComments, FaTrash } from "react-icons/fa6";

const Reservation = () => {
  return (
    <main className="bg-white p-5 rounded-xl">
      <header className="text-center capitalize mb-12">
        <h2>List Reservation</h2>
      </header>
      <section>
        <table className="w-full">
          <caption className="text-left text-gray-500 pb-4">
            Reservation List with Status and Actions
          </caption>
          <thead>
            <tr className="border-b-2">
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
            <tr className="py-2 border-b">
              <td className="py-2">1</td>
              <td className="py-2">R0055</td>
              <td className="py-2">1 Day Sumpu Trip</td>
              <td className="py-2">27 July 2024, 17:21:00</td>
              <td className="py-2">08 August 2024, 09:00:00</td>
              <td className="py-2">Waiting</td>
              <td className="py-2 space-x-2">
                <InfoButton />{" "}
                <button
                  className="transition ease-in-out duration-300 bg-white border border-green-700 text-green-700 hover:bg-green-700 p-3 hover:text-white rounded"
                  aria-label="Comment on reservation R0055"
                >
                  <FaComments />
                </button>
                <button
                  className="transition ease-in-out duration-300 bg-white border border-cyan-400 text-cyan-400 hover:bg-cyan-400 p-3 hover:text-white rounded"
                  aria-label="Chat about reservation R0055"
                >
                  <FaComments />
                </button>
               <DeleteButton />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Reservation;
