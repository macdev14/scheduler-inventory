"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    code: { type: String, required: true },
    description: { type: String, required: true },
    product_type_id: { type: String, required: true },
    image_name: { type: String, required: false },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "product" }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
