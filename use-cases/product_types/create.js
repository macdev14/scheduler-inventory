"use strict";
const mongoose = require("mongoose");
require("../../framework/db/mongoDB/models/productTypeModel");
const ProductType = mongoose.model("ProductType");
require("dotenv").config();

exports.createProductTypes = async () => {
  try {
    // Count how many product types currently exist in the database
    const productTypesCount = await ProductType.countDocuments();
    console.log("productTypesCount", productTypesCount);

    // If product types already exist, no need to create them again
    if (productTypesCount !== 0) {
      return {
        status: 200,
        message: "Database has product types, no action required",
      };
    }

    // If there are no product types, call the static methods to create them
    await ProductType.type_1();
    await ProductType.type_2();
    await ProductType.type_3();
    await ProductType.type_4();
    await ProductType.type_5();
    await ProductType.type_6();
    await ProductType.type_7();
    await ProductType.type_8();
    await ProductType.type_9();
    await ProductType.type_10();

    // Return success message after creation
    return { status: 201, message: "Product types created successfully" };
  } catch (error) {
    // Log the error and return a fallback response
    console.log("error", error);
    return ({ status: 500, message: "Something went wrong" });
  }
};
