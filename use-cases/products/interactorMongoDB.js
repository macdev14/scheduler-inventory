"use strict";

const { ProductJwtEntity } = require("../../entities/ProductJwtEntity");

exports.productCreate = async (
  { productCreatePersistence },
  { id, name, product_type_id, image_url, token }
) => {
  try {
    //persiste
    const product = new ProductJwtEntity({
      id,
      name,
      product_type_id,
      image_url,
      active: true,
      token,
    });

    console.log("product", product);

    const createProduct = await productCreatePersistence(product);

    return createProduct;
  } catch (error) {
    console.log("error", error);

    if (error.code === 11000) {
      return {
        success: false,
        status: 400,
        message: "Product already exists.",
      };
    }
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.productRead = async ({ productReadPersistence }) => {
  try {
    const products = await productReadPersistence();
    return products;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.productReadId = async ({ productIdReadPersistence }, id) => {
  try {
    const product = await productIdReadPersistence(id);

    return product;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.productDelete = async ({ productDeletePersistence }, id) => {
  try {
    const product = await productDeletePersistence(id);
    return product;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.productUpdate = async ({ productUpdatePersistence }, product) => {
  try {
    const updatedProduct = await productUpdatePersistence(product);
    return updatedProduct;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
