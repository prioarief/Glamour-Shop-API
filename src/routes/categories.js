const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryDetails,
} = require("../controllers/CategoriesController");

router.get("/", getAllCategories);
router.get("/:id", getCategoryDetails);

module.exports = router;
