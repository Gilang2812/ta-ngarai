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
  createDraftOrder,
  confirmDraftOrder,
} = require("../shipping/shipping.service");
const {
  getUserCheckouts,
  updateCheckout,
  updateItemsCheckout,
  checkoutOrder,
  takeCheckout,
  updateCheckoutStatus,
  // getUserHistory
} = require("./checkout.service");
const fs = require("fs");
const { updateStatusSchema } = require("./checout.validation");
const {
  updateDetailCraft,
} = require("../detailMarketplaceCraft/detailCraft.service");
const {
  findDetailCraft,
} = require("../detailMarketplaceCraft/detailCraft.repository");

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
    const { items, item_details, shippings, sub_total, total_shipping_cost } =
      req.body;
    await takeCheckout({ id });

    const transaction = await createPayment({
      order_id: id,
      gross_amount: sub_total + total_shipping_cost,
      item_details: item_details,
    });
    const shippingsResult = [];
    for (const [index, item] of shippings.entries()) {
      const data = await createDraftOrder(item);
      const prevIndex = item.items.slice(0, index).length ?? 0;
      const newShipping = await createShipping({
        draft_id: data.id,
        shipping_name: item.courier_company,
        shipping_type: item.courier_type,
        total_shipping_cost: item.shipping_cost,
        grand_total:
          item.shipping_cost +
          item.items.reduce((acc, curr) => acc + curr.value * curr.quantity, 0),
      });
      shippingsResult.push(newShipping.shipping_id);
      for (const [detailIndex, detail] of item.items.entries()) {
        await updateItemsCheckout(
          {
            checkout_id: id,
            craft_variant_id: detail.craft_variant_id,
            id_souvenir_place: detail.id_souvenir_place,
          },
          {
            shipping_id: newShipping.shipping_id,
            note: items[detailIndex + prevIndex].note,
          }
        );
      }
    }

    await Promise.all(
      items.map(async (item) => {
        const currenCraftItem = await findDetailCraft(
          {
            craft_variant_id: item.craft_variant_id,
            id_souvenir_place: item.id_souvenir_place,
          },
          []
        );
        const stock = currenCraftItem.stock;
        const newStock = stock - item.jumlah < 0 ? 0 : stock - item.jumlah;
        currenCraftItem.stock = newStock;
        await currenCraftItem.save();
      })
    );
    await updateCheckoutStatus({
      id: id,
      payment_type: 'bank_transfer',
      settlement_time: new Date(),
      shippings: shippingsResult,
      status: 2,
    });
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
      const { status, isClose, draft_id } = req.body;
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
          await Promise.all(
            shippings.map(async (shipping_id) => {
              let updatedBody = null;
              if (status === 3) {
                const data = await confirmDraftOrder(draft_id);
                updatedBody = {
                  order_id: data.id,
                  tracking_id: data.courier.tracking_id,
                  awb: data.courier.waybill_id,
                };
              }
              return updateShipping(
                { shipping_id },
                { status, ...(updatedBody ?? {}) }
              );
            })
          );
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
    const stores = req?.user?.store ?? [];
    const id_stores = stores?.map((detail) => detail.id_souvenir_place);
    let checkouts = [];
    if (req.user.role === 2) {
      checkouts = await getSouvenirTransaction({ id_souvenir_place: null });
    }
    if (id_stores.length > 0) {
      checkouts = await Promise.all(
        id_stores.map((id_souvenir_place) => {
          const key = {
            id_souvenir_place,
          };
          return getSouvenirTransaction(key);
        })
      );
      checkouts = checkouts.flat();
    }

    const data = checkouts.sort((a, b) => {
      const maxA = a.shippingItems[0]?.checkout.checkout_date;
      const maxB = b.shippingItems[0]?.checkout.checkout_date;
      return maxB - maxA;
    });
    console.log("stores", stores);
    res.status(200).json(data);
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
