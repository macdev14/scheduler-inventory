"use strict";

const { ProductJwtEntity } = require("../../entities/ProductJwtEntity");

exports.createProducts = async (
  { productsCreate },
  { code, product_type_id, description, image, token }
) => {
  try {
    //persiste
    const product = new ProductJwtEntity({
      code,
      product_type_id,
      description,
      active: true,
      token,
    });
    console.log("image", image);
    const createProduct = await productsCreate(product, image);

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
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.getProducts = async ({ productsGet }, { token, page, limit, search, product_type_id }) => {
  try {
    const products = await productsGet({ token, page, limit, search, product_type_id });
    return products;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.getProductsById = async ({ productsGetById }, { id, token }) => {
  try {
    const product = await productsGetById({ id, token });

    return product;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.deleteProducts = async ({ productsDelete }, { token, id }) => {
  try {
    const product = await productsDelete({ token, id });
    return product;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.restoreProducts = async ({ productsRestore }, { token, id }) => {
  try {
    const product = await productsRestore({ token, id });
    return product;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.updateProducts = async ({ productsUpdate },
  {id, code, name, product_type_id, description, image, token }
) => {
  try {
    //persiste
    const product = new ProductJwtEntity({
      id,
      code,
      name,
      product_type_id,
      description,
      active: true,
      token,
    });
    const updatedProduct = await productsUpdate(product, image);
    return updatedProduct;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};
