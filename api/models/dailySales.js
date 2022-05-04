const mongoose = require("mongoose");

const dailySales = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  time: { type: String },
  name: { type: String },
  rate: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  remarks: { type: String },
});

module.exports = mongoose.model("DailySales", dailySales);
