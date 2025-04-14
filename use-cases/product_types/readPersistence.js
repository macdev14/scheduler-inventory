const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/productTypeModel");
const ProductType = mongoose.model("ProductType");

exports.productTypeReadPersistence = async () => {
  try {
    const productTypes = await ProductType.find({ active: true });
    return { success: true, status: 200, data: productTypes };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.productTypeIdReadPersistence = async (id) => {
  try {
    const productType = await ProductType.find({ id: id });
    return { success: true, status: 200, data: productType };
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
