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
        status: 400,
        message: "Product already exists.",
      };
    }

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};

exports.getStocks = async ({ stocksGet }, { token, product_id, warehouse_id, quantity, active, page, limit }) => {
  try {
    const stocks = await stocksGet({ token, product_id, warehouse_id, quantity, active, page, limit });
    return stocks;
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};

exports.deleteStocks = async ({ stocksDelete }, stocks) => {
  try {
    const stockDeleted = await stocksDelete(stocks);
    return stockDeleted;
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};

exports.restoreStocks = async ({ stocksRestore }, stocks) => {
  try {
    const stockDeleted = await stocksRestore(stocks);
    return stockDeleted;
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};

exports.updateStocks = async ({ stocksUpdate }, stocks) => {
  try {
    const updatedStock = await stocksUpdate(stocks);
    return updatedStock;
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
