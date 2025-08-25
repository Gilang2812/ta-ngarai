const axios = require("axios");
const axiosShipping = axios.create({
  baseURL:
    process.env.SHIPPING_BASE_URL ||
    "https://api-sandbox.collaborator.komerce.id",
  headers: {
    Accept: "application/json",
    "x-api-key": process.env.SHIPPING_DELIVERY || "default-key",
  },
});

const axiosBiteship = axios.create({
  baseURL: process.env.BITESHIP_BASE_URL || "https://api.biteships.com",
  headers: {
    "Content-Type": "application/json",
    "Authorization": process.env.BITESHIP_API_KEY || "default-key",
  },
});

module.exports = { axiosShipping, axiosBiteship };
