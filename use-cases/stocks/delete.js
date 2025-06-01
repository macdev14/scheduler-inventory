const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

const validations = async (stock) => {
  if (!stock.product_id) return {status: 400,message: "Product id is required."};
  if (!stock.warehouse_id) return {status: 400,message: "Warehouse id is required."};

  const stockExists = await Stock.findOne({
    product_id: stock.product_id,
    warehouse_id: stock.warehouse_id,
  });

  if (!stockExists) return {status: 404,message: "Product stock does not exist."};
  
};

exports.stocksDelete = async (stock) => {
  try {
    const decoded = jwt.verify(stock.token, process.env.SECRET_KEY);
    if (
      decoded.role == process.env.ROLE_ADMIN ||
      decoded.role == process.env.ROLE_MANAGER
    ) {
      // Validations
      let validationResult = await validations(stock);

      if (validationResult.success === false) {
        // se houver erros, retornar os erros
        return validationResult;
      }

      const response = await Stock.findOneAndDelete({
        product_id: stock.product_id,
        warehouse_id: stock.warehouse_id,
      });

      if (!response || response.length === 0) {
        return { status: 404, message: "Product stock not found." };
      }

      return { status: 200, data: response };
    }
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
