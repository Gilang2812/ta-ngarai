const axiosShipping = require("../../config/axiosShipping");
const { insertShipping } = require("./shipping.repository");

const getDestination = async (params) => {
  return await axiosShipping.get(`tariff/api/v1/destination/search`, {
    params,
  });
};

const calculateShipping = async (params) => {
    return await axiosShipping.get(`/tariff/api/v1/calculate`, {
        params,
    });
};

const storeShipment = async (data) => {
    return await axiosShipping.post(`order/api/v1/orders/store`, data);
};

const createShipping = async (body) => {
  return await insertShipping(body);
};
module.exports = {
  getDestination,
  calculateShipping,
  storeShipment,
  createShipping,
};
