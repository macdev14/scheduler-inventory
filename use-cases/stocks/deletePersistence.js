const mongoose = require("mongoose");

require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Deletes a stock by id
 * @param {string} id - The id of the stock to be deleted
 * @returns {Promise<{success: boolean, status: number, data: object|string}>}
 */
/******  467ffe9b-295e-47d0-813d-7fcf70959ceb  *******/ exports.stockDeletePersistence =
  async (id) => {
    try {
      const stock = await Stock.findOneAndDelete({ _id: id });
      return { success: true, status: 200, data: stock };
    } catch (error) {
      return { success: false, status: 500, message: "Something went wrong." };
    }
  };
