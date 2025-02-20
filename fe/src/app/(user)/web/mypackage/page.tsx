import { TbCurrentLocation } from "react-icons/tb";
import { MdOutlinePinDrop, MdOutlineVisibility } from "react-icons/md";
import { PackageSection } from "@/components/web/myPackage/PackageSection";
import { ContentDiffSplitted } from "@/components/global/ContentDiffSplitted";

export default function MyPackage() {
  const Maps = () => {
    return (
      <section className="h-full col-span-8 p-5 pt-8 bg-white rounded-lg">
        <header className="flex gap-3 text-lg">
          <h1>Google Maps With Location</h1>
          <button
            aria-label="Settings"
            className="p-2 px-3 ml-4 text-white rounded-lg bg-primary hover:bg-secondary focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <TbCurrentLocation fontSize="small" />
          </button>
          <button
            aria-label="My Location"
            className="p-2 px-3 text-white rounded-lg bg-primary hover:bg-secondary focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <MdOutlinePinDrop fontSize="small" />
          </button>
          <button
            aria-label="Legend"
            className="p-2 px-3 text-white rounded-lg bg-primary hover:bg-secondary focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <MdOutlineVisibility fontSize="small" />
          </button>
        </header>
      </section>
    );
  };
  return (
    <main className="space-y-8 font-bold">
      <ContentDiffSplitted left={<Maps />} right={<PackageSection />} />
    </main>
  );
}
