const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

exports.stockCreatePersistence = async (stock) => {
  try {
    const response = await Stock.create(stock);

    return {
      success: true,
      status: 200,
      message: "Stock product created successfully.",
    };
  } catch (error) {
    console.log("error", error);

    if (error.code === 11000) {
      return {
        success: false,
        status: 400,
        message: "Stock product already exists.",
      };
    }

    return { success: false, status: 500, message: "Something went wrong" };
  }
};
