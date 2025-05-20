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
const reserveationRouter = require("../src/reservation/reservation.controller");
const tourismRouter = require("../src/tourismVillage/tourism.controller");
const userRouter = require("../src/user/user.controller");
const souvenirRouter = require("../src/souvenirPlace/souvenir.controller");

router.use("/", authRouter);
router.use("/announcement", announcementRouter);
router.use("/carts", cartRouter);
router.use("/detailReservations", detailReservationRouter);
router.use("/detailPackage", detailPackageRouter);
router.use("/geo", geoRouter);
router.use("/gallery", galleryRouter);
router.use("/homestays", homestayRouter);
router.use("/homestay-facility", homestayFacilityRouter);
router.use("/object", objectRouter);
router.use("/packages", packageRouter);
router.use("/reservations", reserveationRouter);
router.use("/services", detailServiceRouter);
router.use("/tourism", tourismRouter);
router.use("/users", userRouter);
router.use("/souvenirs", souvenirRouter);

router.use("*", (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
