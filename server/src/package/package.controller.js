const combinePackageObject = require("../../utils/combinePackageObject");
const {
  createDetailService,
} = require("../detailServicePackage/detailService.service");
const { verifyToken } = require("../middlewares/authentication");
const {
  getAllPackage,
  getPackage,
  getUserPackage,
  createPackageDay,
  editPackageDay,
  createDetailPackage,
  deleteDetailPackage,
  editDetailPackage,
  deletePackageDay,
  deletePackage,
  editPackage,
  createPackage,
} = require("./package.service");
const dayjs = require("dayjs");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const query = req.query;
    query.package = query.package === "true";
    query.service = query.service === "true";
    query.gallery = query.gallery === "true";

    const packages = await getAllPackage({ status: 1, custom: 0 }, query);
    const enrichedPackages = await combinePackageObject(packages);

    res.status(200).json(enrichedPackages);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { includes } = req.query;
    const includesArray = includes ? includes.split(",") : [];
    const include = {
      package: includesArray.includes("package"),
      service: includesArray.includes("service"),
      gallery: includesArray.includes("gallery"),
      reservation: includesArray.includes("reservation"),
    };

    const packageData = await getPackage(id, include);

    const enrichedPackages = await combinePackageObject([packageData]);
    const response = packageData ? enrichedPackages?.[0] : null;
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/create", verifyToken, async (req, res, next) => {
  try {
    const newPackage = await createPackage({
      name: `Custom By ${
        req.user.username || req.user.fullname
      } at ${dayjs().format("YYYY-MM-DD HH:mm:ss")} ${Math.floor(
        Math.random() * 1e6
      )}`,
      custom: 1,
      type_id: "T0000",
      min_capacity: 5,
    });
    res.status(201).json(newPackage);
  } catch (error) {
    next(error);
  }
});

router.post("/modify/:package_id", verifyToken, async (req, res, next) => {
  try {
    const { package_id } = req.params;
    const isCustom = req.query.isCustom === "true" ? 1 : 0;
    const packageData = {
      package: true,
      service: true,
    };
    const existingPackage = await getPackage(package_id, packageData);
    const {
      id,
      name,
      type_id,
      custom,
      packageDays,
      type,
      detailServices,
      ...rest
    } = existingPackage.toJSON();

    const newPackage = await createPackage({
      name: `${name} - ${!!isCustom ? "custom" : "extend"} by ${
        req.user.username || req.user.fullname
      } at ${dayjs().format("YYYY-MM-DD HH:mm:ss")} ${Math.floor(
        Math.random() * 1e6
      )}`,
      custom: 1,
      type_id: isCustom ? "T0000" : type_id,
      ...rest,
    });
    let includes = [];

    includes = await Promise.all([
      ...packageDays.map(
        async ({ package_id, status, detailPackages, ...day }) => {
          const newDay = await createPackageDay({
            package_id: newPackage.id,
            status: isCustom,
            ...day,
          });

          return Promise.all(
            detailPackages.map(({ status, ...activity }) =>
              createDetailPackage({
                ...activity,
                package_id: newPackage.id,
                status: isCustom,
              })
            )
          );
        }
      ),

      ...detailServices.map(
        ({ service_package_id, status_created, package_id, ...rest }) =>
          createDetailService({
            service_package_id,
            package_id: newPackage.id,
            status_created: isCustom,
            ...rest,
          })
      ),
    ]);
    res.status(201).json({
      newPackage,
      type: isCustom ? "custom" : "extend",
      includes,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedPackage = await editPackage({ id }, body);
    res.status(200).json(updatedPackage);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPackage = await deletePackage({ id });
    res.status(200).json(deletedPackage);
  } catch (error) {
    next(error);
  }
});

router.get("/user/index", verifyToken, async (req, res, next) => {
  try {
    const reservation = await getUserPackage(req.user.id);
    const package = reservation.map((item) => item.package);
    const enrichedPackages = await combinePackageObject(package);
    res.status(200).json(enrichedPackages);
  } catch (error) {
    next(error);
  }
});

router.post("/day", verifyToken, async (req, res, next) => {
  try {
    const { packageId } = req.body;
    const reservation = await getUserPackage(req.user.id, packageId);
    const package = reservation.map((item) => item.package);
    const enrichedPackages = await combinePackageObject(package);
    res.status(200).json(enrichedPackages);
  } catch (error) {
    next(error);
  }
});

router.post("/day/create", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const newPackageDay = await createPackageDay(body);
    res.status(201).json(newPackageDay);
  } catch (error) {
    next(error);
  }
});

router.patch("/day/:day/:package_id", verifyToken, async (req, res, next) => {
  try {
    const { day, package_id } = req.params;
    const body = req.body;

    const updatedPackageDay = await editPackageDay({ day, package_id }, body);
    res.status(200).json(updatedPackageDay);
  } catch (error) {
    next(error);
  }
});

router.delete("/day/:day/:package_id", verifyToken, async (req, res, next) => {
  try {
    const { day, package_id } = req.params;
    const deletedPackageDay = await deletePackageDay({ day, package_id });
    res.status(200).json(deletedPackageDay);
  } catch (error) {
    next(error);
  }
});

router.post("/detail/create", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const newDetailPackage = await createDetailPackage(body);
    res.status(201).json(newDetailPackage);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/detail/:activity/:day/:package_id",
  verifyToken,
  async (req, res, next) => {
    try {
      const { activity, day, package_id } = req.params;
      const body = req.body;

      const updatedDetailPackage = await editDetailPackage(
        { activity, day, package_id },
        body
      );
      res.status(200).json(updatedDetailPackage);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/detail/:activity/:day/:package_id",
  verifyToken,
  async (req, res, next) => {
    try {
      const { activity, day, package_id } = req.params;
      const deletedDetailPackage = await deleteDetailPackage({
        activity,
        day,
        package_id,
      });
      res.status(200).json(deletedDetailPackage);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
