"use strict";
const mongoose = require("mongoose");
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");
require("dotenv").config();

exports.createWarehouses = async () => {
  try {
    const warehousesCount = await Warehouse.countDocuments();
    
    if (warehousesCount !== 0) {
      return {
        status: 200,
        message: "Database has warehouses, no action required",
      };
    }
    await Warehouse.seedWarehouses();

    return { status: 201, message: "Warehouses created successfully" };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};