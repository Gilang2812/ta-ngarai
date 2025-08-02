import { useDropdown } from "@/utils/DropDownUtils";
import { useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

type AccordioProps = {
  children: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
};
export const Accordion = ({ children, title, defaultOpen }: AccordioProps) => {
  const { open, setOpen, toggleDropdown } = useDropdown();

  useEffect(() => {
    setOpen(defaultOpen || false);
  }, []);
  return (
    <article className="" onClick={toggleDropdown}>
      <button
        type="button"
        className={`  w-full   font-normal transition-ease-in-out  items-center text-primary border  p-3 flex px-4 capitalize ${
          open
            ? "bg-primary/15 focus:ring-4 focus:ring-primary/25 border-primary/30 rounded"
            : "bg-white"
        }`}
      >
        <h1>{title}</h1>
        <span
          className={`ml-auto ${
            open ? "rotate-180" : "rotate-0"
          } transition-ease-in-out`}
        >
          <BsChevronDown />
        </span>
      </button>
      <div
        className={` transition-ease-in-out-10 border overflow-hidden ${
          open ? "max-h-96 " : "max-h-0 "
        }`}
      >
        <div className="p-3 px-4 -z-10">{children}</div>
      </div>
    </article>
  );
};
