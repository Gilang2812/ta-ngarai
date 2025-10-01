import { cities } from "@/data/cities"; 
import { OverlayView } from "@react-google-maps/api";
import Image from "next/image";
import React from "react";

type Props = {
  showAirPlane: boolean;
};

const DirectionGuide = ({ showAirPlane }: Props) => {
  return (
    showAirPlane &&
    cities.map(
      (city, index) =>
        city.routes.length > 0 && (
          <OverlayView
            key={index}
            position={city.coords}
            mapPaneName={OverlayView.FLOAT_PANE}
          >
            <div className="w-fit   z-50 bg-white border shadow-md rounded p-2 text-sm">
              <h1 className="font-bold text-nowrap text-red-600 flex capitalize items-center gap-2">
                From{" "}
                {city.name === "BANDA_ACEH"
                  ? "Aniwhere In Sumatra"
                  : city.name.replaceAll("_", " ").toLowerCase()}
                <Image
                  alt="country"
                  src={city.iconUrl ?? "/icons/id.svg"}
                  width={20}
                  height={20}
                />
              </h1>
              {city.routes && city.routes.length > 0 && (
                <ul className="list-decimal text-[0.6rem] list-outside   text-nowrap px-4     ">
                  {city.routes.map((route, i) => (
                    <li key={i}>{route}</li>
                  ))}
                </ul>
              )}
            </div>
          </OverlayView>
        )
    )
  );
};

export default DirectionGuide;
