const mongoose = require("mongoose");
const Product = require("../models/product");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const time = new Date().toLocaleString("en-US", options);

// Get All Products
exports.getAllProducts = (req, res, next) => {
  Product.find()
    .exec()
    .then((products) => {
      const response = {
        products: products.map((product) => {
          return {
            _id: product._id,
            name: product.name,
            unitCost: product.unitCost,
            quantity: product.quantity,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => next(error));
};

// Create One Product
exports.createOneProduct = (req, res, next) => {
  const product = createProduct(req);
  product
    .save()
    .then((product) => {
      res.status(200).json({
        message: "Product Created Succefully",
        product: {
          _id: product._id,
          name: product.name,
          unitCost: product.unitCost,
          quantity: Number(product.quantity),
        },
      });
    })
    .catch((error) => next(error));
};

// Delete One Product
exports.deleteOneProduct = async (req, res, next) => {
  const id = req.params._id;
  await Product.findByIdAndDelete(id)
    .then((product) => {
      res.status(200).json({
        message: "Product deleted Succefully",
        product: {
          _id: product._id,
          name: product.name,
          unitCost: product.unitCost,
          quantity: Number(product.quantity),
        },
      });
    })
    .catch((error) => next(error));
};

const createProduct = (req) => {
  return new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    unitCost: req.body.unitCost,
    quantity: req.body.quantity,
  });
};
