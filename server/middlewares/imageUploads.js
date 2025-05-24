const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { CustomError } = require("../utils/CustomError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    let sanitizedName = file.originalname.replaceAll(" ", "-");
    const ext = file.originalname.split(".")[1];

    if (!ext) {
      sanitizedName = `${sanitizedName}.${file.mimetype.split("/")[1]}`;
    }
    const uniqueSuffix = Math.floor(Math.random() * 1e6) + Date.now();
    const newFileName = `${uniqueSuffix}-${sanitizedName}`;

    cb(null, newFileName);
  },
});
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new CustomError("Only image files are allowed", 400), false);
  }
  cb(null, true);
};

const imageUpload = multer({ storage, fileFilter });

module.exports = imageUpload;
