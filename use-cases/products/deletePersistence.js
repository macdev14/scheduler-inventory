const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

exports.productDeletePersistence = async (id) => {
  try {
    const product = await Product.findOneAndDelete({ id: id });
    return { success: true, status: 200, data: product };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
