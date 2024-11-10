 import {
  MyLocationTwoTone,
  PinDropOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
 
import { PackageSection } from "@/components/web/explore/PackageSection";
export default function WithOurPackage() {
  return (
    <main className="font-bold space-y-8">
      <section className="grid grid-cols-12 gap-6">
        <article className="bg-white rounded-lg h-full col-span-8 p-5 pt-8 ">
          <header className="text-lg flex gap-3 ">
            <h1>Google Maps With Location</h1>
            <button className="p-2 px-3 text-white  rounded-lg ml-4 bg-primary hover:bg-secondary focus:bg-cyan-600  focus:outline-none focus:ring-4 focus:ring-blue-300">
              <Tooltip title="Settings" arrow>
                <MyLocationTwoTone fontSize="small" />
              </Tooltip>
            </button>
            <button className="p-2 px-3 text-white rounded-lg bg-primary hover:bg-secondary focus:bg-cyan-600  focus:outline-none focus:ring-4 focus:ring-blue-300">
              <Tooltip title="MyLocation" arrow>
                <PinDropOutlined fontSize="small" />
              </Tooltip>
            </button>
            <button className="p-2 px-3 text-white rounded-lg bg-primary hover:bg-secondary focus:bg-cyan-600  focus:outline-none focus:ring-4 focus:ring-blue-300">
              <Tooltip title="Legend" arrow>
                <VisibilityOutlined fontSize="small" />
              </Tooltip>
            </button>
          </header>
        </article>
       <PackageSection />
      </section>
    </main>
  );
}
