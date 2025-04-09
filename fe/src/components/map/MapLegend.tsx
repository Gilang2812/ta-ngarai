import React from "react";

type Props = {
    isOpen :boolean
};

export const MapLegend = ({isOpen=false}: Props) => {
  return (
    <section className={`${!isOpen?'max-h-0':'max-h-[9999px]'} transition-all ease-in-out duration-[10s] delay-[0]  absolute z-[1]  overflow-hidden top-1/2 -translate-y-1/2 right-4 origin-top `}>
     <div className={` p-4 rounded-sm shadow bg-white [&_div]:flex [&_div]:gap-2 [&_div]:items-center [&_p]:font-normal [&_span]:h-4 [&_span]:w-4   [&_span]:rounded-full`}>
        
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
        <span></span>
        <p>Actraction</p>
      </div>
      <div>
        <span></span>
        <p>Culinary Place</p>
      </div>
      <div>
        <span></span>
        <p>Souvenir Place</p>
      </div>
      <div>
        <span></span>
        <p>Worship Place</p>
      </div>
     </div>
    </section>
  );
};
