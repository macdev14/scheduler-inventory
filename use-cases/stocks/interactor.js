"use strict";

const { StockJwtEntity } = require("../../entities/StockJwtEntity");

exports.createStocks = async (
  { stocksCreate },
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

    const createStock = await stocksCreate(stock);

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

exports.getStocks = async ({ stocksGet }) => {
  try {
    const stocks = await stocksGet();
    return stocks;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.getStocksByProductId = async ({ stocksGetByProductId }, product_id) => {
  try {
    const product = await stocksGetByProductId(product_id);

    return product;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.deleteStocks = async ({ stocksDelete }, stock) => {
  try {
    const stockDeleted = await stocksDelete(stock);
    return stockDeleted;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.updateStocks = async ({ stocksUpdate }, stock) => {
  try {
    const updatedStock = await stocksUpdate(stock);
    return updatedStock;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
