const { verifyToken } = require("../src/middlewares/authentication");
const router = require("express").Router();

// Import all controllers
const addressRouter = require("../src/address/address.controller");
const announcementRouter = require("../src/announcement/announcement.controller");
const attractionRouter = require("../src/attraction/attraction.controller");
const authRouter = require("../src/auth/auth.controller");
const cartRouter = require("../src/cart/cart.controller");
const cartCraftRouter = require("../src/craftCart/craftCart.controller");
const checkout = require("../src/checkout/checkout.controller");
const craftRouter = require("../src/craft/craft.controller");
const craftVariantRouter = require("../src/craftVariant/variant.controller");
const culinaryRouter = require("../src/culinary/culinary.controller");
const detailCraftRouter = require("../src/detailMarketplaceCraft/detailCraft.controller");
const detailPackageRouter = require("../src/detailPackage/detailPackage.controller");
const detailReservationRouter = require("../src/detailReservation/detailReservation.controller");
const detailServiceRouter = require("../src/detailServicePackage/detailService.controller");
const galleryRouter = require("../src/gallery/gallery.controller");
const geoRouter = require("../src/geoJSON/geo.controller");
const homestayRouter = require("../src/homestay/homestay.controller");
const homestayFacilityRouter = require("../src/homestayFacility/homestayFacility.controller");
const invoiceRouter = require("../src/invoice/invoice.controller");
const objectRouter = require("../src/object/object.controller");
const packageRouter = require("../src/package/package.controller");
const paymentRouter = require("../src/payment/payment.controller");
const reservationRouter = require("../src/reservation/reservation.controller");
const shippingRouter = require("../src/shipping/shipping.controller");
const souvenirRouter = require("../src/souvenirPlace/souvenir.controller");
const tourismRouter = require("../src/tourismVillage/tourism.controller");
const userRouter = require("../src/user/user.controller");
const worship = require("../src/worship/worship.controller");
const traditional = require("../src/traditional/traditional.controller");
const sequelize = require("../config/database");

router.use("/", authRouter);
router.use("/announcement", announcementRouter);
router.use("/attractions", attractionRouter);
router.use("/carts", cartRouter);
router.use("/culinary", culinaryRouter);
router.use("/detail-crafts", detailCraftRouter);
router.use("/detail-package", detailPackageRouter);
router.use("/detail-reservations", detailReservationRouter);
router.use("/gallery", galleryRouter);
router.use("/geo", geoRouter);
router.use("/homestays", homestayRouter);
router.use("/homestay-facility", homestayFacilityRouter);
router.use("/invoice", invoiceRouter);
router.use("/object", objectRouter);
router.use("/packages", packageRouter);
router.use("/payment", paymentRouter);
router.use("/services", detailServiceRouter);
router.use("/tourism", tourismRouter);
router.use("/variants", craftVariantRouter);
router.use("/worship", worship);
router.use("/traditionals", traditional);

router.use("/addresses", verifyToken, addressRouter);
router.use("/checkouts", verifyToken, checkout);
router.use("/craft-carts", verifyToken, cartCraftRouter);
router.use("/crafts", verifyToken, craftRouter);
router.use("/reservations", verifyToken, reservationRouter);
router.use("/shipping", shippingRouter);
router.use("/souvenirs", souvenirRouter);
router.use("/users", verifyToken, userRouter);

router.get("/db-check", async (req, res) => {
  try {
    // cek versi MySQL
    const [versionResult] = await sequelize.query("SELECT VERSION() AS version");
    const version = versionResult[0].version;

    // cek database aktif
    const [dbResult] = await sequelize.query("SELECT DATABASE() AS db");
    const activeDb = dbResult[0].db;

    const content = {
      Platform: process.env.DB+" (Sequelize)",
      Version: version,
      Database: activeDb || process.env.DB_DATABASE || null,
    };

    return res.status(200).json({
      data: content,
      message: "Successfully Connected to Database",
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return res.status(500).json({
      data: null,
      status: 500,
      message: ["Failed to connect to the database"],
      error: error.message,
    });
  }
});
// 404 handler
router.use("*", (req, res, next) => {
  res.status(404).json({ message: "URl Server Not Found" });
});

module.exports = router;
