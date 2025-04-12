const { Provinsi } = require('../../models/ProvinsiModel.js');
const { KabKota } = require('../../models/KabKotaModel.js');
const {Village} = require('../../models/VillageModel.js');
const { Kecamatan } = require('../../models/KecamatanModel.js');
const { Negara } = require('../../models/CountryModel.js');

const findAllKecamatan = async () => {
  return await Kecamatan.findAll();
};
const findAllVillages = async () => {
  return await Village.findAll();
};
const findAllKabKota = async () => {
  return await KabKota.findAll();
};
const findAllProvinces = async () => {
  return await Provinsi.findAll();
};
const findAllCountry = async () => {
  return await Negara.findAll();
};

module.exports = {
  findAllProvinces,findAllKabKota,findAllVillages,findAllKecamatan,findAllCountry
};
