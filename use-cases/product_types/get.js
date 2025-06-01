const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/productTypeModel");
const ProductType = mongoose.model("ProductType");

exports.productTypesGet = async () => {
  try {
    const productTypes = await ProductType.find({ active: true });
    return { status: 200, data: productTypes };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};

exports.productTypesGetById = async (id) => {
  try {
    const productType = await ProductType.find({ id: id });
    return { status: 200, data: productType };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
