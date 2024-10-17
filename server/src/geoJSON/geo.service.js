const {
  getAllProvinces,
  getAllKabKota,
  getAllVillages,
  getAllKecamatan,
  getAllCountry,
} = require("./geo.repository");
const fs = require("fs").promises;

const readGeoJSONFile = async (path) => {
  try {
    const data = await fs.readFile('public' + path, "utf-8");
    const parsedData = JSON.parse(data);

    
    if (parsedData.type === "FeatureCollection") {
    
      const firstFeature = parsedData.features[0];
      return firstFeature.geometry;  
    }

    return parsedData;  
  } catch (error) {
    console.error(`Error reading file at ${path}:`, error);
    return null;  
  }
};


const toGeoJSONDb = (data, type) => ({
  type: "FeatureCollection",
  features: data.map((item) => ({
    type: "Feature",
    geometry: item.geom,
    properties: {
      id: item.id,
      name: item.name,
      type: type || "",
    },
  })),
})

const toGeoJSONStatic = async (data, type) => {
  const features = await Promise.all(data.map(async (item) => {
    const geometry = await readGeoJSONFile(item.geom); 
    return {
      type: "Feature",
      geometry: geometry,
      properties: {
        id: item.id,
        name: item.name,
        type: type || "",
      },
    };
  }));

  return {
    type: "FeatureCollection",
    features: features.filter(Boolean),
  };
};

const getAllGeoJSONData = async () => {
  const negara =  await getAllCountry();
  const provinces = await getAllProvinces();
  const kabkota = await getAllKabKota();
  const kecamatan = await getAllKecamatan();
  const villages = await getAllVillages();

  const features = [
    ...await toGeoJSONDb(provinces, 'provinsi').features,
    ...await toGeoJSONDb(kabkota, "kab_kota").features,
    ...await toGeoJSONDb(negara, "negara").features,
    ...(await toGeoJSONStatic(villages, "village")).features,
    ...(await toGeoJSONStatic(kecamatan, "kecamatan")).features,
  ];

  return {
    type: "FeatureCollection",
    features: features,
  };
};

module.exports = {
  getAllGeoJSONData,
};
