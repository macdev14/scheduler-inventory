const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

const validations = async (product) => {
  if (!product.id) return { status: 400, message: "Product id is required." };
  const productExists = await Product.findOne({ id: product.id });
  if (productExists) return { status: 400, message: "Product already exists." };
  if (!product.name) return { status: 400, message: "Product name is required." };
  if (!product.product_type_id) return { status: 400, message: "Product type id is required." };

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

      if (validationResult.success === false) return validationResult;

      const response = await Product.create(product);

      if (!response || response.length === 0) {
        return { status: 404, message: "Product not found." };
      }

      return {
        status: 200,
        message: "Product created successfully.",
      };
    }
  } catch (error) {
    console.log("error", error);

    // If the user already exists (duplicate key error in MongoDB)
    if (error.code === 11000) {
      return ({ status: 400, message: "user already exists" });
    }

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
