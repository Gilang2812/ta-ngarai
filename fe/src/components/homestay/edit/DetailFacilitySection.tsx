import { HomestayFacilityDetailSchema } from "@/types/schema/FacilitySchema";
import { DeleteDetailFacilitySchema } from "@/validation/facilitySchema";

import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

type DetailFacilityProps = {
  toggleFacility: () => void;
  toggleDetailFacility: () => void;
  detailsFacility: HomestayFacilityDetailSchema[];
  handleDeletedDetailHomestayFacility: (
    body: DeleteDetailFacilitySchema
  ) => void;
};

export const DetailFacilitySection = ({
  toggleFacility,
  toggleDetailFacility,
  detailsFacility,
  handleDeletedDetailHomestayFacility,
}: DetailFacilityProps) => {
  return (
    <>
      <section className="bg-white rounde   d-xl p-4 space-y-4">
        <h4>Facility</h4>

        <div className="flex">
          <button
            type="button"
            onClick={toggleFacility}
            className="rounded-l border-y border-l border-primary font-normal hover:bg-primary hover:text-white transition-ease-in-out   text-primary flex gap-2 px-3 py-2 items-center "
          >
            <FaPlus /> New facility
          </button>
          <button
            onClick={toggleDetailFacility}
            type="button"
            className="rounded-r border border-cyan-400 font-normal text-cyan-400 hover:bg-cyan-400 hover:text-black transition-ease-in-out flex gap-2 px-3 py-2 items-center "
          >
            <FaPlus /> New facility Homestay
          </button>
        </div>
        <table className="w-full [&_tr]:border-b [&_td]:p-2 [&_th]:py-2 divide-y">
          <thead>
            <tr>
              <th>No</th>
              <th>Facility</th>
              <th>description</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {detailsFacility.map((d, i) => (
              <tr key={i}>
                <td className="text-center">{i + 1}</td>
                <td>{d.facility.name}</td>
                <td>{d.description}</td>
                <td>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() =>
                        handleDeletedDetailHomestayFacility({
                          homestay_id: d.homestay_id,
                          facility_homestay_id: d.facility_homestay_id,
                        })
                      }
                      type="button"
                      className="bg-red-600 font-normal rounded hover:bg-red-700 transition-ease-in-out p-2 text-white"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
