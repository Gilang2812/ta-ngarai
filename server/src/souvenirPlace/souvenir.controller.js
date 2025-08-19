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
} = require("./souvenir.service");
const fs = require("fs");

const { souvenirPlaceSchema } = require("./souvenir.validation");
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

router.get("/user/index", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const souvenirPlace = await getUserSouvenirPlace(userId);
    res.status(200).json(souvenirPlace);
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
      const { name, address, contact_person, open, close, description, geom } =
        req.body;
      console.log(geom);
      const souvenir = await createSouvenirPlace({
        name,
        contact_person,
        description,
        address,
        open,
        close,
        geom,
      });
      let user = {};
      let token = "";
      if (souvenir) {
        user = await getUser({ id: req.user.id });
        await createDetailUserSouvenir({
          user_id: req.user.id,
          id_souvenir_place: souvenir.id,
          isOwner: 1,
        });
        user = getLoginResponse(user);
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
      const { name, address, contact_person, open, close, description, geom } =
        req.body;
      console.log(open);
      const souvenirPlace = await editSouvenirPlaceById(id, {
        name,
        address,
        contact_person,
        open,
        close,
        description,
        geom,
      });

      const existingGalleries = (await souvenirPlace.galleries) || [];

      if (existingGalleries.length > 0) {
        for (const images of existingGalleries) {
          fs.unlinkSync(`public\\${images.url}`);
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

module.exports = router;
