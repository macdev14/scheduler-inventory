const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");

exports.warehousesGet = async () => {
  try {
    const warehouses = await Warehouse.find();
    return { status: 200, data: warehouses };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};

exports.warehousesGetById = async (id) => {
  try {
    const warehouse = await Warehouse.find({ id: id });
    return { status: 200, data: warehouse };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
