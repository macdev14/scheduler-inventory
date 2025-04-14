const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

const validations = async (product) => {
  if (!product.id) {
    return {
      success: false,
      status: 400,
      message: "Product id is required.",
    };
  }

  const productExists = await Product.findOne({ id: product.id });

  if (!productExists) {
    return {
      success: false,
      status: 404,
      message: "Product not exists.",
    };
  }

  return { success: true };
};

exports.productDeletePersistence = async (product) => {
  try {
    const decoded = jwt.verify(product.token, process.env.SECRET_KEY);
    if (
      decoded.role == process.env.ROLE_ADMIN ||
      decoded.role == process.env.ROLE_MANAGER
    ) {
      // Validations
      let validationResult = await validations(product);

      if (validationResult.success === false) {
        // se houver erros, retornar os erros
        return validationResult;
      }

      const productDeleted = await Product.findOneAndDelete({ id: product.id });

      if (!productDeleted || productDeleted.length === 0) {
        return { status: 404, message: "Product not found." };
      }

      return { success: true, status: 200, data: productDeleted };
    }
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
