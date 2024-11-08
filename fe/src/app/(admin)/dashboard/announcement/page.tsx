import { FaPlus, FaTrash, FaCircleInfo, FaPencil } from "react-icons/fa6";

export default function Announcement() {
  return (
    <main className="p-5 space-y-5 bg-white rounded-xl">
      <header className="text-lg capitalize">
        <h1>Manage Announcement</h1>
      </header>

      <section className="py-6 space-y-8">
        <button
          type="button"
          className="flex flex-row items-center gap-4 px-3 py-2 font-normal text-white rounded bg-primary"
        >
          <FaPlus /> New Announcement
        </button>

        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="p-2">#</th>
              <th className="p-2">ID</th>
              <th className="p-2">Announcement</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="py-2 border-b">
              <td className="py-2">1</td>
              <td className="py-2">AN001</td>
              <td className="py-2 text-wrap w-[500px] text-left">
                Road access to the village is still completely cut off, so
                visitors are asked to take an alternative route through Malalak
                or Solok.
              </td>
              <td className="py-2">Active</td>
              <td className="py-2 space-x-2">
                <button
                  className="p-3 transition duration-300 ease-in-out bg-white border rounded border-primary text-primary hover:bg-primary hover:text-white"
                  aria-label="View Details"
                >
                  <FaCircleInfo />
                </button>
                <button
                  className="p-3 transition duration-300 ease-in-out bg-white border rounded border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
                  aria-label="Edit Announcement"
                >
                  <FaPencil />
                </button>
                <button
                  className="p-3 text-red-600 transition duration-300 ease-in-out bg-white border border-red-600 rounded hover:bg-red-600 hover:text-white"
                  aria-label="Delete Announcement"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
