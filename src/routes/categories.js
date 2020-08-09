const express = require("express");
const router = express.Router();
const TokenCheck = require("../middlewares/TokenCheck");
const { checkRole } = require("../middlewares/RoleCheck");

const {
  getAllCategories,
  getCategoryDetails,
  addCategories,
} = require("../controllers/CategoriesController");

router.get("/", TokenCheck, getAllCategories);
router.get("/:id", TokenCheck, getCategoryDetails);
router.post("/", TokenCheck, checkRole, addCategories);

module.exports = router;
