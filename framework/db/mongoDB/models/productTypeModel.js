"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTypeSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "product_type" }
);
const ProductType = mongoose.model("ProductType", productTypeSchema);

module.exports = ProductType;
