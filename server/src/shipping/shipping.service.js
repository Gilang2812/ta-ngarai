const { axiosShipping, axiosBiteship } = require("../../config/axiosShipping");
const getPaymentStatusText = require("../../utils/getPaymentStatusText");
const { getPaymentStatus } = require("../payment/payment.service");
const {
  insertShipping,
  userHistory,
  findShippingById,
  editShipping,
  findSouvenirTransaction,
} = require("./shipping.repository");

const getDestination = async (params) => {
  return await axiosShipping.get(`tariff/api/v1/destination/search`, {
    params,
  });
};

const getAreas = async (input) => {
  const { data } = await axiosBiteship.get("/v1/maps/areas", {
    params: { input, type: "single" },
  });
  return data;
};

const calculateShipping = async (params) => {
  return await axiosShipping.get(`/tariff/api/v1/calculate`, {
    params,
  });
};

const storeShipment = async (data) => {
  return await axiosShipping.post(`order/api/v1/orders/store`, data);
};
const courerRates = async (body) => {
  const { data } = await axiosBiteship.post(`/v1/rates/couriers`, body);
  return data;
};

const createDraftOrder = async (body) => {
  const { data } = await axiosBiteship.post(`/v1/draft_orders`, body);
  return data;
};

const confirmDraftOrder = async (draft_id) => {
  const { data } = await axiosBiteship.post(
    `/v1/draft_orders/${draft_id}/confirm`
  );
  return data;
};

const trackOrder = async (tracking_id) => {
  const { data } = await axiosBiteship.get(`/v1/trackings/${tracking_id}`);
  return data;
};

const createShipping = async (body) => {
  return await insertShipping(body);
};

const getUserHistory = async (condition) => {
  const shipping = await userHistory(condition);
  const checkoutWithPaymentStatus = await Promise.all(
    shipping.map(async (item) => {
      const plainItem = item.toJSON();
      const status = await getPaymentStatus(item.shippingItems[0].checkout.id);
      let paymentStatus = "";
      if (!status) {
        paymentStatus = "pending";
      } else {
        paymentStatus = getPaymentStatusText(status);
      }
      return { paymentStatus: paymentStatus, ...plainItem };
    })
  );
  return checkoutWithPaymentStatus;
};

const getSouvenirTransaction = async (condition) => {
  const shipping = await findSouvenirTransaction(condition);
  const shippingWithPaymentStatus = await Promise.all(
    shipping.map(async (item) => {
      const status = await getPaymentStatus(item.shippingItems[0].checkout.id);
      let paymentStatus = "";
      if (!status) {
        paymentStatus = "pending";
      } else {
        paymentStatus = getPaymentStatusText(status);
      }
      return { paymentStatus: paymentStatus, ...item.toJSON() };
    })
  );
  return shippingWithPaymentStatus;
};

const getUserHistoryById = async (id) => {
  const shipping = await findShippingById(id);
  return shipping;
};

const updateShipping = async (key, body) => {
  return await editShipping(key, body);
};

module.exports = {
  getDestination,
  calculateShipping,
  storeShipment,
  createShipping,
  getUserHistory,
  getUserHistoryById,
  updateShipping,
  getSouvenirTransaction,
  courerRates,
  createDraftOrder,
  confirmDraftOrder,
  getAreas,
  trackOrder,
};
