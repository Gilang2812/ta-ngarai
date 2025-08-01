const router = require("express").Router();

const announcementRouter = require("../src/announcement/announcement.controller");
const authRouter = require("../src/auth/auth.controller");
const cartRouter = require("../src/cart/cart.controller");
const detailPackageRouter = require("../src/detailPackage/detailPackage.controller");
const detailReservationRouter = require("../src/detailReservation/detailReservation.controller");
const detailServiceRouter = require("../src/detailServicePackage/detailService.controller");
const galleryRouter = require("../src/gallery/gallery.controller");
const geoRouter = require("../src/geoJSON/geo.controller");
const homestayFacilityRouter = require("../src/homestayFacility/homestayFacility.controller");
const homestayRouter = require("../src/homestay/homestay.controller");
const objectRouter = require("../src/object/object.controller");
const packageRouter = require("../src/package/package.controller");
const reservationRouter = require("../src/reservation/reservation.controller");
const tourismRouter = require("../src/tourismVillage/tourism.controller");
const userRouter = require("../src/user/user.controller");
const souvenirRouter = require("../src/souvenirPlace/souvenir.controller");
const craftRouter = require("../src/craft/craft.controller");
const craftVariantRouter = require("../src/craftVariant/variant.controller");
const cartCraftRouter = require("../src/craftCart/craftCart.controller");
const checkout = require("../src/checkout/checkout.controller");
const paymentRouter = require("../src/payment/payment.controller");
const addressRouter = require("../src/address/address.controller");
const shippingRouter = require("../src/shipping/shipping.controller");
const detailCraftRouter = require("../src/detailMarketplaceCraft/detailCraft.controller");
const { verifyToken } = require("../src/middlewares/authentication");
const invoiceRouter = require("../src/invoice/invoice.controller");

router.use("/", authRouter);
router.use("/addresses", verifyToken, addressRouter);
router.use("/announcement", announcementRouter);
router.use("/carts", cartRouter);
router.use("/checkouts", verifyToken, checkout);
router.use("/craft-carts", verifyToken, cartCraftRouter);
router.use("/crafts", verifyToken, craftRouter);
router.use("/detail-crafts", verifyToken, detailCraftRouter);
router.use("/detailReservations", detailReservationRouter);
router.use("/detailPackage", detailPackageRouter);
router.use("/geo", geoRouter);
router.use("/gallery", galleryRouter);
router.use("/homestays", homestayRouter);
router.use("/homestay-facility", homestayFacilityRouter);
router.use("/object", objectRouter);
router.use("/packages", packageRouter);
router.use("/payment", paymentRouter);
router.use("/reservations", verifyToken, reservationRouter);
router.use("/services", detailServiceRouter);
router.use("/shipping", verifyToken, shippingRouter);
router.use("/souvenirs", verifyToken, souvenirRouter);
router.use("/tourism", tourismRouter);
router.use("/users", verifyToken, userRouter);
router.use("/variants", craftVariantRouter);
router.use("/invoice",invoiceRouter)

router.use("*", (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
