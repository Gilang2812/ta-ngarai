import React from "react";
import { Transition } from "@headlessui/react";
import { ModalProps } from "@/type/props/ModalProps";
import { FaXmark } from "react-icons/fa6";

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <div className="fixed inset-0 z-50 border border-black font-quicksand w-5xl font-bold flex items-center justify-center bg-black/50  ">
        <div>
          <header className="bg-white p-4 flex justify-between text-2xl">
            <h1> Video</h1>
            <button onClick={closeModal} className=" text-gray-500">
              <FaXmark />
            </button>
          </header>
          <section> 
            <video width="800" height="600" controls>
              <source src="/videos/landing_page.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
