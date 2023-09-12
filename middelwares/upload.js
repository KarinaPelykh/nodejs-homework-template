const multer = require("multer");
const path = require("path");
const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const unitquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${unitquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};
const upload = multer({
  storage,
  limits,
});

module.exports = upload;
