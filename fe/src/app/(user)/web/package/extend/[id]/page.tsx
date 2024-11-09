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
      <main className="p-5 bg-white rounded-xl">
        <header className="text-lg text-center">
          <h1>Package</h1>
        </header>
        <section className="space-y-6">
          <button
            type="button"
            aria-label="Create custom new package"
            className="flex items-center gap-4 px-3 py-2 font-normal text-white capitalize rounded bg-primary"
          >
            <FaPlus />
            custom new package
          </button>
  
          <div className="grid grid-flow-row grid-cols-2 gap-4">
            <article className="flex items-center gap-8">
              <figure className="w-44 rounded overflow-hidden aspect-[2/3]">
                <Image
                  src='/'
                  alt="Package image"
                  width={1000}
                  height={1000}
                  className="w-auto h-max"
                />
              </figure>
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Basic Package</h2>
                <p className="bg-[#198754] px-2 rounded p-1 text-sm text-white w-fit">
                  Cultural
                </p>
                <p className="flex items-center gap-1">
                  <FaRegClock /> 1D <FaUserGroup /> Min. 15 People
                </p>
                <section className="leading-relaxed">
                  <p className="capitalize">start from</p>
                  <p className="text-orange-400">Rp 2.975.000</p>
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      className="flex items-center gap-1 px-3 py-1 capitalize bg-white border rounded text-primary w-fit border-primary"
                      role="button"
                      aria-label="More info about basic package"
                    >
                      <FaCircleInfo /> more info
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-1 px-3 py-1 capitalize bg-white border rounded text-primary w-fit border-primary"
                      role="button"
                      aria-label="Extend basic package"
                    >
                      <FaSquarePlus /> Extend
                    </a>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>
    );
  }
  