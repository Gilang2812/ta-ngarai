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

module.exports = axiosShipping;
