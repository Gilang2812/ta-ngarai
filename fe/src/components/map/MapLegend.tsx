import { STROKE_COLOR } from "@/data/strokeColor";
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
        className={` p-4 rounded-sm shadow bg-white [&_div]:flex [&_div]:gap-2 [&_div]:items-center [&_p]:font-normal [&_span]:h-4 [&_span]:w-4   [&_span]:rounded-full`}
      >
        <h4 className="font-extrabold">Legend</h4>
        <div>
          <span className="bg-purple-500"></span>
          <p>Malaysia</p>
        </div>
        <div>
          <span className="bg-rose-600"></span>
          <p>Singapura</p>
        </div>
        <div>
          <span className="bg-yellow-300"></span>
          <p>Brunei</p>
        </div>
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
        {
          Object.keys(STROKE_COLOR).map((key) => (
            <div key={key}>
              <span style={{ width: 38, height: 4, background: STROKE_COLOR[key as keyof typeof STROKE_COLOR] }}></span>
              <p>{key} boundry</p>
            </div>
          ))
        }
      </div>
    </section>
  );
}
