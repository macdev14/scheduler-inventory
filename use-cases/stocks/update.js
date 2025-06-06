const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

// Validation function for checking required fields and verifying existence of the stock entry
const validations = async (stocks) => {
  // Check if product_id and warehouse_id are provided and valid
  if (!stocks.product_id) return { status: 400, message: "product_id is required." };
  if (!mongoose.Types.ObjectId.isValid(stocks.product_id)) {
    return { status: 400, message: "product_id is not a valid id." };
  }

  if (!stocks.warehouse_id) return { status: 400, message: "warehouse_id is required." };
  if (!mongoose.Types.ObjectId.isValid(stocks.warehouse_id)) {
    return { status: 400, message: "warehouse_id is not a valid id." };
  }

  // Ensure quantity is provided and valid
  if (!stocks.quantity) return { status: 400, message: "quantity is required." };
  if (stocks.quantity < 1) {
    return { status: 400, message: "Quantity cannot be negative or 0." };
  }

  // Check if the stock entry exists for the given product and warehouse
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
    // Ensure token is provided
    if (!stocks.token) return { status: 400, message: "token is required." };

    // Verify and decode the token
    const decoded = jwt.verify(stocks.token, process.env.SECRET_KEY);

    // Only allow users with admin or manager role
    if (
      decoded.role === process.env.ROLE_ADMIN ||
      decoded.role === process.env.ROLE_MANAGER
    ) {
      // Validate input and check stock existence
      const validationResult = await validations(stocks);
      if (validationResult) return validationResult;

      // Update the stock quantity
      const updatedStock = await Stock.findOneAndUpdate(
        { product_id: stocks.product_id, warehouse_id: stocks.warehouse_id },
        { quantity: stocks.quantity },
        { new: true }
      );

      // If update failed or no record was matched
      if (!updatedStock || updatedStock.length === 0) {
        return { status: 404, message: "Product stock not found." };
      }

      // Return success with updated data
      return { status: 200, data: updatedStock };
    }
  } catch (error) {
    // Fallback error response
    return { status: 500, message: "Something went wrong" };
  }
};
