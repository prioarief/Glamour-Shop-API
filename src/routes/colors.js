const express = require("express");
const router = express.Router();
const TokenCheck = require("../middlewares/TokenCheck");
const { checkRole } = require("../middlewares/RoleCheck");

const {
  getAllColors,
  getColorDetails,
  addColors,
  updateColors,
  deleteColors,
} = require("../controllers/ColorsController");

router.get("/", getAllColors);
router.get("/:id", getColorDetails);
router.post("/", /* TokenCheck, checkRole,*/ addColors);
router.put("/:id", /* TokenCheck, checkRole, */ updateColors);
router.delete("/:id", /* TokenCheck, checkRole, */ deleteColors);

module.exports = router;
