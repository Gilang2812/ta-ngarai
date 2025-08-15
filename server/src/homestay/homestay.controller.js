const router = require("express").Router();

const {
  getAllHomestay,
  getHomestay,
  createHomestay,
  deleteHomestay,
  editHomestay,
  getUnitHomestays,
  getAllUnitHomestays,
  getEditHomestay,
  createUnitHomestay,
  editUnitHomestay,
  destroyUnitHomestay,
  createFacilityUnitDetail,
  createFacilityUnit,
  getUnitTypes,
} = require("./homestay.service");
const imageUpload = require("../../middlewares/imageUploads");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const {
  createGalleryHomestay,
  deleteGalleryHomestay,
  createGalleryUnitHomestay,
  deleteGalleryUnit,
} = require("../gallery/gallery.service");
const fs = require("fs");
const { deleteFacilityUnitDetail } = require("./homestay.repository");

router.get("/", async (req, res, next) => {
  try {
    const homestays = await getAllHomestay();
    res.json(200, homestays);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.message || "Internal server error, ");
  }
});

router.get("/units", async (req, res, next) => {
  try {
    let checkIn = req.query.checkIn;
    if (!checkIn || checkIn === "") {
      return res.status(404).json({ message: "query checkIn is required" });
    }

    const newCheckIn = new Date(checkIn).toISOString().split("T")[0];
    console.log(newCheckIn);
    const units = await getUnitHomestays(newCheckIn);
    res.status(200).json(units);
  } catch (error) {
    next(error);
  }
});

router.get("/units/:homestay_id", async (req, res, next) => {
  try {
    const { homestay_id } = req.params;
    const units = await getAllUnitHomestays({ homestay_id });
    res.status(200).json(units);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const homestay = await getEditHomestay({ id });
    res.status(200).json(homestay);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  imageUpload("public/images").array("images"),
  async (req, res, next) => {
    try {
      const { name, address, open, close, contact_person, geom } = req.body;
      req.body.geom = req.body.geom;
      console.log(geom);
      const newHomestay = await createHomestay({
        name,
        address,
        open,
        close,
        contact_person,
        geom,
      });

      if (req.files && req.files.length > 0) {
        const images = req.files.map((file) => ({
          url: formatImageUrl(file.path),
          homestay_id: newHomestay.id,
        }));
        for (const image of images) {
          await createGalleryHomestay(image);
        }
      }
      res.status(201).json(newHomestay);
    } catch (error) {
      next(error);
    }
  }
);
router.get("/:id", async (req, res, next) => {
  try {
    const homestay = await getHomestay(req.params.id);
    res.status(200).json(homestay);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  imageUpload("public/images").array("images"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body || {};
      body.id = id;
      body.geom = JSON.parse(body.geom);
      const homestay = await editHomestay(body);

      const existingGalleries = homestay.toJSON().galleries || [];

      for (const g of existingGalleries) {
        fs.unlinkSync(`public\\${g.url}`);
      }
      console.log("file images", req.files);
      await deleteGalleryHomestay({ homestay_id: id });
      if (req?.files && req?.files?.length > 0) {
        const newImages = req?.files?.map((file) => ({
          homestay_id: id,
          url: formatImageUrl(file.path),
        }));
        for (const image of newImages) {
          await createGalleryHomestay(image);
        }
      }

      res.status(200).json(homestay);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedHomestay = await deleteHomestay(id);
    res.status(200).json(deletedHomestay);
  } catch (error) {
    next(error);
  }
});

router.post("/units", imageUpload().array("images"), async (req, res, next) => {
  try {
    const { homestay_id, unit_type, unit_name, capacity, price, description } =
      req.body;

    const newUnitHomestay = await createUnitHomestay({
      homestay_id,
      unit_type,
      unit_name,
      capacity,
      price,
      description,
    });

    const images =
      req.files.map((file) => ({
        homestay_id,
        unit_type,
        unit_number: newUnitHomestay.unit_number,
        url: formatImageUrl(file.path),
        homestay_id: homestay_id,
      })) || [];

    for (const image of images) {
      await createGalleryUnitHomestay(image);
    }

    res.status(201).json(newUnitHomestay);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/units/:homestay_id/:unit_type/:unit_number",
  imageUpload().array("images"),
  async (req, res, next) => {
    try {
      const { homestay_id, unit_type, unit_number } = req.params;
      const { unit_name, capacity, price, description } = req.body;

      const updatedUnitHomestay = await editUnitHomestay(
        { homestay_id, unit_type, unit_number },
        { unit_name, capacity, price, description }
      );

      const images = req.files.map((file) => ({
        homestay_id,
        unit_type,
        unit_number,
        url: formatImageUrl(file.path),
      }));

      const existingGalleries = updatedUnitHomestay.toJSON().galleries || [];
      await deleteGalleryUnit({ homestay_id, unit_type, unit_number });
      if (existingGalleries.length > 0) {
        for (const g of existingGalleries) {
          fs.unlinkSync(`public\\${g.url}`);
        }
      }
      for (const image of images) {
        await createGalleryUnitHomestay(image);
      }

      res.status(200).json(updatedUnitHomestay);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/units/:homestay_id/:unit_type/:unit_number",
  async (req, res, next) => {
    try {
      const { homestay_id, unit_type, unit_number } = req.params;
      const deletedUnitHomestay = await destroyUnitHomestay({
        homestay_id,
        unit_type,
        unit_number,
      });
      res.status(200).json(deletedUnitHomestay);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/units/detail", async (req, res, next) => {
  try {
    const {
      homestay_id,
      unit_type,
      unit_number,
      facility_unit_id,
      description,
    } = req.body;
    const facilities = await createFacilityUnitDetail({
      homestay_id,
      unit_type,
      unit_number,
      facility_unit_id,
      description,
    });
    res.status(201).json(facilities);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/units/detail/:homestay_id/:unit_type/:unit_number/:facility_unit_id",
  async (req, res, next) => {
    try {
      const { homestay_id, unit_type, unit_number, facility_unit_id } =
        req.params;
      const deletedFacility = await deleteFacilityUnitDetail({
        homestay_id,
        unit_type,
        unit_number,
        facility_unit_id,
      });
      res.status(200).json(deletedFacility);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/units/facility", async (req, res, next) => {
  try {
    const { name } = req.body;
    const facilities = await createFacilityUnit({
      name,
    });
    res.status(201).json(facilities);
  } catch (error) {
    next(error);
  }
});

router.get("/types/index", async (req, res, next) => {
  try {
    const unitTypes = await getUnitTypes();
    res.status(200).json(unitTypes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
