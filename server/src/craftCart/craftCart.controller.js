const {
  getCraftCart,
  updateCraftCart,
  createCraftCart,
  deleteCraftCart,
  getCraftCarts,
} = require("./craftCart.service");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const craftCarts = await getCraftCarts();
    res.status(200).json(craftCarts);
  } catch (error) {
    next(error);
  }
});
router.get("/:craft_variant_id", async (req, res, next) => {
  try {
    const craftCart = await getCraftCart({
      user_id: 1, // Assuming user_id is 1 for testing purposes
      craft_variant_id: req.params.craft_variant_id,
    });
    res.status(200).json(craftCart);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const { craft_variant_id, jumlah } = req.body;
    const craftCart = await createCraftCart({
      user_id: 1,
      craft_variant_id,
      jumlah,
    });
    res.status(201).json(craftCart);
  } catch (error) {
    next(error);
  }
});
router.patch("/:craft_variant_id", async (req, res, next) => {
  try {
    const { jumlah } = req.body;
    const { craft_variant_id } = req.params;
    const craftCart = await updateCraftCart(
      {
        user_id: 1, // Assuming user_id is 1 for testing purposes
        craft_variant_id,
      },
      {
        jumlah,
      }
    );
    res.status(200).json(craftCart);
  } catch (error) {
    next(error);
  }
});

router.delete("/:craft_variant_id", async (req, res, next) => {
  try {
    const craftCart = await deleteCraftCart({
      user_id: 1, // Assuming user_id is 1 for testing purposes
      craft_variant_id: req.params.craft_variant_id,
    });
    res.status(200).json(craftCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
