const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductDetails,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/ProductsController");
const imageFilter = require("../middlewares/ImageFilterProducts");

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.post("/", imageFilter, addProducts);
router.put("/:id", imageFilter, updateProducts);
router.delete("/:id", deleteProducts);

module.exports = router;
