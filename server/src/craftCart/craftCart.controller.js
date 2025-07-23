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
    const craftCarts = await getCraftCarts({
      customer_id: req.user.id,
    });
    res.status(200).json(craftCarts);
  } catch (error) {
    next(error);
  }
});
router.get("/:craft_variant_id", async (req, res, next) => {
  try {
    const craftCart = await getCraftCart({
      customer_id: req.user.id, 
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
    const { craft_variant_id, id_souvenir_place, jumlah } = req.body;
    const craftCart = await createCraftCart({
      customer_id: req.user.id,
      craft_variant_id,
      id_souvenir_place,
      jumlah,
    });
    res.status(201).json(craftCart);
  } catch (error) {
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const { items } = req.body; 

    const craftCarts = await Promise.all(
      items.map((item) =>
        createCraftCart({
          customer_id: req.user.id,
          id_souvenir_place: item.id_souvenir_place,
          craft_variant_id: item.craft_variant_id,
          jumlah: item.jumlah,
        })
      )
    );

    res.status(201).json(craftCarts);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:craft_variant_id/:id_souvenir_place/:checkout_id",
  async (req, res, next) => {
    try {
      const { jumlah } = req.body;
      const { craft_variant_id, id_souvenir_place, checkout_id } = req.params;
      const craftCart = await updateCraftCart(
        {
          checkout_id,
          craft_variant_id,
          id_souvenir_place,
        },
        {
          jumlah,
        }
      );
      res.status(200).json(craftCart);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:craft_variant_id/:id_souvenir_place/:checkout_id", async (req, res, next) => {
  try {
    const craftCart = await deleteCraftCart({ 
      craft_variant_id: req.params.craft_variant_id,
      id_souvenir_place: req.params.id_souvenir_place,
      checkout_id: req.params.checkout_id,
    });
    res.status(200).json(craftCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
