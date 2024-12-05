"use strict";

const { ProductEntity } = require("../../entities/ProductEntity");

exports.productCreate = async (
  { productCreatePersistence },
  { productId, productName, productType, productImage }
) => {
  try {
    //persiste
    const product = new UserEntity({
      productId,
      productName,
      productType,
      productImage,
    });
    console.log("product", product);

    const createProduct = await productCreatePersistence(product);
    return createProduct;
  } catch (error) {
    console.log("error", error);
    if (error.code === 11000) {
      return { status: 400, message: "product already exists" };
    }
    return { status: 500, message: "Something went wrong" };
  }
};
