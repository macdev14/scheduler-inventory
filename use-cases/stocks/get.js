const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

exports.stocksGet = async ({ token, product_id, warehouse_id, quantity, active, page, limit }) => {
  try {
    if (!token) return { status: 400, message: "token is required." };

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (
      decoded.role !== process.env.ROLE_ADMIN &&
      decoded.role !== process.env.ROLE_MANAGER &&
      decoded.role !== process.env.ROLE_USER
    ) {
      return { status: 403, message: "Access denied" };
    }


    const query = { active: true };

    if (product_id) {
      if (!mongoose.Types.ObjectId.isValid(product_id)) return { status: 400, message: "product_id is not a valid id." };
      query.product_id = product_id;
    }
    
    if (warehouse_id) {
      if (!mongoose.Types.ObjectId.isValid(warehouse_id)) return { status: 400, message: "warehouse_id is not a valid id." };
      query.warehouse_id = warehouse_id;
    }

    if (quantity) {
      query.quantity = quantity;
    }

    if (active && decoded.role === process.env.ROLE_ADMIN) {
      query.active = active;
    }

    const skip = (page - 1) * limit;

    const [stocks, total] = await Promise.all([
      Stock.find(query).skip(skip).limit(limit),
      Stock.countDocuments(query)
    ]);

    if (!stocks || stocks.length === 0) {
      return { status: 404, message: "Stocks not found." };
    }

    return {
      status: 200,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: stocks
    };

  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};



