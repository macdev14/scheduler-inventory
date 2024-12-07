const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");

exports.warehouseReadPersistence = async () => {
  try {
    const warehouses = await Warehouse.find();
    return { success: true, status: 200, data: warehouses };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.warehouseIdReadPersistence = async (id) => {
  try {
    const warehouse = await Warehouse.find({ id: id });
    return { success: true, status: 200, data: warehouse };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
