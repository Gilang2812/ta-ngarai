const mapUpload = require("../../middlewares/mapUploads");
const { handleInput } = require("../../utils/handleInput");
const { validateData } = require("../middlewares/validation");
const { findSouvenirPlace } = require("./souvenir.repository");
const {
  createSouvenirPlace,
  editSouvenirPlaceById,
  deleteSouvenirPlaceById,
} = require("./souvenir.service");
const { souvenirPlaceSchema } = require("./souvenir.validation");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const souvenirPlace = await findSouvenirPlace();

    res.status(200).json(souvenirPlace);
  } catch (error) {
    next(error);
  }
});
router.post("/", validateData(souvenirPlaceSchema), async (req, res, next) => {
  try {
    const { name, address, contact_person, open, close, description, geom } =
      req.body;

    const souvenir = await createSouvenirPlace({
      name,
      contact_person,
      description,
      address,
      open,
      close,
      geom,
    });

    res.status(201).json(souvenir);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address, contact_person, open, close, description, geom } =
      req.body;

    handleInput(req.body, souvenirPlaceSchema);
    const souvenirPlace = await editSouvenirPlaceById(id, {
      name,
      address,
      contact_person,
      open,
      close,
      description,
      geom,
    });

    return res.status(200).json(souvenirPlace);
  } catch (error) {
    next(error);
  }
});

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
