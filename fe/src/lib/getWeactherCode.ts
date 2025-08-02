const weatherCode: { [key: number]: string } = {
  0: "01d", // Cerah (siang)
  1: "02d", // Sebagian berawan (siang)
  2: "02d", // Sebagian berawan (siang)
  3: "03d", // Berawan
  45: "50d", // Berkabut
  48: "50d", // Berkabut
  51: "09d", // Gerimis ringan
  53: "09d", // Gerimis sedang
  55: "09d", // Gerimis lebat
  61: "10d", // Hujan ringan
  63: "10d", // Hujan sedang
  65: "10d", // Hujan lebat
  80: "09d", // Hujan deras (singkat)
  81: "09d", // Hujan deras (singkat)
  82: "09d", // Hujan deras (singkat)
  95: "11d", // Badai petir
  96: "11d", // Badai petir (sangat kuat)
  99: "11d", // Badai petir (sangat kuat)
};

export const getWeatherCode = (weatherId: number): string => {
  return weatherCode[weatherId] || "01d";
};
