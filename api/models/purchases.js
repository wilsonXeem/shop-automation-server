const mongoose = require("mongoose");

const purchases = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  time: { type: String },
  name: { type: String },
  unitCost: { type: String, default: "0" },
  quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model("Purchases", purchases);
