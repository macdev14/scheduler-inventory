const mongoose = require("mongoose");

require("../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

exports.productCreatePersistence = async (product) => {
  console.log("product", product);
  try {
    const response = await Product.create(product);
    console.log("response", response);
    return { status: 200, message: "Product created successfully" };
  } catch (error) {
    console.log("error", error);
    if (error.code === 11000) {
      return { status: 400, message: "product already exists" };
    }
    return { status: 500, message: "Something went wrong" };
  }
};
