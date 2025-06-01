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

  if (productExists) {
    return {
      success: false,
      status: 400,
      message: "Product already exists.",
    };
  }

  if (!product.name) {
    return {
      success: false,
      status: 400,
      message: "Product name is required.",
    };
  }

  if (!product.product_type_id) {
    return {
      success: false,
      status: 400,
      message: "Product type id is required.",
    };
  }

  return { success: true };
};

/**
 * Create a new product
 * @param {Object} product - Product object
 * @param {string} product.id - Product id
 * @param {string} product.name - Product name
 * @param {string} product.product_type_id - Product type id
 * @param {string} product.token - Token
 * @returns {Object} - Status and message
 */
exports.productsCreate = async (product) => {
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
      const response = await Product.create(product);

      if (!response || response.length === 0) {
        return { status: 404, message: "Product not found." };
      }

      return {
        success: true,
        status: 200,
        message: "Product created successfully.",
      };
    }
  } catch (error) {
    console.log("error", error);

    if (error.code === 11000) {
      return {
        success: false,
        status: 400,
        message: "Product already exists.",
      };
    }

    return { success: false, status: 500, message: "Something went wrong." };
  }
};
