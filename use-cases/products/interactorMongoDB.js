"use strict";

const { ProductEntity } = require("../../entities/ProductEntity");

exports.productCreate = async (
  { productCreatePersistence },
  { id, name, type, image }
) => {
  try {
    //persiste
    const product = new ProductEntity({
      id,
      name,
      type,
      image,
      active: true,
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
