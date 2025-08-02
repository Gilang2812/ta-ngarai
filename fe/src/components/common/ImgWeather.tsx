import Image from "next/image";
import React from "react";

type Props = {
  weatherIcon: string;
};

const ImgWeather = ({ weatherIcon }: Props) => {
  return (
    <Image
      src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
      width={50}
      height={50}
      alt="Weather Icon"
      className="mr-3 [filter:drop-shadow(2px_2px_4px_rgba(0,0,0,0.5))]"
    />
  );
};

export default ImgWeather;
