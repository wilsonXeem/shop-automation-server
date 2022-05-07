const mongoose = require("mongoose");
const Purchases = require("../models/purchases");
const Product = require("../models/product");

// Get All Products
exports.getAllPurchases = (req, res, next) => {
  Purchases.find()
    .exec()
    .then((purchases) => {
      const response = {
        purchases: purchases.map((purchase) => {
          return {
            _id: purchase._id,
            name: purchase.name,
            unitCost: purchase.unitCost,
            quantity: purchase.quantity,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => next(error));
};

// Create One Purchase
exports.createOnePurchase = async (req, res, next) => {
  const name = req.body.name;
  let product = await Product.findOne({ name: name }).select(
    "name unitCost quantity"
  );
  const purchase = createPurchase(req);
  if (product) {
    product.quantity += Number(req.body.quantity);
    product.unitCost = req.body.unitCost;
    product.save();
    purchase
      .save()
      .then((purchase) => {
        res.status(200).json({
          message: "Purchase Made Succefully",
          purchase: {
            _id: purchase._id,
            name: purchase.name,
            unitCost: purchase.unitCost,
            quantity: purchase.quantity,
          },
        });
      })
      .catch((error) => next(error));
  } else {
    product = createProduct(req);
    product.save();
    purchase
      .save()
      .then((purchase) => {
        res.status(200).json({
          message: "Purchase Made Succefully",
          purchase: {
            _id: purchase._id,
            name: purchase.name,
            unitCost: purchase.unitCost,
            quantity: Number(purchase.quantity),
          },
        });
      })
      .catch((error) => next(error));
  }
};

// Delete One Product
exports.deleteOnePurchase = async (req, res, next) => {
  const id = req.params._id;
  await Purchases.findByIdAndDelete(id)
    .then((purchase) => {
      res.status(200).json({
        message: "Purchase deleted Succefully",
        purchase: {
          _id: purchase._id,
          name: purchase.name,
          unitCost: purchase.unitCost,
          quantity: Number(purchase.quantity),
        },
      });
    })
    .catch((error) => next(error));
};

const createPurchase = (req) => {
  return new Purchases({
    _id: new mongoose.Types.ObjectId(),
    time: new Date().toLocaleDateString(),
    name: req.body.name,
    unitCost: req.body.unitCost,
    quantity: req.body.quantity,
  });
};
const createProduct = (req) => {
  return new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    unitCost: req.body.unitCost,
    quantity: req.body.quantity,
  });
};
