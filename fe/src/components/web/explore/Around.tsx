import { ButtonSearchArround } from "@/components/common/ButtonSearchArround";
import { CheckBoxLabel } from "@/components/common/CheckBoxLabel"; 
import { useUserPositionStore } from "@/stores/UserPositionStore";
import { fadeMotion } from "@/utils/common/motionVariants";
import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

type ObjectAroundProps = {
  lakeSingkarak: boolean;
  rumahGadang: boolean;
  homestay: boolean;
  culinaryPlace: boolean;
  souvenirPlace: boolean;
  worshipPlace: boolean;
};

type AroundProps = {
  handleCloseAround: () => void;
  isAroundOpen: boolean;
};

export const Around = ({ handleCloseAround, isAroundOpen }: AroundProps) => {
  const [selectedOptions, setSelectedOptions] = useState<ObjectAroundProps>({
    lakeSingkarak: false,
    rumahGadang: false,
    homestay: false,
    culinaryPlace: false,
    souvenirPlace: false,
    worshipPlace: false,
  });
 
  const { userPosition,radius,setRadius } = useUserPositionStore();
  const handleArroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!userPosition) {
      Swal.fire(
        "Determine your position first!",
        "click current location or set manual location",
        "info"
      );
      return setRadius(0);
    }
    setRadius(parseInt(e.target.value));
  };

  const toggleOption = (option: keyof ObjectAroundProps) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <motion.div {...fadeMotion}>
      <h2 className="text-xl font-semibold text-center mb-4">Object Around</h2>

      <div className=" gap-2 grid grid-cols-2">
        <CheckBoxLabel
          id="lakeSingkarak"
          label="Lake Singkarak"
          checked={selectedOptions.lakeSingkarak}
          onChange={() => toggleOption("lakeSingkarak")}
        />

        <CheckBoxLabel
          id="rumahGadang"
          label="Rumah Gadang"
          checked={selectedOptions.rumahGadang}
          onChange={() => toggleOption("rumahGadang")}
        />

        <CheckBoxLabel
          id="homestay"
          label="Homestay"
          checked={selectedOptions.homestay}
          onChange={() => toggleOption("homestay")}
        />

        <CheckBoxLabel
          id="culinaryPlace"
          label="Culinary Place"
          checked={selectedOptions.culinaryPlace}
          onChange={() => toggleOption("culinaryPlace")}
        />

        <CheckBoxLabel
          id="souvenirPlace"
          label="Souvenir Place"
          checked={selectedOptions.souvenirPlace}
          onChange={() => toggleOption("souvenirPlace")}
        />

        <CheckBoxLabel
          id="worshipPlace"
          label="Worship Place"
          checked={selectedOptions.worshipPlace}
          onChange={() => toggleOption("worshipPlace")}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm ">Radius: {radius||0} m</label>
        <input
          type="range"
          min="0"
          max="2000"
          value={radius||0}
          onChange={handleArroundChange}
        />
      </div>

      <ButtonSearchArround onClick={handleCloseAround} search={isAroundOpen} />
    </motion.div>
  );
};
