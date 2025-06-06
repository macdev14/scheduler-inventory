const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

// Validation function to ensure the provided product ID is valid and exists
const validations = async (id) => {
  // Check if ID is present
  if (!id) return { status: 400, message: "id is required." };

  // Check if a product with the given ID exists in the database
  const productExists = await Product.findOne({ _id: id });
  if (!productExists) return { status: 404, message: "Product does not exist." };
};

exports.productsDelete = async ({ token, id }) => {
  try {
    // Ensure both token and product ID are provided
    if (!token || !id) {
      return { status: 400, message: "token and id are required" };
    }

    // Decode and verify the token
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Only ADMIN or MANAGER roles are allowed to delete a product
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

    // Run validations for the given product ID
    let validationResult = await validations(id);
    if (validationResult) return validationResult;

    // Soft delete the product by setting `active` to false
    const productDeleted = await Product.findOneAndUpdate(
      { _id: id },
      { active: false },
      { new: true } // return the updated document
    );

    // Return success with the updated product
    return { status: 200, data: productDeleted };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};