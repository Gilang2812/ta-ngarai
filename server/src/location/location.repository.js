const { where, fn, col } = require("sequelize");
const { Location } = require("../../models/relation");

const getLocation = async ({
  country,
  province,
  regency,
  district,
  village,
  postal_code,
}) => {
  regency = regency
    .toLowerCase()
    .replace(/^kota\s+/, "")
    .replace(/^kabupaten\s+/, "");

  const location = await Location.findOrCreate({
    where: {
      country: where(fn("LOWER", col("country")), country.toLowerCase()),
      province: where(fn("LOWER", col("province")), province.toLowerCase()),
      regency: where(fn("LOWER", col("regency")), regency.toLowerCase()),
      district: where(fn("LOWER", col("district")), district.toLowerCase()),
      village: where(fn("LOWER", col("village")), village.toLowerCase()),
      postal_code: postal_code,
    },
    defaults: {
      country,
      province,
      regency,
      district,
      village,
      postal_code,
    },
  });
  return location[0];
};

module.exports = {
  getLocation,
};
