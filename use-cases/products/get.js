const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

exports.productsGet = async () => {
  try {
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // if (decoded.role == process.env.ROLE_ADMIN || decoded.role == process.env.ROLE_MANAGER) {

    const products = await Product.find({ active: true });

    // if (!products  products.length === 0) {
    //     return { status: 404, message: "Products not found." };
    // }

    return { success: true, status: 200, data: products };
    // }
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.productsGetById = async (id) => {
  try {
    const product = await Product.find({ id: id });
    console.log("product", product);
    return { success: true, status: 200, data: product };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
