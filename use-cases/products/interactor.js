"use strict";

const { ProductJwtEntity } = require("../../entities/ProductJwtEntity");

exports.createProducts = async (
  { productsCreate },
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

    const createProduct = await productsCreate(product);

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

exports.getProducts = async ({ productsGet }) => {
  try {
    const products = await productsGet();
    return products;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.getProductsById = async ({ productsGetById }, id) => {
  try {
    const product = await productsGetById(id);

    return product;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.deleteProducts = async ({ productsDelete }, id) => {
  try {
    const product = await productsDelete(id);
    return product;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.updateProducts = async ({ productsUpdate }, product) => {
  try {
    const updatedProduct = await productsUpdate(product);
    return updatedProduct;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};
