"use strict";

const { StockEntity } = require("../../entities/StockEntity");

exports.stockCreate = async (
  { stockCreatePersistence },
  { product_id, warehouse_id, quantity }
) => {
  try {
    //persiste
    const stock = new StockEntity({
      product_id,
      warehouse_id,
      quantity,
      active: true,
    });

    console.log("stock", stock);

    const createStock = await stockCreatePersistence(stock);

    return createStock;
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

exports.stockRead = async ({ stockReadPersistence }) => {
  try {
    const stocks = await stockReadPersistence();
    return stocks;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.stockReadId = async ({ stockIdReadPersistence }, product_id) => {
  try {
    const product = await stockIdReadPersistence(product_id);

    return product;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.stockDelete = async ({ stockDeletePersistence }, id) => {
  try {
    const product = await productDeletePersistence(id);
    return product;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.stockUpdate = async ({ productUpdatePersistence }, product) => {
  try {
    const updatedProduct = await productUpdatePersistence(product);
    return updatedProduct;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
