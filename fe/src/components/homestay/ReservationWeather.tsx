import { OpenMeteoDailyResponse } from "@/type/schema/OpenMeteoSchema";
import React from "react";
import ImgWeather from "../common/ImgWeather";
import { getWeatherCode } from "@/lib/getWeactherCode";
import dayjs from "dayjs";

type Props = {
  weathers?: OpenMeteoDailyResponse | null; 
};

const ReservationWeather: React.FC<Props> = ({ weathers }) => {
  return (
    <section className="mb-8  space-y-4 ">
      <p className="font-medium">Weather prediction for the Next 14 days</p>
      <div
        style={{ maxHeight: "calc(140px + 1rem)" }}
        className="w-full  overflow-auto mb-8 pb-2"
      >
        {weathers && weathers?.daily?.time?.length > 0 ? (
          <ul className="flex gap-4 justify-center items-stretch flex-wrap">
            {weathers?.daily?.time?.map((day, index) => (
              <li
                key={`${day}-${index}-${dayjs()}`}
                className={`flex-shrink-0 h-full border rounded-lg p-4 w-32 cursor-pointer transition-colors border-gray-200 hover:border-gray-300`}
              >
                <div className="text-sm font-bold text-gray-700 mb-2">
                  {day}
                </div>
                <div className="flex justify-center mb-3">
                  <ImgWeather
                    weatherIcon={getWeatherCode(
                      weathers?.daily?.weathercode?.[index]
                    )}
                  />
                </div>
                <div className="text-xs font-semibold text-center text-gray-600">
                  <p>Min: {weathers?.daily?.temperature_2m_min?.[index]} °C</p>
                  <p>Max: {weathers?.daily?.temperature_2m_max?.[index]} °C</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">
            No weather data available
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationWeather;
