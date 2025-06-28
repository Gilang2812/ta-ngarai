import { FaPlay } from "react-icons/fa";
import Modal from "../modal/ModalVideo";
import { useModal } from "@/utils/ModalUtils";
import Image from "next/image";

export default function WelcomeSection() {
  const { isOpen, toggleModal } = useModal();
  return (
    <aside className="relative h-full min-h-fit md:min-w-[640px] min-w-fit  font-quicksand  bg-red-400 z-20">
      <Image
        src="/images/bg-header.jpg"
        alt="bg"
        width={500}
        height={500}
        priority
        className="w-full h-full object-cover bg-cover   "
      />
      <section className="absolute inset-0 pr-52 px-20 leading-tight pt-12 text-wrap bg-black/70 text-white text-lpCustom gap-4 font-bold flex flex-col justify-center items-start">
        <h2 className="text-custom">Welcome to </h2>
        <h1>Desa Wisata Nagari Koto Gadang</h1>
        <div className="flex text-lg mt-4  gap-8 items-center">
          <a
            href="/web"
            className="hover:bg-success text-lg mr-12 transition-ease-in-out bg-primary  py-2  px-4 lg:py-4 lg:px-8"
          >
            Explore
          </a>
          <div className="animate-FadeIn ">
            <div className="absolute bg-white rounded-full h-16 w-16 flex items-center justify-center animate-ping"></div>
            <button
              onClick={toggleModal}
              id="buttonPlay"
              className="bg-white p-4 size-16  flex items-center justify-center rounded-full relative"
            >
              <FaPlay className="ml-1 mt-1 text-primary" />
            </button>
          </div>
          <label htmlFor="buttonPlay">Watch Video</label>
        </div>
      </section>
      <Modal isOpen={isOpen} closeModal={toggleModal} />
    </aside>
  );
}
