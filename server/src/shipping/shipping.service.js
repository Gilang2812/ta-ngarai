const axiosShipping = require("../../config/axiosShipping");
const {
  insertShipping,
  userHistory,
  findShippingById,
} = require("./shipping.repository");

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

const getUserHistory = async (condition) => {
  const shipping = await userHistory(condition);
  return shipping;
};

const getUserHistoryById = async (id) => {
  const shipping = await findShippingById(id);
  return shipping;
};
module.exports = {
  getDestination,
  calculateShipping,
  storeShipment,
  createShipping,
  getUserHistory,
  getUserHistoryById
};
