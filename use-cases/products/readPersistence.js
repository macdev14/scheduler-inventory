const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

exports.productReadPersistence = async () => {
  try {
    const products = await Product.find({ active: true });
    return { success: true, status: 200, data: products };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.productIdReadPersistence = async (id) => {
  try {
    const product = await Product.find({ id: id });
    console.log("product", product);
    return { success: true, status: 200, data: product };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
