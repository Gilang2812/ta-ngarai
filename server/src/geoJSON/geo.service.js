const { read } = require("fs");
const {
  findAllProvinces,
  findAllKabKota,
  findAllVillages,
  findAllKecamatan,
  findAllCountry,
} = require("./geo.repository");
const fs = require("fs").promises;

const readFile = async (path) => {
  try {
    const data = await fs.readFile("public" + path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file at ${path}:`, error);
    return null;
  }
};

const readGeoJSONFile = async (path) => {
  try {
    const data = await fs.readFile("public" + path, "utf-8");
    const parsedData =await readFile(path);
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
});

const toGeoJSONStatic = async (data, type) => {
  const features = await Promise.all(
    data.map(async (item) => {
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
    })
  );

  return {
    type: "FeatureCollection",
    features: features.filter(Boolean),
  };
};

const getAllGeoJSONData = async () => {
  const negara = await getAllCountry();
  const provinces = await getAllProvinces();
  const kabkota = await getAllKabKota();
  const kecamatan = await getAllKecamatan();
  const villages = await getAllVillages();

  const features = [
    ...(await provinces.features),
    ...(await kabkota.features),
    ...(await negara.features),
    ...(await villages.features),
    ...(await kecamatan.features),
  ];

  return {
    type: "FeatureCollection",
    features: features,
  };
};

const getAllCountry = async () => {
  const country = toGeoJSONDb(await findAllCountry(), "negara");
  return country;
};

const getAllProvinces = async () => {
  const provinces = toGeoJSONDb(await findAllProvinces(), "provinsi");
  return provinces;
};

const getAllKabKota = async () => {
  const kabKota = toGeoJSONDb(await findAllKabKota(), "kab_kota");
  return kabKota;
};
const getAllKecamatan = async () => {
  const kecamatan = toGeoJSONStatic(await findAllKecamatan(), "kecamatan");
  return kecamatan;
};
const getAllVillages = async () => {
  const villages = toGeoJSONStatic(await findAllVillages(), "village");
  return villages;
};

const getStreets = async () => {
  const streets = await readFile("/map/valid_street.geojson");
  return streets;
  // Not implemented yet
};

module.exports = {
  getAllGeoJSONData,
  getAllCountry,
  getAllProvinces,
  getAllKabKota,
  getAllKecamatan,
  getAllVillages,
  getStreets,
};
