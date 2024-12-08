const stockInteractorMongoDB = require("../../use-cases/stocks/interactorMongoDB");
const router = require("express").Router();

const {
  stockCreatePersistence,
} = require("../../use-cases/stocks/createPersistence");

const {
  stockReadPersistence,
  stockIdReadPersistence,
} = require("../../use-cases/stocks/readPersistence");

const {
  stockDeletePersistence,
} = require("../../use-cases/stocks/deletePersistence");

const {
  stockUpdatePersistence,
} = require("../../use-cases/stocks/updatePersistence");

/**
 * @route POST /stock
 * @group Stocks
 * @summary Create a new stock entry
 * @param {string} product_id.body.required - Product ID
 * @param {string} warehouse_id.body.required - Warehouse ID
 * @param {number} quantity.body.required - Quantity of stock
 * @param {string} token.header.required - Token for authentication
 * @returns {object} 200 - Stock created successfully
 * @returns {Error} 400 - Product already exists
 * @returns {Error} 500 - Internal Server Error
 */
router.route("/stock").post(async (req, res) => {
  const token = req.headers["token"];
  const { product_id, warehouse_id, quantity } = req.body;

  try {
    const stock = await stockInteractorMongoDB.stockCreate(
      { stockCreatePersistence },
      { product_id, warehouse_id, quantity, token }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

/**
 * @route GET /stock/all
 * @group Stocks
 * @summary Get all stock entries
 * @returns {object} 200 - Array of stock entries
 * @returns {Error}  500 - Internal Server Error
 */
router.route("/stock/all").get(async (req, res) => {
  try {
    const stocks = await stockInteractorMongoDB.stockRead({
      stockReadPersistence,
    });
    res.status(stocks.status).send(stocks);
  } catch (error) {
    throw error;
  }
});

/**
 * @route GET /stock
 * @group Stocks
 * @summary Get stock entry by product ID
 * @param {string} product_id.query - Product ID
 * @returns {object} 200 - Stock entry details
 * @returns {Error} 500 - Internal Server Error
 */
router.route("/stock").get(async (req, res) => {
  const product_id = req.query.product_id;

  try {
    const stock = await stockInteractorMongoDB.stockReadId(
      { stockIdReadPersistence },
      product_id
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

/**
 * @route DELETE /stock
 * @group Stocks
 * @summary Delete a stock entry
 * @param {string} product_id.body.required - Product ID
 * @param {string} warehouse_id.body.required - Warehouse ID
 * @param {string} token.header.required - Token for authentication
 * @returns {object} 200 - Stock deleted successfully
 * @returns {Error} 500 - Internal Server Error
 */
router.route("/stock").delete(async (req, res) => {
  const token = req.headers["token"];
  const { product_id, warehouse_id } = req.body;

  try {
    const stock = await stockInteractorMongoDB.stockDelete(
      { stockDeletePersistence },
      { product_id, warehouse_id, token }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

/**
 * @route PUT /stock
 * @group Stocks
 * @summary Update a stock entry
 * @param {string} product_id.body.required - Product ID
 * @param {string} warehouse_id.body.required - Warehouse ID
 * @param {number} quantity.body.required - Quantity of stock
 * @param {string} token.header.required - Token for authentication
 * @returns {object} 200 - Stock updated successfully
 * @returns {Error} 500 - Internal Server Error
 */
router.route("/stock").put(async (req, res) => {
  const token = req.headers["token"];
  const { product_id, warehouse_id, quantity } = req.body;

  try {
    const stock = await stockInteractorMongoDB.stockUpdate(
      { stockUpdatePersistence },
      { product_id, warehouse_id, quantity, token }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
