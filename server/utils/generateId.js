const { Op } = require("sequelize");

async function generateCustomId(prefix = "", model, length = 5, key = "id") {
  const prefixLength = prefix.length;
  const remainingLength = length - prefixLength;

  const lastRecord = await model.findOne({
    where: {
      [key]: {
        [Op.like]: `${prefix}%`,
      },
    },
    order: [[key, "DESC"]],
  });

  const newNumber = lastRecord
    ? parseInt(lastRecord[key].replace(prefix, ""), 10) + 1
    : 1;

  const formattedNumber = String(newNumber).padStart(remainingLength, "0");

  return `${prefix}${formattedNumber}`;
}

module.exports = { generateCustomId };
