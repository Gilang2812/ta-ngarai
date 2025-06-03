const { getOneAddress } = require("../address/address.service");
const { deleteCraftCart } = require("../craftCart/craftCart.service");
const { createPayment } = require("../payment/payment.service");
const {
  storeShipment,
  createShipping,
} = require("../shipping/shipping.service");
const {
  createCheckout,
  createItemCheckouts,
  getCheckout,
  getUserCheckouts,
  deleteItemsCheckout,
  updateCheckout,
  updateItemsCheckout,
  checkoutOrder,
} = require("./checkout.service");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const items = req.body.items;

    const newItems = await checkoutOrder(items);

    res.status(201).json(newItems);
  } catch (error) {
    next(error);
  }
});

router.post("/cart", async (req, res, next) => {
  try {
    const items = req.body.items;

    const newItems = await checkoutOrder(items);
    if (newItems.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }
    if (newItems.length > 0) {
      for (const item of items) {
        await deleteCraftCart({
          user_id: 1,
          craft_variant_id: item.craft_variant_id,
        });
      }
    }

    res.status(201).json(newItems);
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const checkout = await getUserCheckouts({ status: 0, customer_id: 1 }); // Assuming customer_id is 1 for testing purposes

    res.status(200).json(checkout);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { items, item_details, shippings,sub_total,total_shipping_cost } = req.body;
    console.log(req.body)
    const transaction = await createPayment({
      order_id: id,
      gross_amount: sub_total + total_shipping_cost ,
      item_details: item_details,
    });
    for (const [index, item] of shippings.entries()) {
      const { data } = await storeShipment(item);
      const prevIndex = item.order_details.slice(0, index).length ?? 0;
      const newShipping = await createShipping({
        shipping_id: data.data.order_id,
        shipping_cost: item.shipping_cost,
        shipping_no: data.data.order_no,
      });
      for (const [detailIndex, detail] of item.order_details.entries()) {
        detail.shipping_id = data.data.order_id;
        await updateItemsCheckout(
          {
            checkout_id: id,
            craft_variant_id: detail.product_id,
          },
          {
            shipping_id: newShipping.shipping_id,
            note: items[detailIndex + prevIndex].note,
          }
        );
      }
    }
    console.log(items);
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
