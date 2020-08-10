const express = require("express");
const router = express.Router();
const TokenCheck = require("../middlewares/TokenCheck");
const { checkRole } = require("../middlewares/RoleCheck");

const {
  getAllSizes,
  getSizeDetails,
  addSizes,
  updateSizes,
  deleteSizes,
} = require("../controllers/SizesController");

router.get("/", TokenCheck, getAllSizes);
router.get("/:id", TokenCheck, getSizeDetails);
router.post("/", TokenCheck, checkRole, addSizes);
router.put("/:id", TokenCheck, checkRole, updateSizes);
router.delete("/:id", TokenCheck, checkRole, deleteSizes);

module.exports = router;
