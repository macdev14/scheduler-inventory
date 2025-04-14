"use strict";

const { StockJwtEntity } = require("../../entities/StockJwtEntity");

exports.stockCreate = async (
  { stockCreatePersistence },
  { product_id, warehouse_id, quantity, token }
) => {
  try {
    //persiste
    const stock = new StockJwtEntity({
      product_id,
      warehouse_id,
      quantity,
      active: true,
      token,
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

exports.stockDelete = async ({ stockDeletePersistence }, stock) => {
  try {
    const stockDeleted = await stockDeletePersistence(stock);
    return stockDeleted;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.stockUpdate = async ({ stockUpdatePersistence }, stock) => {
  try {
    const updatedStock = await stockUpdatePersistence(stock);
    return updatedStock;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
