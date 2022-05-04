const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  unitCost: { type: String, default: "0" },
  quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
