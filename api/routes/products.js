const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const ProductController = require("../controllers/products");

router.get("/", ProductController.getAllProducts);

router.delete("/:_id", ProductController.deleteOneProduct)

router.post("/", ProductController.createOneProduct);

module.exports = router;
