const {
  DetailServicePackage,
  ServicePackage,
} = require("../../models/relation");

const findServices = async (conditions) => {
  const services = await ServicePackage.findAll();
  return services;
};

const findAllDetailService = async (conditions) => {
  const detailServices = await DetailServicePackage.findAll({
    include: [
      {
        model: ServicePackage,
      },
    ],
    where: conditions,
    attributes: [
      "package_id",
      "status",
      "status_created",
      "service_package_id",
    ],
  });
  return detailServices;
};

const findDetailService = async (condition) => {
  const detailService = await DetailServicePackage.findOne({
    where: condition,
  });
  return detailService;
};

const insertDetailService = async (data) => {
  const detailService = await DetailServicePackage.create(data);
  return detailService;
};

const destroyDetailService = async (key) => {
  const result = await DetailServicePackage.destroy({
    where: key,
  });
  return result;
};

module.exports = {
  findAllDetailService,
  findDetailService,
  insertDetailService,
  destroyDetailService,
  findServices,
};
