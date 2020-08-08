const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/images/products");
  },
  filename: (req, file, callback) => {
    const splitName = file.originalname.split(".");
    const ext = splitName.pop();
    const newName = splitName.join("-");
    callback(null, `${newName}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 4 * 1000 * 1000,
  },
});

module.exports = upload;
