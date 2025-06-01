"use strict";

exports.getProductTypes = async ({ productTypesGet }) => {
  try {
    const productTypes = await productTypesGet();
    return productTypes;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.getProductTypeById = async ({ productTypesGetById }, id) => {
  try {
    const productType = await productTypesGetById(id);

    return productType;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
exports.createDefaultProductTypes = async ({ createProductTypes }, {}) => {
  try {
    console.log("createProductTypes", createProductTypes);
    const productType = await createProductTypes();
    return productType;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
