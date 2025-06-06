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
  if (!product.id) return { status: 400, message: "id is required." };

  const productExists = await Product.findOne({ _id: product.id });
  if (!product.code) return { status: 400, message: "code is required." };
  if (!product.description) return { status: 400, message: "description is required." };
  if (!product.product_type_id) return { status: 400, message: "product_type_id is required." };

  const productTypeExists = await ProductType.findOne({ _id: product.product_type_id });
  if (!productTypeExists) return { status: 400, message: "Product type does not exist." };

};

exports.productsUpdate = async (product, image) => {

  const { id, code, description, product_type_id, image_url, token } = product;
  try {

    if (!token) return { status: 400, message: "token is required." };

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


    let validationResult = await validations(product);

    try {
      if (validationResult) throw validationResult;
    } catch (error) {
      return error;
    }


    let fileName = null;

    // Handle and validate profile picture upload
    if (image) {
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
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: product.id },
      product,
      { new: true }
    );

    console.log("updatedProduct", updatedProduct);
    if (!updatedProduct || updatedProduct.length === 0) {
      return { status: 404, message: "Product not found." };
    }

    return { status: 200, data: updatedProduct };

  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};