const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

exports.productCreatePersistence = async (product) => {
  console.log("product 999", product);

  try {
    const response = await Product.create(product);

    console.log("response", response);

    return {
      success: true,
      status: 200,
      message: "Product created successfully",
    };
  } catch (error) {
    console.log("error", error);

    if (error.code === 11000) {
      return { success: false, status: 400, message: "product already exists" };
    }

    return { success: false, status: 500, message: "Something went wrong" };
  }
};
