function validateAndClosePolygon(geoJson) {
  if (!Array.isArray(geoJson.coordinates)) {
    throw new Error("Data GeoJSON tidak valid atau bukan tipe Polygon.");
  }

  const ring = geoJson.coordinates[0];
  const first = ring[0];
  const last = ring[ring.length - 1];

  // Cek apakah titik pertama dan terakhir sudah sama
  const isClosed = first[0] === last[0] && first[1] === last[1];

  if (!isClosed) {
    console.log("Polygon belum tertutup. Menambahkan titik penutup...");
    ring.push([...first]); // Salin titik pertama ke akhir
  } else {
    console.log("Polygon sudah tertutup.");
  }

  geoJson.coordinates[0] = ring;
  return geoJson;
}

module.exports = {validateAndClosePolygon}
