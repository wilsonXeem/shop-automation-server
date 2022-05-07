const mongoose = require("mongoose");
const DailySales = require("../models/dailySales");
const Product = require("../models/product");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const time = new Date().toLocaleString("en-US", options);

// Get All Products
exports.getAllSales = (req, res, next) => {
  DailySales.find()
    .exec()
    .then((sales) => {
      const response = {
        sales: sales.filter((sale) => {
          if (sale.time === new Date().toLocaleDateString()) {
            return {
              _id: sale._id,
              name: sale.name,
              rate: sale.rate,
              quantity: sale.quantity,
              remarks: sale.remarks,
            };
          }
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => next(error));
};

// Create One sale
exports.createOneSale = async (req, res, next) => {
  const sale = ceateSale(req);
  const name = req.body.name;
  let product = await Product.findOne({ name: name }).select(
    "name unitCost quantity"
  );
  if (product) {
    product.quantity -= Number(req.body.quantity);
    product.save();
    sale
      .save()
      .then((sale) => {
        res.status(200).json({
          message: "Sales Made Succefully",
          sale: {
            _id: sale._id,
            name: sale.name,
            rate: sale.rate,
            quantity: sale.quantity,
            remarks: sale.remarks,
          },
        });
      })
      .catch((error) => next(error));
  } else {
    sale
      .save()
      .then((sale) => {
        res.status(200).json({
          message: "Sales Made Succefully",
          sale: {
            _id: sale._id,
            name: sale.name,
            rate: sale.rate,
            quantity: sale.quantity,
            remarks: sale.remarks,
          },
        });
      })
      .catch((error) => next(error));
  }
};

// Delete One Sale
exports.deleteOneSale = async (req, res, next) => {
  const id = req.params._id;
  await DailySales.findByIdAndDelete(id)
    .then((sale) => {
      res.status(200).json({
        message: "Product deleted Succefully",
        sale: {
          _id: sale._id,
          name: sale.name,
          rate: sale.rate,
          quantity: sale.quantity,
          remarks: sale.remarks,
        },
      });
    })
    .catch((error) => next(error));
};

const ceateSale = (req) => {
  return new DailySales({
    _id: new mongoose.Types.ObjectId(),
    time: new Date().toLocaleDateString(),
    name: req.body.name,
    rate: req.body.rate,
    quantity: req.body.quantity,
    remarks: req.body.remarks,
  });
};
