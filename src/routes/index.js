const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const productsRoute = require("./products");

router.use("/api/auth", authRoute);
router.use("/api/products", productsRoute);

module.exports = router;
