"use client";
import { useModal } from "@/utils/ModalUtils";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps } from "react";
import { FaXmark } from "react-icons/fa6";
import ImgCraft from "./ImgCraft";

export const ImgModal = ({
  id = "1",
  src,
  alt,
  className,
  ...props
}: { id: number | string } & ComponentProps<typeof ImgCraft>) => {
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      {/* Thumbnail */}
      <motion.div layoutId={`img-${id}`} onClick={toggleModal}>
        <ImgCraft className={className} src={src} alt={alt} {...props} />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleModal}
          >
            <motion.div
              layoutId={`img-${id}`}
              className="relative max-w-2xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleModal();
                }}
                className="absolute top-2 right-2 p-2 hover:bg-white/50 text-white bg-gray-800/50 rounded-full"
              >
                <FaXmark />
              </button>
              <ImgCraft
                src={src}
                alt={alt}
                {...props}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
