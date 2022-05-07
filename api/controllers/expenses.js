const mongoose = require("mongoose");
const Expenses = require("../models/expenses");

// Get All Products
exports.getAllExpenses = (req, res, next) => {
  Expenses.find()
    .exec()
    .then((expenses) => {
      const response = {
        expenses: expenses.map((expense) => {
          return {
            _id: expense._id,
            charges: expense.charges,
            salaries: expense.salaries,
            others: expense.others,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => next(error));
};

// Create One Purchase
exports.createExpense = async (req, res, next) => {
  const expense = createExpense(req);
  expense
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
};

// Delete One Product
exports.deleteOneExpense = async (req, res, next) => {
  const id = req.params._id;
  await Expenses.findByIdAndDelete(id)
    .then((purchase) => {
      res.status(200).json({
        message: "Expense deleted Succefully",
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

const createExpense = (req) => {
  return new Expenses({
    _id: new mongoose.Types.ObjectId(),
    charges: req.body.charges,
    salaries: req.body.salaries,
    others: req.body.others,
  });
};
