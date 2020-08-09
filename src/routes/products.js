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
const TokenCheck = require("../middlewares/TokenCheck");
const {checkRole} = require("../middlewares/RoleCheck");

router.get("/", TokenCheck, getAllProducts);
router.get("/:id", TokenCheck, getProductDetails);
router.post("/", TokenCheck, checkRole, imageFilter, addProducts);
router.put("/:id", TokenCheck, checkRole, imageFilter, updateProducts);
router.delete("/:id", TokenCheck, checkRole, deleteProducts);

module.exports = router;
