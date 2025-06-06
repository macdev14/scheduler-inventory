"use strict";
const mongoose = require("mongoose");
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");
require("dotenv").config();

// Creates initial warehouse entries if none exist in the database
exports.createWarehouses = async () => {
  try {
    // Count the number of warehouse documents already in the database
    const warehousesCount = await Warehouse.countDocuments();
    
    // If warehouses already exist, return early with no action
    if (warehousesCount !== 0) {
      return {
        status: 200,
        message: "Database has warehouses, no action required",
      };
    }

    // Seed the database with initial warehouse data
    await Warehouse.seedWarehouses();

    // Return success response indicating creation
    return { status: 201, message: "Warehouses created successfully" };

  } catch (error) {
    // Log and return a generic server error if something goes wrong
    console.log("error", error);
    return { status: 500, message: "Something went wrong" };
  }
};