const {
  getAllService,
  createDetailService,
  deleteDetailService,
  getServices,
  createService,
  editService,
  deleteService,
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

router.post("/service/create", async (req, res, next) => {
  try {
    const { name, price, min_capacity, category } = req.body;
    const result = await createService({
      name,
      price,
      min_capacity,
      category,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/service/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, min_capacity, category } = req.body;
    const result = await editService(
      { id },
      {
        name,
        price,
        min_capacity,
        category,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/service/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteService({ id });
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
