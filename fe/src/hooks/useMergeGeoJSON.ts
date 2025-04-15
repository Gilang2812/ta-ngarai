export const useMergeGeoJSON = (
  data: (GeoJSON.FeatureCollection |null| undefined)[]
): GeoJSON.FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: data
      .filter((item): item is GeoJSON.FeatureCollection => !!item)
      .flatMap((item) => item.features),
  };
};