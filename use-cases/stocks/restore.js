const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

// Validation function to ensure the stock entry exists and has valid identifiers
const validations = async (stocks) => {
  // Check required fields
  if (!stocks.product_id) return { status: 400, message: "product_id is required." };
  if (!stocks.warehouse_id) return { status: 400, message: "warehouse_id is required." };

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(stocks.product_id)) {
    return { status: 400, message: "product_id is not a valid id." };
  }
  if (!mongoose.Types.ObjectId.isValid(stocks.warehouse_id)) {
    return { status: 400, message: "warehouse_id is not a valid id." };
  }

  // Check if the stock entry exists
  const stockExists = await Stock.findOne({
    product_id: stocks.product_id,
    warehouse_id: stocks.warehouse_id,
  });

  if (!stockExists) {
    return { status: 404, message: "Product stock does not exist." };
  }
};

exports.stocksRestore = async (stocks) => {
  try {
    // Ensure token is provided
    if (!stocks.token) return { status: 400, message: "token is required." };

    // Verify and decode the token
    try {
      const decoded = jwt.verify(stocks.token, process.env.SECRET_KEY);

      // Only allow access to admins
      if (decoded.role !== process.env.ROLE_ADMIN) {
        return { status: 403, message: "Access denied" };
      }

    } catch (error) {
      // Return forbidden if token is invalid
      return { status: 403, message: "Access denied" };
    }

    // Run validations for provided stock identifiers
    let validationResult = await validations(stocks);
    if (validationResult) return validationResult;

    // Restore the stock entry (set active to true)
    const response = await Stock.findOneAndUpdate(
      {
        product_id: stocks.product_id,
        warehouse_id: stocks.warehouse_id,
      },
      { active: true },
      { new: true }
    );

    // Handle case where stock entry was not found
    if (!response || response.length === 0) {
      return { status: 404, message: "Product stock not found." };
    }

    // Return success with restored stock data
    return { status: 200, data: response };

  } catch (error) {
    // Fallback error response
    return { status: 500, message: "Something went wrong" };
  }
};
