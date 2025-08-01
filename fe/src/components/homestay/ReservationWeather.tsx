import { OpenMeteoDailyResponse } from "@/type/schema/OpenMeteoSchema";
import React from "react";
import ImgWeather from "../common/ImgWeather";
import { getWeatherCode } from "@/lib/getWeactherCode";

type Props = {
  weathers?: OpenMeteoDailyResponse;
};

const ReservationWeather: React.FC<Props> = ({ weathers }) => {
  return (
    <header className="mb-8 space-y-4 ">
      <h2 className="text-secondary capitalize text-2xl">
        Homestay Reservation
      </h2>
      <p className="font-medium">Weather prediction for the Next 14 days</p>
      <div
        style={{ maxHeight: "calc(140px + 1rem)" }}
        className="w-full  overflow-auto mb-8 pb-2"
      >
        <ul className="flex gap-4 justify-center items-stretch flex-wrap">
          {weathers?.daily?.time?.map((day, index) => (
            <li
              key={`${day}-${index}`}
              className={`flex-shrink-0 h-full border rounded-lg p-4 w-32 cursor-pointer transition-colors border-gray-200 hover:border-gray-300`}
            >
              <div className="text-sm font-bold text-gray-700 mb-2">{day}</div>
              <div className="flex justify-center mb-3">
                <ImgWeather
                  weatherIcon={getWeatherCode(
                    weathers.daily.weathercode[index]
                  )}
                />
              </div>
              <div className="text-xs font-semibold text-center text-gray-600">
                <p>Min: {weathers.daily.temperature_2m_min[index]} °C</p>
                <p>Max: {weathers.daily.temperature_2m_max[index]} °C</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default ReservationWeather;