import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { HiXMark } from "react-icons/hi2";

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={onClose}>
        <div className={`fixed overflow-x-hidden inset-0 flex transition-ease-in-out ${isOpen ? "bg-black/25" : " bg-none"}  justify-center p-8`}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0 -translate-y-1/4"
            enterTo="opacity-100 Translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 Translate-y-0"
            leaveTo="opacity-0 -translate-y-1/4"
          >
            <DialogPanel className="w-full max-w-lg   h-fit overflow-hidden bg-white rounded  shadow-lg transform transition-all">
              <DialogTitle
                as="h3"
                className="text-lg capitalize px-4 py-2 flex justify-between items-center font-bold border-b  text-gray-900"
              >
                {title}
                <button
                  type="button"
                  className="px-4 py-2 font-light text-3xl transition-ease-in-out  text-slate-500 rounded-md hover:text-slate-900"
                  onClick={onClose}
                >
                  <HiXMark className="font-light" />
                </button>
              </DialogTitle>
              <div className=" p-4  ">{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
