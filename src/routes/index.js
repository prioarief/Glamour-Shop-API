const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const profileRoute = require("./profile");
const productsRoute = require("./products");

router.use("/api/auth", authRoute);
router.use("/api/products", productsRoute);
router.use("/api/profile", profileRoute);

module.exports = router;
