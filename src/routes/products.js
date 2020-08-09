const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductDetails,
  addProducts,
  updateProducts,
} = require("../controllers/ProductsController");
const upload = require("../helpers/upload/product");

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.post("/", upload.single("image"), addProducts);
router.put("/:id", upload.single("image"), updateProducts);

module.exports = router;
