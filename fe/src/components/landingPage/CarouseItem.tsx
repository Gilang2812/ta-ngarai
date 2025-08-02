import useToggleOpen from "@/hooks/useToggleOpen";
import Image from "next/image"; 
import { FaInfo, FaX } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

export const CarouselItem = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  const { isOpen, toggle } = useToggleOpen();

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="h-full w-full object-cover"
      />
      <motion.button
        layoutId="info-button"
        className="text-white absolute top-4 right-4 rounded-full z-10 p-3 active:bg-white/30 hover:scale-110 transition-all bg-black/30"
        onClick={toggle}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="info"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaInfo />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaX />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" absolute inset-0 bg-black/50 text-white p-4 flex flex-col justify-end pb-24"
          >
            <motion.dl
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center  "
            >
              <dt className="text-2xl font-bold mb-2">{title}</dt>
              <dd className="text-lg">{description}</dd>
            </motion.dl>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
};
