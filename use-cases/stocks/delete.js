const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

// Validation function for deleting a stock entry
const validations = async (stocks) => {
  // Check if required fields are present
  if (!stocks.product_id) return { status: 400, message: "product_id is required." };
  if (!stocks.warehouse_id) return { status: 400, message: "warehouse_id is required." };

  // Ensure the IDs are valid MongoDB ObjectId values
  if (!mongoose.Types.ObjectId.isValid(stocks.product_id)) {
    return { status: 400, message: "product_id is not a valid id." };
  }
  if (!mongoose.Types.ObjectId.isValid(stocks.warehouse_id)) {
    return { status: 400, message: "warehouse_id is not a valid id." };
  }

  // Check that the stock entry exists
  const stockExists = await Stock.findOne({
    product_id: stocks.product_id,
    warehouse_id: stocks.warehouse_id,
  });

  if (!stockExists) {
    return { status: 404, message: "Product stock does not exist." };
  }
};

// Main logic to soft-delete a stock entry (mark as inactive)
exports.stocksDelete = async (stocks) => {
  try {
    // Ensure a token is provided
    if (!stocks.token) return { status: 400, message: "token is required." };

    try {
      // Decode and verify the JWT token
      const decoded = jwt.verify(stocks.token, process.env.SECRET_KEY);

      // Only admins and managers are authorized
      if (
        decoded.role !== process.env.ROLE_ADMIN &&
        decoded.role !== process.env.ROLE_MANAGER
      ) {
        return { status: 403, message: "Access denied" };
      }
    } catch (error) {
      // Return a generic access denied error if JWT verification fails
      return { status: 403, message: "Access denied" };
    }

    // Validate input and stock existence
    let validationResult = await validations(stocks);
    if (validationResult) return validationResult;

    // Perform the update: deactivate the stock by setting active to false
    const response = await Stock.findOneAndUpdate(
      {
        product_id: stocks.product_id,
        warehouse_id: stocks.warehouse_id,
      },
      { active: false },
      { new: true }
    );

    // Handle case where stock was not found or update failed
    if (!response || response.length === 0) {
      return { status: 404, message: "Product stock not found." };
    }

    // Return success response with updated document
    return { status: 200, data: response };
  } catch (error) {
    // Handle any unexpected error
    return { status: 500, message: "Something went wrong" };
  }
};
