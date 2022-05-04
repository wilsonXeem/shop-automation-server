const mongoose = require("mongoose");

const expenses = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  charges: { type: String, default: "0" },
  salaries: { type: String, default: "0" },
  others: { type: String, default: "0" },
});

module.exports = mongoose.model("Expenses", expenses);
