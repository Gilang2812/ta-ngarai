const { findObjects, findObjectAround } = require("./object.repository");

const getObjectById = async (object, id) => {
  const objectById = await findObjects(object, { id });
  return objectById;
};
const getObjectAround = async (lat, long, rad, tableName, columns) => {
  const attractions = await findObjectAround(
    lat,
    long,
    rad,
    tableName,
    columns
  );

  return attractions;
};

module.exports = {
  getObjectById,
  getObjectAround,
};
