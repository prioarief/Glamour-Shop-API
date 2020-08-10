const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const profileRoute = require("./profile");
const productsRoute = require("./products");
const transactionRoute = require("./transaction");
const categoriesRoute = require("./categories");

router.use("/api/auth", authRoute);
router.use("/api/products", productsRoute);
router.use("/api/profile", profileRoute);
router.use("/api/transaction", transactionRoute);
router.use("/api/categories", categoriesRoute);
module.exports = router;
