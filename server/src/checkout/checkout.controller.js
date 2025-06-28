const { deleteCraftCart } = require("../craftCart/craftCart.service");
const { validateData } = require("../middlewares/validation");
const {
  createPayment,
  getPaymentStatus,
} = require("../payment/payment.service");
const {
  storeShipment,
  createShipping,
  getUserHistory,
} = require("../shipping/shipping.service");
const {
  getUserCheckouts,
  updateCheckout,
  updateItemsCheckout,
  checkoutOrder,
  // getUserHistory
} = require("./checkout.service");
const { updateStatusSchema } = require("./checout.validation");

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
    const { items, item_details, shippings, sub_total, total_shipping_cost } =
      req.body;
    console.log(req.body);
    const transaction = await createPayment({
      order_id: id,
      gross_amount: sub_total + total_shipping_cost,
      item_details: item_details,
    });

    console.log("shippings", shippings);
    for (const [index, item] of shippings.entries()) {
      const { data } = await storeShipment(item);
      const prevIndex = item.order_details.slice(0, index).length ?? 0;
      const newShipping = await createShipping({
        shipping_id: data.data.order_id,
        shipping_no: data.data.order_no,
        shipping_name: item.shipping,
        shipping_type: item.shipping_type,
        total_shipping_cost: item.shipping_cost,
        grand_total: item.grand_total,
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

router.patch(
  "/status/:id",
  validateData(updateStatusSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!status ||status === 6 || !status.success) {
        await updateCheckout(
          { id },
          {
            status: status || 6,
          }
        );
      } else {
        const paymentStatus = await getPaymentStatus(id);
        const checkout = await updateCheckout(
          { id },
          {
            status: status || 6,
            payment: paymentStatus?.payment_type ?? null,
            payment_date: paymentStatus?.settlement_time ?? null,
          }
        );
      }
      res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/history", async (req, res, next) => {
  try {
    const checkout = await getUserHistory({
      status: 0,
      customer_id: 1,
    }); // Assuming customer_id is 1 for testing purposes
    res.status(200).json(checkout);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
