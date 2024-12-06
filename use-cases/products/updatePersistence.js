const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

exports.productUpdatePersistence = async (product) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: product.id },
      product,
      { new: true }
    );
    return { success: true, status: 200, data: updatedProduct };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
