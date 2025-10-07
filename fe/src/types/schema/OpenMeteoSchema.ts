export type OpenMeteoDailyUnits = {
  time: string;
  temperature_2m_min: string;
  temperature_2m_max: string;
  weathercode: string;
};

export type OpenMeteoDaily = {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  weathercode: number[];
};

export interface OpenMeteoDailyResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: OpenMeteoDailyUnits;
  daily: OpenMeteoDaily;
}