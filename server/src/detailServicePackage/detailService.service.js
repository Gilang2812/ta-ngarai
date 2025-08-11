const { CustomError } = require("../../utils/CustomError");
const {
  findServices,
  destroyDetailService,
  insertDetailService,
  findDetailService,
  findAllDetailService,
  findService,
  insertService,
  updateService,
  destroyService,
} = require("./detailService.repository");

const getServices = async () => {
  const services = await findServices();
  return services;
};

const getService = async (condition) => {
  const service = await findService(condition);
  if (!service) {
    throw new CustomError("Service Not Found", 404);
  }
  return service;
};

const createService = async (body) => {
  const service = await insertService(body);
  return service;
};

const editService = async (key, data) => {
  const service = await getService(key);
  await updateService(key, data);
  return service;
};

const deleteService = async (key) => {
  const service = await getService(key);
  await destroyService(key);
  return service;
};

const getAllDetailService = async (condition) => {
  const services = await findAllDetailService(condition);
  return services;
};

const takeDetailService = async (condition) => {
  const detailService = await findDetailService(condition);
  if (!detailService) {
    throw new CustomError("Detail service Not Found", 404);
  }
  return detailService;
};
const getDetailService = async (condition) => {
  const detailService = await findDetailService(condition);
  if (detailService) {
    throw new CustomError("Detail service Already Exists", 409);
  }
  return detailService;
};

const createDetailService = async ({
  package_id,
  service_package_id,
  ...rest
}) => {
  let detailService = await getDetailService({
    package_id,
    service_package_id,
  });
  console.log("detail service", detailService);
  detailService = await insertDetailService({
    package_id,
    service_package_id,
    ...rest,
  });
  return detailService;
};

const deleteDetailService = async (key) => {
  const detailService = await takeDetailService(key);
  await destroyDetailService(key);
  return detailService;
};

module.exports = {
  getServices,
  getAllDetailService,
  createDetailService,
  deleteDetailService,
  getAllDetailService,
  createService,
  editService,
  deleteService,
};
