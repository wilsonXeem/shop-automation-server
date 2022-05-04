const express = require("express");
const router = express.Router();
const dailySalesController = require("../controllers/dailySales");

router.get("/", dailySalesController.getAllSales);
router.post("/", dailySalesController.createOneSale);

module.exports = router;
