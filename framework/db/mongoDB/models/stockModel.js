"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    product_id: { type: String, required: true },
    warehouse_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "stock" }
);
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
