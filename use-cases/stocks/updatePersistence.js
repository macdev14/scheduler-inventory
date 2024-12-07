const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

exports.stockUpdatePersistence = async (stock) => {
  try {
    const updatedStock = await Stock.findOneAndUpdate(
      { product_id: stock.product_id, warehouse_id: stock.warehouse_id },
      stock,
      { new: true }
    );
    return { success: true, status: 200, data: updatedStock };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
