const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

const validations = async (stock) => {
  if (!stock.product_id) return { status: 400, message: "Product id is required." };
  if (!stock.warehouse_id) return { status: 400, message: "Warehouse id is required." };
  if (!stock.quantity) return { status: 400, message: "Quantity is required." };
  if (stock.quantity < 0) return { status: 400, message: "Quantity cannot be negative." };

  const stockExists = await Stock.findOne({ product_id: stock.product_id, warehouse_id: stock.warehouse_id });

  if (stockExists) return { status: 400, message: "Product stock already exists." };

};

exports.stocksCreate = async (stock) => {
  try {
    const decoded = jwt.verify(stock.token, process.env.SECRET_KEY);

    if (
      decoded.role == process.env.ROLE_ADMIN ||
      decoded.role == process.env.ROLE_MANAGER
    ) {
      // Validations
      let validationResult = await validations(stock);

      if (validationResult) return validationResult;

      const response = await Stock.create(stock);

      if (!response || response.length === 0) {
        return { status: 404, message: "Product stock not found." };
      }

      return {
        status: 200,
        message: "Stock product created successfully.",
      };
    }
  } catch (error) {
    console.log("error", error);

    // If the user already exists (duplicate key error in MongoDB)
    if (error.code === 11000) {
      return ({ status: 400, message: "user already exists" });
    }

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
