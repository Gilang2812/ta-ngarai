const { getAllDetailPackages } = require("./detailPackage.service");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const conditions = {};
    const { package_id } = req.query;
    package_id && (conditions.package_id = package_id);
    const detailPackages = await getAllDetailPackages(conditions);
    res.status(200).json(detailPackages);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
