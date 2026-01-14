const imageUpload = require("../../middlewares/imageUploads");
const mapUpload = require("../../middlewares/mapUploads");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const { handleInput } = require("../../utils/handleInput");
const { generateToken, getLoginResponse } = require("../auth/auth.service");
const {
  insertGallerySouvenir,
  destroyGallerySouvenir,
} = require("../gallery/gallery.repository");
const { validateData } = require("../middlewares/validation");
const { getUser } = require("../user/user.service");
const {
  createSouvenirPlace,
  editSouvenirPlaceById,
  deleteSouvenirPlaceById,
  getSouvenirPlace,
  getUserSouvenirPlace,
  createDetailUserSouvenir,
  getSouvenirPlaceById,
  getDetailUserSouvenir,
  editDetailUserSouvenir,
  deleteDetailUserSouvenir,
} = require("./souvenir.service");
const fs = require("fs");

const { souvenirPlaceSchema } = require("./souvenir.validation");
const { findUniqueUsernameOrEmail } = require("../user/user.repository");
const { verifyToken } = require("../middlewares/authentication");
const { getLocation } = require("../location/location.repository");
const { unlinkSync } = require("../../utils/unlinkSync");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const { craft } = req.query;
    const souvenirPlace = await getSouvenirPlace(craft === "true");

    res.status(200).json(souvenirPlace);
  } catch (error) {
    next(error);
  }
});

router.use(verifyToken);

router.get("/user/index", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const souvenirPlace = await getUserSouvenirPlace(userId);
    res.status(200).json(souvenirPlace);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const souvenir = await getSouvenirPlaceById(req.params.id);
    res.status(200).json(souvenir);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  imageUpload().array("images"),
  validateData(souvenirPlaceSchema),
  async (req, res, next) => {
    try {
      const {
        name,
        village,
        district,
        province,
        regency,
        country,
        postal_code,
        street,
        contact_person,
        open,
        close,
        description,
        geom,
        destination_id,
      } = req.body;

      const location = await getLocation({
        country,
        province,
        regency,
        district,
        postal_code,
        village,
      });

      const souvenir = await createSouvenirPlace({
        name,
        contact_person,
        description,
        location_id: location.id,
        street,
        open,
        close,
        geom,
        destination_id,
      });

      let user = {};
      let token = "";

      if (souvenir) {
        user = await getUser({ id: req.user.id });
        await createDetailUserSouvenir({
          user_id: req.user.id,
          id_souvenir_place: souvenir.id,
          status: 1,
        });
        user = await getLoginResponse(user);
        token = generateToken(user);

        const images = req?.files?.map((file) => ({
          url: formatImageUrl(file.path),
          souvenir_place_id: souvenir.id,
        }));

        if (images.length > 0) {
          for (const image of images) {
            await insertGallerySouvenir(image);
          }
        }
      }
      const response = {
        user,
        token,
      };

      console.log(response);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  imageUpload().array("images"),
  validateData(souvenirPlaceSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        name,
        street,
        village,
        district,
        province,
        regency,
        country,
        postal_code,
        contact_person,
        open,
        close,
        description,
        geom,
        destination_id,
      } = req.body;

      const location = await getLocation({
        country,
        province,
        regency,
        district,
        postal_code,
        village,
      });

      const souvenirPlace = await editSouvenirPlaceById(id, {
        name,
        location_id: location.id,
        street,
        contact_person,
        open,
        close,
        destination_id,
        description,
        geom: typeof geom === "string" ? JSON.parse(geom) : geom,
      });
      console.log("ini filenya ", req.files)
      const existingGalleries = (await souvenirPlace.galleries) || [];

      if (existingGalleries.length > 0) {
        for (const images of existingGalleries) {
          unlinkSync(`public\\${images.url}`);
        }
      }

      await destroyGallerySouvenir({ souvenir_place_id: id });
      const images = req?.files?.map((file) => ({
        url: formatImageUrl(file.path),
        souvenir_place_id: id,
      }));

      if (images.length > 0) {
        for (const image of images) {
          await insertGallerySouvenir(image);
        }
      }

      return res.status(200).json(souvenirPlace);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const souvenirPlace = await deleteSouvenirPlaceById(id);

    return res.status(200).json(souvenirPlace);
  } catch (error) {
    next(error);
  }
});

router.get("/detail/user", async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const status = req.query.status ? { status: req.query.status } : {};
    const detail = await getDetailUserSouvenir({ user_id, ...status });
    res.status(200).json(detail);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/detail/:id_souvenir_place/:user_id/edit",
  async (req, res, next) => {
    try {
      const { id_souvenir_place, user_id } = req.params;
      const { status } = req.body;
      const detail = await editDetailUserSouvenir(
        { id_souvenir_place, user_id },
        {
          status,
        }
      );
      const io = req.app.get("io");
      io.to("sp-user").emit("souvenirPlace", detail);
      res.status(200).json(detail);
    } catch (error) {
      next(error);
    }
  }
);
router.post("/detail/create", async (req, res, next) => {
  try {
    const { user, id_souvenir_place } = req.body;
    const existUser = await findUniqueUsernameOrEmail(user, user);
    const user_id = existUser.id;
    const detail = await createDetailUserSouvenir({
      id_souvenir_place,
      user_id,
    });

    const io = req.app.get("io");
    io.to(user_id).emit("detail-updated", detail);
    res.status(201).json(detail);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/detail/:id_souvenir_place/:user_id/delete",
  async (req, res, next) => {
    try {
      const { id_souvenir_place, user_id } = req.params;
      const detail = await deleteDetailUserSouvenir({
        id_souvenir_place,
        user_id,
      });
      const io = req.app.get("io");
      io.to("sp-user").emit("souvenirPlace", detail);
      res.status(200).json(detail);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
