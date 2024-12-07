const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

exports.stockReadPersistence = async () => {
  try {
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {

    const stocks = await Stock.find({ active: true });

    // if (!products  products.length === 0) {
    //     return { status: 404, message: "Products not found." };
    // }

    return { success: true, status: 200, data: stocks };
    // }
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.stockIdReadPersistence = async (product_id) => {
  try {
    const stock = await Stock.find({ product_id: product_id });

    return { success: true, status: 200, data: stock };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
