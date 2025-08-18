const imageUpload = require("../../middlewares/imageUploads");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const { deleteCraftCart } = require("../craftCart/craftCart.service");
const { validateData } = require("../middlewares/validation");
const {
  createPayment,
  getPaymentStatus,
} = require("../payment/payment.service");
const {
  createReviewGallery,
  getReviewGalleries,
  deleteReviewGalleryById,
} = require("../reviewGallery/reviewGallery.service");
const {
  createShipping,
  getUserHistory,
  updateShipping,
  getSouvenirTransaction,
} = require("../shipping/shipping.service");
const {
  getUserCheckouts,
  updateCheckout,
  updateItemsCheckout,
  checkoutOrder,
  // getUserHistory
} = require("./checkout.service");
const fs = require("fs");
const { updateStatusSchema } = require("./checout.validation");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const items = req.body.items;
    console.log("items", items);
    const customer_id = req.user.id;

    const newItems = await checkoutOrder(items, customer_id);

    res.status(201).json(newItems);
  } catch (error) {
    next(error);
  }
});

router.post("/cart", async (req, res, next) => {
  try {
    const items = req.body.items;
    const customer_id = req.user.id;
    const newItems = await checkoutOrder(items, customer_id);
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
    const checkout = await getUserCheckouts({ customer_id: req.user.id });

    res.status(200).json(checkout);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id checkout", id);
    const { items, item_details, shippings, sub_total, total_shipping_cost } =
      req.body;
    const transaction = await createPayment({
      order_id: id,
      gross_amount: sub_total + total_shipping_cost,
      item_details: item_details,
    });
    console.log("body checkout", transaction);
    const shippingsResult = [];
    for (const [index, item] of shippings.entries()) {
      // const { data } = await storeShipment(item); // karena ada masalah di storeShipment API komship
      const prevIndex = item.order_details.slice(0, index).length ?? 0;
      const newShipping = await createShipping({
        // shipping_id: data.order_id,  // belum bisa di gunakan
        // shipping_no: data.order_no,
        shipping_name: item.shipping,
        shipping_type: item.shipping_type,
        total_shipping_cost: item.shipping_cost,
        grand_total: item.grand_total,
      });
      shippingsResult.push(newShipping.shipping_id);
      for (const [detailIndex, detail] of item.order_details.entries()) {
        detail.shipping_id = newShipping.shipping_id;
        await updateItemsCheckout(
          {
            checkout_id: id,
            craft_variant_id: detail.product_id.split("-")[1],
            id_souvenir_place: detail.id_souvenir_place,
          },
          {
            shipping_id: newShipping.shipping_id,
            note: items[detailIndex + prevIndex].note,
          }
        );
      }
    }
    console.log("shippingsResult", shippingsResult);
    const response = { token: transaction.token, shippings: shippingsResult };
    res.status(200).json(response);
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
      const { status, isClose } = req.body;
      const shippings = req.body.shippings || [];
      let paymentStatus = null;
      if (!Number(isClose)) {
        paymentStatus = await getPaymentStatus(id);
      }
      if (!status || status === 6) {
        if (shippings.length > 0) {
          shippings.forEach(async (shipping_id) => {
            await updateShipping(
              { shipping_id },
              {
                status: status || 6,
              }
            );
          });
        }
      } else {
        if (shippings.length > 0) {
          for (const shipping_id of shippings) {
            await updateShipping(
              { shipping_id },
              {
                status: status,
              }
            );
          }
        }

        const checkout = await updateCheckout(
          { id },
          {
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
      customer_id: req.user.id,
    });

    res.status(200).json(checkout);
  } catch (error) {
    next(error);
  }
});

router.get("/transactions", async (req, res, next) => {
  try {
    const checkout = await getSouvenirTransaction({
      id_souvenir_place: req.user.id_souvenir_place,
    });
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    res.status(200).json(checkout);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:checkout_id/:craft_variant_id/:id_souvenir_place",
  imageUpload().array("images"),
  async (req, res, next) => {
    try {
      const { checkout_id, craft_variant_id, id_souvenir_place } = req.params;
      const { review_text, review_rating, shipping_id, seller_response } =
        req.body;
      let updatedItem = null;
      console.log("ini lagi di test");
      if (seller_response || seller_response == "") {
        updatedItem = await updateItemsCheckout(
          { checkout_id, craft_variant_id, id_souvenir_place },
          { seller_response, response_date: new Date() }
        );
      } else {
        updatedItem = await updateItemsCheckout(
          { checkout_id, craft_variant_id, id_souvenir_place },
          { review_text, review_rating, review_date: new Date() }
        );

        const images = req.files
          ? req.files.map((file) => ({
              url: formatImageUrl(file.path),
              checkout_id,
              craft_variant_id,
              id_souvenir_place,
            }))
          : [];
        await getReviewGalleries({
          checkout_id,
          craft_variant_id,
          id_souvenir_place,
        }).then((galleries) => {
          galleries.forEach(async (gallery) => {
            console.log("gallery", gallery);
            await deleteReviewGalleryById({
              id: gallery.id,
            });
            fs.unlinkSync(`public\\${gallery.url}`);
          });
        });
        if (images.length > 0) {
          for (const image of images) {
            await createReviewGallery(image);
          }
        }
      }
      if (updatedItem) {
        await updateShipping({ shipping_id }, { status: 5 });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
