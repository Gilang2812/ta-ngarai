import { PackageList } from "@/components/web/package/PackageList";
import { FaPlus } from "react-icons/fa6";

export default function   Package() {
  return (
    <section className="p-5 min-w-fit overflow-hidden bg-white rounded-xl">
      <header className="text-lg text-center">
        <h1>Available Packages</h1>
      </header>

      <section className="min-w-fit space-y-6">
        {/* Tombol untuk membuat paket baru */}
        <button
          type="button"
          aria-label="Create custom new package"
          className="btn-fill-primary"
        >
          <FaPlus />
          Create New Custom Package
        </button>
        <PackageList />
      </section>
    </section>
  );
}
