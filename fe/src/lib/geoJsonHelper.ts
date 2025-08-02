import { Feature, MultiPolygon } from "geojson";

export function getFeatureCentroid(
  feature: GeoJSON.Feature
): google.maps.LatLngLiteral | null {
  const geometry = feature.geometry;
  if (!geometry) return null;

  if (geometry.type === "GeometryCollection") {
    const geometries = geometry.geometries;
    if (!geometries || geometries.length === 0) return null;

    // Ambil centroid dari semua geometry lalu ambil rata-ratanya
    const centroids = geometries
      .map((geom) => getGeometryCentroid(geom))
      .filter((c): c is google.maps.LatLngLiteral => c !== null);

    if (centroids.length === 0) return null;

    const avgLat =
      centroids.reduce((sum, c) => sum + c.lat, 0) / centroids.length;
    const avgLng =
      centroids.reduce((sum, c) => sum + c.lng, 0) / centroids.length;
    return { lat: avgLat, lng: avgLng };
  }

  // Untuk geometry biasa
  return getGeometryCentroid(geometry);
}

function getGeometryCentroid(
  geometry: GeoJSON.Geometry
): google.maps.LatLngLiteral | null {
  switch (geometry.type) {
    case "Point": {
      const [lng, lat] = geometry.coordinates as number[];
      return { lat, lng };
    }

    case "Polygon": {
      const coords = geometry.coordinates[0]; // Outer ring
      return getCoordsCentroid(coords);
    }

    case "MultiPolygon": {
      const coords = geometry.coordinates[0][0]; // First polygon's outer ring
      return getCoordsCentroid(coords);
    }

    default:
      return null;
  }
}

function getCoordsCentroid(coords: number[][]): google.maps.LatLngLiteral {
  let totalX = 0,
    totalY = 0;
  coords.forEach(([lng, lat]) => {
    totalX += lng;
    totalY += lat;
  });

  const numPoints = coords.length;
  return {
    lat: totalY / numPoints,
    lng: totalX / numPoints,
  };
}

export function addLabelsFromGeoJSON(
  map: google.maps.Map,
  data: GeoJSON.FeatureCollection
) {
  data.features.forEach((feature) => {
    const type = feature.properties?.type?.toLowerCase();
    const name = feature.properties?.name?.toLowerCase();
    const centroid = getFeatureCentroid(feature);

    // ✅ Filter sesuai kondisi
    const isAllowed =
      type === "negara" ||
      (type === "kab_kota" && name === "kota padang") ||
      (type === "village" && name === "koto gadang");
    if (isAllowed && centroid && name) {
      new google.maps.Marker({
        position: centroid,
        map,
        label: {
          text: feature.properties?.name,
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: "bold",
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0, // biar invisible
        },
      });
    }
  });
}

export const geometryToFeature = (geom: MultiPolygon): Feature => {
  return {
    type: "Feature",
    geometry: geom,
    properties: {},
  };
};
