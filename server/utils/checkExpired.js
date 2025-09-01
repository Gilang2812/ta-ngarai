const dayjs = require("dayjs");

const isExpired = (date) => {
  return dayjs().isAfter(dayjs(date).add(24, "hour"));
};

module.exports = { isExpired };
