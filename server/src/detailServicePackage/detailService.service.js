const { CustomError } = require("../../utils/CustomError");
const {
  findServices,
  destroyDetailService,
  insertDetailService,
  findDetailService,
  findAllDetailService,
} = require("./detailService.repository");

const getServices = async () => {
  const services = await findServices();
  return services;
};

const getAllDetailService = async (condition) => {
  const services = await findAllDetailService(condition);
  return services;
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
  const detailService = await getDetailService(key);
  await destroyDetailService(key);
  return detailService;
};

module.exports = {
  getServices,
  getAllDetailService,
  createDetailService,
  deleteDetailService,
  getAllDetailService,
};
