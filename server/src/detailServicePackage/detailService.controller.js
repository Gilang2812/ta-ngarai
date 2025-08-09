const {
  getAllService,
  createDetailService,
  deleteDetailService,
  getServices,
} = require("./detailService.service");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const condition = {};
    const { package_id } = req.query;
    package_id && (condition.package_id = package_id);
    const services = await getAllService(condition);
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
});

router.get("/service", async (req, res, next) => {
  try {
    const services = await getServices();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { package_id, service_package_id, status, status_created } = req.body;
    const result = await createDetailService({
      package_id,
      service_package_id,
      status,
      status_created,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:package_id/:service_package_id", async (req, res, next) => {
  try {
    const { package_id, service_package_id } = req.params;
    const result = await deleteDetailService({
      package_id,
      service_package_id,
    });
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
