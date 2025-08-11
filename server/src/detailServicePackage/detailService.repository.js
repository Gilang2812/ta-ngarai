const {
  DetailServicePackage,
  ServicePackage,
} = require("../../models/relation");

const findServices = async () => {
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

const findService = async (conditions) => {
  const services = await ServicePackage.findOne({
    where: conditions,
  });
  return services;
};

const insertService = async (data) => {
  const service = await ServicePackage.create(data);
  return service;
};

const updateService = async (key, data) => {
  const service = await ServicePackage.update(data, {
    where: key,
  });
  return service;
};

const destroyService = async (key) => {
  const result = await ServicePackage.destroy({
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
  findService,
  insertService,
  updateService,
  destroyService,
};
