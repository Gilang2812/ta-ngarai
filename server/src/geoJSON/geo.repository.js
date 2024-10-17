const { Provinsi } = require('../../models/ProvinsiModel.js');
const { KabKota } = require('../../models/KabKotaModel.js');
const {Village} = require('../../models/VillageModel.js');
const { Kecamatan } = require('../../models/KecamatanModel.js');
const { Negara } = require('../../models/CountryModel.js');

const getAllKecamatan = async () => {
  return await Kecamatan.findAll();
};
const getAllVillages = async () => {
  return await Village.findAll();
};
const getAllKabKota = async () => {
  return await KabKota.findAll();
};
const getAllProvinces = async () => {
  return await Provinsi.findAll();
};
const getAllCountry = async () => {
  return await Negara.findAll();
};

module.exports = {
  getAllProvinces,getAllKabKota,getAllVillages,getAllKecamatan,getAllCountry
};
