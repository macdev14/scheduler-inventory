"use strict";

const { ProductTypeEntity } = require("../../entities/ProductTypeEntity");

exports.productTypeRead = async ({ productTypeReadPersistence }) => {
  try {
    const productTypes = await productTypeReadPersistence();
    return productTypes;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.productTypeReadId = async ({ productTypeIdReadPersistence }, id) => {
  try {
    const productType = await productTypeIdReadPersistence(id);

    return productType;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
