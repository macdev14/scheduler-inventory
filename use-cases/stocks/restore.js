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
  if (!mongoose.Types.ObjectId.isValid(stocks.product_id)) return { status: 400, message: "product_id is not a valid id." };
  if (!mongoose.Types.ObjectId.isValid(stocks.warehouse_id)) return { status: 400, message: "warehouse_id is not a valid id." };
  const stockExists = await Stock.findOne({
    product_id: stocks.product_id,
    warehouse_id: stocks.warehouse_id,
  });

  if (!stockExists) return { status: 404, message: "Product stock does not exist." };

};

exports.stocksRestore = async (stocks) => {
  try {
    if(!stocks.token) return { status: 400, message: "token is required." };

    try {
      const decoded = jwt.verify(stocks.token, process.env.SECRET_KEY);

      if (
        decoded.role !== process.env.ROLE_ADMIN 
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
    

    const response = await Stock.findOneAndUpdate(
      {
        product_id: stocks.product_id,
        warehouse_id: stocks.warehouse_id,
      },
      { active: true },
      { new: true }
    );

    if (!response || response.length === 0) {
      return { status: 404, message: "Product stock not found." };
    }

    return { status: 200, data: response };

  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
