const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductDetails,
  addProducts,
  updateProducts,
} = require("../controllers/ProductsController");
// const upload = require("../helpers/upload/product");
const imageFilter = require("../middlewares/ImageFilter");

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.post("/", imageFilter, addProducts);
router.put("/:id", imageFilter, updateProducts);

module.exports = router;
