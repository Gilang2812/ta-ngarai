const imageUpload = require("../../middlewares/imageUploads");
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
  editAllDataPackage,
  getPackageTypes,
  getPackageType,
  updatePackageType,
  deletePackageType,
  createPackageType,
} = require("./package.service");
const fs = require("fs");
const dayjs = require("dayjs");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const {
  deleteGalleryPackage,
  createGalleryPackage,
} = require("../gallery/gallery.service");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const query = req.query;

    const includes = {
      package: query.package === "true",
      service: query.service === "true",
      gallery: query.gallery === "true",
    };
    const custom = query.custom === "true" ? {} : { custom: 0 };
    const packages = await getAllPackage({ status: 1, ...custom }, includes);
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

router.post("/modify", verifyToken, async (req, res, next) => {
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
router.post(
  "/create",
  verifyToken,
  imageUpload("public/images/package").fields([
    { name: "images", maxCount: 5 },
    { name: "video_url", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const {
        name,
        type_id,
        price,
        min_capacity,
        contact_person,
        description,
      } = req.body;
      const requestBody = {
        name,
        type_id,
        price,
        min_capacity,
        contact_person,
        description,
      };

      if (req?.files?.video_url) {
        requestBody.video_url = formatImageUrl(req.files.video_url[0].path);
      }

      const newPackage = await createPackage(requestBody);

      const images =
        req?.files?.images?.map((file) => ({
          url: formatImageUrl(file.path),
          package_id: newPackage.id,
        })) || [];
      if (images.length > 0) {
        for (const image of images) {
          await createGalleryPackage(image);
        }
      }
      res.status(201).json(newPackage);
    } catch (error) {
      next(error);
    }
  }
);

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
    const {
      name,
      type_id,
      price,
      contact_person,
      description,
      video_url,
      min_capacity,
      status,
    } = req.body;
    const body = {
      name,
      type_id,
      price,
      contact_person,
      description,
      video_url,
      min_capacity,
      status,
    };

    const requestBody = Object.keys(body)
      .filter((key) => body[key] !== undefined)
      .reduce((acc, key) => {
        acc[key] = body[key];
        return acc;
      }, {});

    const updatedPackage = await editAllDataPackage({ id }, requestBody);
    res.status(200).json(updatedPackage);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/update/:id",
  verifyToken,
  imageUpload("public/images/package").fields([
    { name: "images", maxCount: 5 },
    { name: "video_url", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        name,
        type_id,
        price,
        contact_person,
        description,
        min_capacity,
        status,
      } = req.body;
      const video_url = req.files?.video_url
        ? formatImageUrl(req.files.video_url?.[0].path)
        : null;
      const updatedPackage = await editPackage(
        { id },
        {
          video_url: video_url,
          name,
          type_id,
          price,
          contact_person,
          description,
          min_capacity,
          status,
        }
      );
      const existingGallery = updatedPackage.packageGalleries || [];

      if (existingGallery.length > 0) {
        for (const gallery of existingGallery) {
          fs.rmSync(`public/${gallery.url}`, {
            recursive: true,
            force: true,
          });
        }
      }
      if (updatedPackage.video_url) {
        fs.unlinkSync(`public/${updatedPackage.video_url}`);
      }

      await deleteGalleryPackage({ package_id: id });
      const images = req?.files?.images?.map((file) => ({
        package_id: id,
        url: formatImageUrl(file.path),
      }));

      if (images.length > 0) {
        for (const image of images) {
          await createGalleryPackage(image);
        }
      }

      res.status(200).json(updatedPackage);
    } catch (error) {
      next(error);
    }
  }
);

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

router.get("/types/index", async (req, res, next) => {
  try {
    const packageTypes = await getPackageTypes();
    res.status(200).json(packageTypes);
  } catch (error) {
    next(error);
  }
});

router.get("/types/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const packageType = await getPackageType({ id });
    res.status(200).json(packageType);
  } catch (error) {
    next(error);
  }
});

router.post("/types/create", async (req, res, next) => {
  try {
    const { type_name } = req.body;
    const newPackageType = await createPackageType({ type_name });
    res.status(201).json(newPackageType);
  } catch (error) {
    next(error);
  }
});

router.patch("/types/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { type_name } = req.body;
    const updatedPackageType = await updatePackageType({ id }, { type_name });
    res.status(200).json(updatedPackageType);
  } catch (error) {
    next(error);
  }
});

router.delete("/types/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPackageType = await deletePackageType({ id });
    res.status(200).json(deletedPackageType);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
