import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ModalProps } from "@/types/props/ModalProps";
import { FaXmark } from "react-icons/fa6";

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div
          className={`fixed inset-0 flex transition-ease-in-out ${isOpen ? "bg-black/25" : " bg-none"
            }  justify-center p-8`}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0 -translate-y-1/4"
            enterTo="opacity-100 Translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 Translate-y-0"
            leaveTo="opacity-0 -translate-y-1/4"
          >
            <DialogPanel className="w-full max-w-5xl min-w-fit  min-h-fit overflow-hidden bg-white rounded h-fit   shadow-lg transform transition-all">
              <DialogTitle
                as="h3"
                className="text-lg px-4 py-2 flex justify-between items-center font-bold border-b  text-gray-900"
              >
                Video
                <button onClick={closeModal} className="text-gray-500 ">
                  <FaXmark />
                </button>
              </DialogTitle>
              <div className=" p-4 pb-[56.25%] relative">
                <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/P8gxZqreyOo?si=PGbOe0L5Gezdyr4x" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
