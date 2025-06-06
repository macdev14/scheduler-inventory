const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

const validations = async (id) => {
  if (!id) return { status: 400, message: "id is required." };

  const productExists = await Product.findOne({ _id: id });
  if (!productExists) return { status: 404, message: "Product does not exist." };

};

exports.productsDelete = async ({ token, id }) => {
  try {

    // Ensure the token is provided
    if (!token || !id) {
      return { status: 400, message: "token and id are required" };
    }

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

    // Validations
    let validationResult = await validations(id);

    if (validationResult) return validationResult;

    const productDeleted = await Product.findOneAndUpdate(
      { _id: id },
      { active: false },
      { new: true }
    );

    return { status: 200, data: productDeleted };


  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
