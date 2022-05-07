const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchases");

router.get("/", purchaseController.getAllPurchases);
router.post("/", purchaseController.createOnePurchase);

router.delete("/:_id", purchaseController.deleteOnePurchase)

module.exports = router;
