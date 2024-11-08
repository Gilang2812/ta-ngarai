import { MdOutlinePinDrop, MdOutlineVisibility } from "react-icons/md";
import { TbCurrentLocation } from "react-icons/tb";
import { MapControlItem } from "@/components/global/MapControlItem";
import { FaLocationArrow } from "react-icons/fa6";

type MapControlProps = {
  current: ()=>void;
  manual: ()=>void;
  goTO: ()=>void;
  legend: ()=>void;
}
export default function MapControls({current,goTO,legend,manual}:MapControlProps) {
  return (
    <nav className="flex gap-4">
      <h1>Google Maps With Location</h1>
    
      <MapControlItem
        icon={TbCurrentLocation }
        onClick={current}
        label="My Location" 
      />
      <MapControlItem
        icon={MdOutlinePinDrop }
        onClick={manual}
        label="Manual Location" 
      />
      <MapControlItem
        icon={MdOutlineVisibility }
        onClick={legend}
        label="My Location" 
      />
      <MapControlItem
        icon={FaLocationArrow }
        onClick={goTO}
        label="My Location" 
      />
 
    </nav>
  );
}
