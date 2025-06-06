const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

const validations = async (stocks) => {
  if (!stocks.product_id) return { status: 400, message: "product_id is required." };
  if (!stocks.warehouse_id) return { status: 400, message: "warehouse_id is required." };
  if (!mongoose.Types.ObjectId.isValid(stocks.product_id)) return { status: 400, message: "Product id is not a valid id." };
  if (!mongoose.Types.ObjectId.isValid(stocks.warehouse_id)) return { status: 400, message: "Warehouse id is not a valid id." };
  if (!stocks.quantity) return { status: 400, message: "quantity is required." };
  if (stocks.quantity < 1) return { status: 400, message: "Quantity cannot be negative or 0." };

  const warehouseExists = await Warehouse.findOne({ _id: stocks.warehouse_id });
  if (!warehouseExists) return { status: 400, message: "Warehouse does not exist." };

  const productExists = await Product.findOne({ _id: stocks.product_id });
  if (!productExists) return { status: 400, message: "Product does not exist." };

  const stockExists = await Stock.findOne({ product_id: stocks.product_id, warehouse_id: stocks.warehouse_id });

  if (stockExists) return { status: 400, message: "Product stock already exists." };

};

exports.stocksCreate = async (stocks) => {
  if (!stocks.token) return { status: 400, message: "token is required." };
  try {
    try {
      const decoded = jwt.verify(stocks.token, process.env.SECRET_KEY);

      if (
        decoded.role !== process.env.ROLE_ADMIN &&
        decoded.role !== process.env.ROLE_MANAGER
      ) {
        return { status: 403, message: "Access denied" };
      }

    } catch (error) {
      console.log("error", error);

      // Fallback error response
      return { status: 403, message: "Access denied" };
    }

    // Validations
    let validationResult = await validations(stocks);

    if (validationResult) return validationResult;

    const response = await Stock.create(stocks);

    if (!response || response.length === 0) {
      return { status: 404, message: "Product stock not found." };
    }

    return {
      status: 200,
      message: "Stock product created successfully.",
    };

  } catch (error) {
    console.log("error", error);

    // If the user already exists (duplicate key error in MongoDB)
    if (error.code === 11000) {
      return ({ status: 400, message: "stock already exists" });
    }

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
