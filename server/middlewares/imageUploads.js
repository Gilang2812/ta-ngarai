const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { CustomError } = require("../utils/CustomError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const sanitizedName = file.originalname.replaceAll(" ", "-");
    const filePath = path.join("public/images", sanitizedName);

    // Jika file sudah ada, gunakan nama aslinya (tidak upload ulang)
    if (fs.existsSync(filePath)) {
      console.log("File sudah ada:", sanitizedName);
      return cb(null, sanitizedName); // pakai nama aslinya
    }

    // Kalau belum ada, generate nama unik
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
