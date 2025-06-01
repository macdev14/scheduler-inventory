"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
  {
    name: { type: String, required: true },
    address_id: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "warehouse" }
);
const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
