"use client";
import { useModal } from "@/utils/ModalUtils";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { ComponentProps } from "react";
import { baseUrl } from "@/lib/baseUrl";
import { cn } from "@/utils/common/cn";

export const ImgModal = ({
  id = "1",
  src,
  alt,
  className,
}: { id: number | string } & ComponentProps<"img">) => {
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      {/* Thumbnail */}
      <motion.img
        layoutId={`img-${id}`}
        src={`${baseUrl}/${src}`}
        alt={alt ?? ""}
        className={cn(`w-24 rounded`,className)}
        onClick={toggleModal}
      />

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
              <motion.img
                layoutId={`img-${id}`}
                src={`${baseUrl}/${src}`}
                alt={alt ?? ""}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
