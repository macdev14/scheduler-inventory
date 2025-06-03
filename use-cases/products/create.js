const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");
require("../../framework/db/mongoDB/models/productTypeModel");
const ProductType = mongoose.model("ProductType");
const path = require("path");
require("../../framework/db/mongoDB/models/fileModel");
const File = mongoose.model("File");

const validations = async (product) => {
  if (!product.code) return { status: 400, message: "Product code is required." };
  const productExists = await Product.findOne({ code: product.code });
  if (productExists) return { status: 400, message: "Product already exists." };
  if (!product.description) return { status: 400, message: "Product description is required." };
  if (!product.product_type_id) return { status: 400, message: "Product type id is required." };

  const productTypeExists = await ProductType.findOne({ _id: product.product_type_id });

  if (!productTypeExists) return { status: 400, message: "Product type does not exist." };
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
exports.productsCreate = async (product, image) => {
  console.log("image", image);
  const { code, description, product_type_id, image_url, token } = product;
  try {

    if (!token) return { status: 400, message: "User token is required." };

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (
        decoded.role !== process.env.ROLE_ADMIN &&
        decoded.role !== process.env.ROLE_MANAGER
      ) {
        return { status: 403, message: "Access denied" };
      }

    } catch (error) {
      console.log("error", error);

      // Fallback error response
      return { status: 403, message: "Access denied" };
    }

    if (!image) return ({ status: 400, message: "Product image is required." });
    let validationResult = await validations(product);

    try {
      if (validationResult) throw validationResult;
    } catch (error) {
      return error;
    }

    let fileName = null;

    // Handle and validate profile picture upload

    const allowedExtensions = [".jpeg", ".png"];
    const extension = path.extname(image.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return ({ status: 400, message: "only jpeg and png extensions are allowed" });
    }

    // Create and save a new file document in the database
    const newFile = new File({
      hidden_name: image.filename,
      real_name: image.originalname,
      insert_date: new Date().toISOString(),
      extension,
      active: "true",
    });

    const savedFile = await newFile.save();
    fileName = savedFile.hidden_name;


    if (fileName) product.image_name = fileName;

    const response = await Product.create(product);

    if (!response || response.length === 0) {
      return { status: 404, message: "Product not found." };
    }

    return {
      status: 200,
      message: "Product created successfully.",
      data: response,
    };

  } catch (error) {
    console.log("error", error);

    // If the product already exists (duplicate key error in MongoDB)
    if (error.code === 11000) {
      return ({ status: 400, message: "product already exists" });
    }

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
