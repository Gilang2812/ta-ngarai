import { scrollToTop } from "@/utils/ScrollUtil";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
 
const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-12 right-12  transition-opacity duration-300">
      <button
        onClick={scrollToTop}
        className={`p-4 bg-primary transition-ease-in-out text-white  hover:bg-success transition opacity-0 ${
          isVisible ? "opacity-100" : ""
        }`}
        aria-label="Scroll to top"
        style={{ pointerEvents: isVisible ? "auto" : "none" }} // Disable pointer events when hidden
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default ScrollToTop;
