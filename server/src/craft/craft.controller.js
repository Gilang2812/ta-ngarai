const router = require("express").Router();

const { validateData } = require("../middlewares/validation");
const {
  getCrafts,
  getCraftById,
  insertCraft,
  updateCraftById,
  deleteCraftById,
} = require("./craft.service");
const { craftSchema, craftUpdateSchema } = require("./craft.validation");

router.get("/", async (req, res, next) => {
  try {
    const crafts = await getCrafts();
    res.status(200).json(crafts);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const craft = await getCraftById(id);
    if (!craft) {
      return res.status(404).json({ message: "Craft not found" });
    }
    res.status(200).json(craft);
  } catch (error) {
    next(error);
  }
});
router.post("/", validateData(craftSchema), async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCraft = await insertCraft({ id_souvenir_place: "SP004", name });
    res.status(201).json(newCraft);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  validateData(craftUpdateSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedCraft = await updateCraftById(id, { name });
      res.status(200).json(updatedCraft);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteCraftById(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
