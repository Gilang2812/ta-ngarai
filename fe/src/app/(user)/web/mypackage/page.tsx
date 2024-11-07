import {
 
  FaCaretDown,
  FaCompass,
} from "react-icons/fa6";
import Image from "next/image"; 
import { TbCurrentLocation } from "react-icons/tb";
import { MdOutlinePinDrop, MdOutlineVisibility } from "react-icons/md";

export default function MyPackage() {
  return (
    <main className="space-y-8 font-bold">
      <section className="grid grid-cols-12 gap-6">
        <section className="h-full col-span-8 p-5 pt-8 bg-white rounded-lg">
          <header className="flex gap-3 text-lg">
            <h1>Google Maps With Location</h1>
            <button
              aria-label="Settings"
              className="p-2 px-3 ml-4 text-white rounded-lg bg-customBlue hover:bg-customBg focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <TbCurrentLocation fontSize="small" />
            </button>
            <button
              aria-label="My Location"
              className="p-2 px-3 text-white rounded-lg bg-customBlue hover:bg-customBg focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <MdOutlinePinDrop fontSize="small" />
            </button>
            <button
              aria-label="Legend"
              className="p-2 px-3 text-white rounded-lg bg-customBlue hover:bg-customBg focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <MdOutlineVisibility fontSize="small" />
            </button>
          </header>
        </section>

        <section className="col-span-4 p-5 bg-white rounded-lg">
          <header className="space-y-8 text-lg text-center">
            <h2 className="text-xl capitalize">
              Explore village with our package
            </h2>
          </header>

          <section className="max-h-[450px] overflow-x-hidden px-4">
            <table className="w-full overflow-x-hidden text-base capitalize">
              <caption className="sr-only">
                Package information for village exploration
              </caption>
              <thead>
                <tr className="border-b-2">
                  <th scope="col" className="py-6">
                    Package Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex items-center gap-4 p-4 capitalize border-b">
                    <Image
                      src=''
                      alt="Trip to 1 Koto Gadang"
                      width={1000}
                      height={1000}
                      className="size-12"
                    />{" "}
                    1 koto gadang trip
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start p-6 border-b">
                    <div className="flex items-stretch">
                      <button
                        aria-label="View Day 1 activities"
                        className="h-full p-2 text-white rounded-l bg-customBlue hover:bg-customBg"
                        type="button"
                      >
                        Day 1
                      </button>
                      <button
                        aria-label="Expand Day 1 activities"
                        className="h-10 p-2 text-white rounded-r bg-customBlue hover:bg-customBg"
                        type="button"
                      >
                        <FaCaretDown />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <footer className="px-4 pt-6">
            <button
              type="button"
              className="flex items-center gap-4 px-3 py-2 font-normal border rounded border-customBlue text-customBlue"
            >
              <FaCompass /> Search object around you?
            </button>
          </footer>
        </section>
      </section>
    </main>
  );
}
