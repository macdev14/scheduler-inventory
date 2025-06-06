const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

const validations = async (stocks) => {
  if (!stocks.product_id) return { status: 400, message: "product_id is required." };
  if (!mongoose.Types.ObjectId.isValid(stocks.product_id)) return { status: 400, message: "product_id is not a valid id." };
  if (!stocks.warehouse_id) return { status: 400, message: "warehouse_id is required." };
  if (!mongoose.Types.ObjectId.isValid(stocks.warehouse_id)) return { status: 400, message: "warehouse_id is not a valid id." };
  if (!stocks.quantity) return { status: 400, message: "quantity is required." };
  if (stocks.quantity < 1) return { status: 400, message: "Quantity cannot be negative or 0." };

  const stockExists = await Stock.findOne({
    product_id: stocks.product_id,
    warehouse_id: stocks.warehouse_id,
  });

  if (!stockExists) {
    return {
      status: 400,
      message: "Product stock not exists.",
    };
  }
};

exports.stocksUpdate = async (stocks) => {
  try {

    if (!stocks.token) return { status: 400, message: "token is required." };
    const decoded = jwt.verify(stocks.token, process.env.SECRET_KEY);

    if (
      decoded.role == process.env.ROLE_ADMIN ||
      decoded.role == process.env.ROLE_MANAGER
    ) {
      // Validations
      let validationResult = await validations(stocks);

      if (validationResult) return validationResult;

      const updatedStock = await Stock.findOneAndUpdate(
        { product_id: stocks.product_id, warehouse_id: stocks.warehouse_id },
        { quantity: stocks.quantity },
        { new: true }
      );

      if (!updatedStock || updatedStock.length === 0) {
        return { status: 404, message: "Product stock not found." };
      }

      return { status: 200, data: updatedStock };
    }
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
