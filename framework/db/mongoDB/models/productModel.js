"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    image: { type: String, required: false },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "products" }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
