"use client";
import { useModal } from "@/utils/ModalUtils";
import { AnimatePresence, motion } from "framer-motion"; 
import { ComponentProps } from "react";
import { FaXmark } from "react-icons/fa6";
import ImgCraft from "./ImgCraft";

export const ImgModal = ({
  src,
  alt,
  ...props
}: ComponentProps<typeof ImgCraft>) => {
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      <ImgCraft src={src} onClick={toggleModal} alt={alt} {...props} />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <button
                className="absolute active:bg-white/50  top-2 z-10 right-2 p-2 text-white bg-gray-800/50 rounded-full"
                aria-label="Close Modal"
              >
                <FaXmark />
              </button>
              <ImgCraft
                src={src}
                onClick={(e) => e.stopPropagation()}
                alt={alt}
                {...props}
                className="max-w-2xl max-h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
