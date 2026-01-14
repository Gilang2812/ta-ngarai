const fs = require("fs");
const path = require("path");

const unlinkSync = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error deleting file at ${filePath}:`, error);
  }
};

module.exports = { unlinkSync };
