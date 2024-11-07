import { MdOutlinePinDrop, MdOutlineVisibility } from "react-icons/md";
import { TbCurrentLocation } from "react-icons/tb";

export default function MapControls() {
  return (
    <nav className="flex gap-4">
      <h1>Google Maps With Location</h1>
      <button
        aria-label="Settings"
        className="p-2 px-3 ml-4 text-white rounded-lg bg-customBlue hover:bg-customBg focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <TbCurrentLocation fontSize="small" />
      </button>
      <button
        aria-label="My Location"
        className="p-2 px-3 text-white rounded-lg bg-customBlue hover:bg-customBg focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <MdOutlinePinDrop fontSize="small" />
      </button>
      <button
        aria-label="Legend"
        className="p-2 px-3 text-white rounded-lg bg-customBlue hover:bg-customBg focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <MdOutlineVisibility fontSize="small" />
      </button>
    </nav>
  );
}
