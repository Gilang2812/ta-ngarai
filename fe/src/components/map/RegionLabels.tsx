"use client";

import { OverlayView } from "@react-google-maps/api";

type Region = {
  name: string;
  position: google.maps.LatLngLiteral;
};

type Props = {
  regions: Region[];
  showLabel: boolean;
};
export const  RegionLabel =({ regions, showLabel }: Props)=> {
  return (
    <>
      {regions?.map((region, index) => (
        <OverlayView
          key={index}
          position={region.position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            className={`${
              !showLabel
                ? "text-transparent"
                : "text-white [-webkit-text-fill-color:white] [-webkit-text-stroke:1px_black]"
            } font-sans transition w-fit font-extrabold text-base p-2 -translate-x-1/2 -translate-y-1/2`}
          >
            {region.name}
          </div>
        </OverlayView>
      ))}
    </>
  );
}
