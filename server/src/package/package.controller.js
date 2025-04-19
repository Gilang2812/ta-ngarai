const { getObjectById } = require("../object/object.service");
const { getAllPackage, getPackage } = require("./package.service");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    query.package = query.package === "true";
    query.service = query.service === "true";
    query.gallery = query.gallery === "true";

    const packages = await getAllPackage(query);
    const enrichedPackages = await Promise.all(
      packages.map(async (pkg) => {
        const enrichedDays = await Promise.all(
          (pkg.packageDays || []).map(async (day) => {
            const enrichedDetails = await Promise.all(
              (day.detailPackages || []).map(async (activity) => {
                const object = await getObjectById(
                  activity.activity_type,
                  activity.object_id
                );
                return { ...activity.toJSON(), object };
              })
            );
            return { ...day.toJSON(), detailPackages: enrichedDetails };
          })
        );
        return { ...pkg.toJSON(), packageDays: enrichedDays };
      })
    );

    res.status(200).json(enrichedPackages);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const package = await getPackage(id);
    res.status(200).json(package);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
