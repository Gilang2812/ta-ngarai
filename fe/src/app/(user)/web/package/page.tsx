import {
  FaCircleInfo,
  FaPlus,
  FaRegClock,
  FaSquarePlus,
  FaUserGroup,
} from "react-icons/fa6";
import Image from "next/image";

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

        {/* Daftar paket */}
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <article
            className="flex items-center gap-8"
            aria-labelledby="basic-package-title"
          >
            {/* Gambar Paket */}
            <figure className="w-44 rounded overflow-hidden aspect-[2/3]">
              <Image
                src="/"
                alt="Package image"
                width={1000}
                height={1000}
                className="w-auto h-max"
              />
            </figure>

            <div className="space-y-4">
              {/* Informasi Paket */}
              <h2 id="basic-package-title" className="text-xl font-bold">
                Basic Package
              </h2>

              <p className="bg-[#198754] px-2 rounded p-1 text-sm text-white w-fit">
                Cultural
              </p>

              <p className="flex items-center gap-1">
                <FaRegClock /> 1 Day <FaUserGroup /> Min. 15 People
              </p>

              <section className="leading-relaxed">
                <p className="capitalize">Start from</p>
                <p className="text-orange-400">Rp 2.975.000</p>

                {/* Tombol aksi untuk paket */}
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="flex items-center gap-1 px-3 py-1 capitalize bg-white border rounded text-primary w-fit border-primary"
                    role="button"
                    aria-label="More info about Basic Package"
                  >
                    <FaCircleInfo /> More Info
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1 px-3 py-1 capitalize bg-white border rounded text-primary w-fit border-primary"
                    role="button"
                    aria-label="Extend Basic Package"
                  >
                    <FaSquarePlus /> Extend
                  </a>
                </div>
              </section>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
