const multer = require("multer");
const { CustomError } = require("../utils/CustomError");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/map");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mitetype === "application/json" ||
    file.originalname.endsWith(".geojson")
  ) {
    cb(null, true);
  } else {
    cb(new CustomError("hanya file geojson  yang di izikan", 400), false);
  }
};

const mapUpload = multer({ storage, fileFilter });

module.exports = mapUpload;
