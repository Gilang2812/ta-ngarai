import { PackageList } from "@/components/web/package/PackageList";
import { FaPlus } from "react-icons/fa6";

export default function Package() {
  return (
    <section className="p-5 bg-white rounded-xl">
      <header className="text-lg text-center">
        <h1>Available Packages</h1>
      </header>

      <section className="space-y-6">
        {/* Tombol untuk membuat paket baru */}
        <button
          type="button"
          aria-label="Create custom new package"
          className="flex items-center gap-4 px-3 py-2 font-normal text-white capitalize rounded bg-primary"
        >
          <FaPlus />
          Create New Custom Package
        </button>
        <PackageList />
      </section>
    </section>
  );
}
