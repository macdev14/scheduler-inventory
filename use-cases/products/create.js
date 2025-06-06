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

// Validation logic to ensure product input is correct before creation
const validations = async (product) => {
  // Ensure product code is provided
  if (!product.code) return { status: 400, message: "code is required." };

  // Check if a product with the same code already exists
  const productExists = await Product.findOne({ code: product.code });
  if (productExists) return { status: 400, message: "Product already exists." };

  // Ensure product description is provided
  if (!product.description) return { status: 400, message: "description is required." };

  // Ensure product type is referenced
  if (!product.product_type_id) return { status: 400, message: "product_type_id is required." };

  // Check if the provided product type exists
  const productTypeExists = await ProductType.findOne({ _id: product.product_type_id });
  if (!productTypeExists) return { status: 400, message: "Product type does not exist." };
};

exports.productsCreate = async (product, image) => {
  console.log("image", image);
  const { code, description, product_type_id, image_url, token } = product;

  try {
    // Ensure token is present
    if (!token) return { status: 400, message: "User token is required." };

    // Decode and verify user permissions from the token
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
      return { status: 403, message: "Access denied" };
    }

    // Image upload is mandatory
    if (!image) return ({ status: 400, message: "Product image is required." });

    // Run validations
    let validationResult = await validations(product);

    try {
      if (validationResult) throw validationResult; // If any validation failed, return the error
    } catch (error) {
      return error;
    }

    let fileName = null;

    // Validate file extension for image
    const allowedExtensions = [".jpeg", ".png"];
    const extension = path.extname(image.originalname).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      return ({ status: 400, message: "only jpeg and png extensions are allowed" });
    }

    // Save the image file metadata to the database
    const newFile = new File({
      hidden_name: image.filename,
      real_name: image.originalname,
      insert_date: new Date().toISOString(),
      extension,
      active: "true",
    });

    const savedFile = await newFile.save();
    fileName = savedFile.hidden_name;

    // Attach saved image name to product before creation
    if (fileName) product.image_name = fileName;

    // Create the product in the database
    const response = await Product.create(product);

    if (!response || response.length === 0) {
      return { status: 404, message: "Product not found." };
    }

    // Return success response
    return {
      status: 200,
      message: "Product created successfully.",
      data: response,
    };

  } catch (error) {
    console.log("error", error);

    // Handle duplicate entry (e.g. code already exists)
    if (error.code === 11000) {
      return ({ status: 400, message: "product already exists" });
    }

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
