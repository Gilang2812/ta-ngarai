import { LAYER_STYLES, STREET_STYLE } from "@/data/layerStyles";
import Image from "next/image";
import React from "react";

type Props = {
  isOpen: boolean;
};

export default function MapLegend({ isOpen = false }: Props) {
  return (
    <section
      className={`${!isOpen ? "max-h-0" : "max-h-[9999px]"
        } transition-all ease-in-out duration-[10s] delay-[0]  absolute z-[1]  overflow-hidden top-1/2 -translate-y-1/2 right-4 origin-top `}
    >
      <div
        className={` p-4 pb-0 rounded-sm shadow bg-white [&_div]:flex [&_div]:gap-2 [&_div]:items-center [&_p]:font-normal [&_span]:h-4 [&_span]:w-4   [&_span]:rounded-full`}
      >
        <h4 className="font-extrabold">Legend</h4>

        <div>
          <span><Image width={50} height={50} alt="icon" src="/icons/attraction.png" /></span>
          <p>Attraction</p>
        </div>
        <div>
          <span><Image width={50} height={50} alt="icon" src="/icons/culinary.png" /></span>
          <p>Culinary Place</p>
        </div>
        <div>
          <span><Image width={50} height={50} alt="icon" src="/icons/homestay.png" /></span>
          <p>Homestay</p>
        </div>
        <div>
          <span><Image width={50} height={50} alt="icon" src="/icons/souvenir.png" /></span>
          <p>Souvenir Place</p>
        </div>
        <div>
          <span><Image width={50} height={50} alt="icon" src="/icons/marker_rg.png" /></span>
          <p>Traditional House</p>
        </div>
        <div>
          <span><Image width={50} height={50} alt="icon" src="/icons/worship.png" /></span>
          <p>Worship Place</p>
        </div>

        <div  >
          <span style={{ width: 36, height: 4, background: STREET_STYLE.background }}></span>
          <p>street</p>
        </div>
      </div>
      <div
        className={` p-4 pt-0 rounded-sm bg-op shadow bg-white [&_div]:flex [&_div]:gap-2 [&_div]:items-center [&_p]:font-normal `}
      >

        {
          Object.keys(LAYER_STYLES).map((key) => (
            <div key={key}>
              <div style={{
                border: `2px solid ${LAYER_STYLES[key as keyof typeof LAYER_STYLES].border}`,

              }}>
                <span
                  style={{
                    width: 20,
                    height: 20, 
                    backgroundColor: LAYER_STYLES[key as keyof typeof LAYER_STYLES].background,
                    opacity: 0.4
                  }}
                ></span>
              </div>

              <p>{key.toLowerCase()} boundry</p>
            </div>
          ))
        }
      </div>
    </section>
  );
}
