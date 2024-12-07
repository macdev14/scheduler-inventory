"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    product_id: { type: Number, required: true },
    warehouse_id: { type: Number, required: true },
    quantity: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "product_warehouse" }
);
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
