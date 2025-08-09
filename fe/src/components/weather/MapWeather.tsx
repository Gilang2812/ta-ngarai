import { useGetWeatherMap } from "@/features/weater/useGetWeatherMap";
import React  from "react";
import WeatherSkeletonLoader from "../loading/WeatherSkeletonLoader";
import ImgWeather from "../common/ImgWeather";

const MapWeather = () => {
  const { data, isLoading } = useGetWeatherMap();
  const weatherIcon = data?.weather[0].icon;
  const cityName = data?.name;
  const temperature = data?.main.temp;
  const humidity = data?.main.humidity;
  const windSpeed = data?.wind.speed;
  const weatherDescription = data?.weather[0].description;

  if (isLoading || !data) return <WeatherSkeletonLoader />;
  return (
    <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-lg shadow-sm">
      <span className="mr-3">{cityName}, ID</span>
      <ImgWeather weatherIcon={weatherIcon} />
      <span className="mr-3">{temperature}°C</span>
      <span className="mr-3 capitalize">{weatherDescription}</span>
      <span className="mr-3">Humidity: {humidity}%</span>
      <span className="mr-3">Wind: {windSpeed} m/s</span>
    </div>
  );
};

export default MapWeather;
