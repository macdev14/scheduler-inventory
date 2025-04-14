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
 * @api {post} /stock Create a new stock entry
 * @apiName CreateStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {Number} product_id Product ID
 * @apiParam {Number} warehouse_id Warehouse ID
 * @apiParam {Number} quantity Quantity
 * @apiParam {String} token User token
 * @apiSuccess {Object} Stock created successfully
 * @apiError {Error} 400 Stock already exists
 * @apiError {Error} 500 Internal Server Error
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
 * @api {get} /stock/all Get all stock entries
 * @apiName GetStockAll
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiSuccess {Object[]} Array of stock entries
 * @apiError {Error} 500 Internal Server Error
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
 * @api {get} /stock Get a stock entry by product ID
 * @apiName GetStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {Number} product_id Product ID
 * @apiSuccess {Object} Stock entry
 * @apiError {Error} 404 Stock not found
 * @apiError {Error} 500 Internal Server Error
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
 * @api {delete} /stock Delete a stock entry
 * @apiName DeleteStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {Number} product_id Product ID
 * @apiParam {Number} warehouse_id Warehouse ID
 * @apiParam {String} token User token
 * @apiSuccess {Object} Stock deleted successfully
 * @apiError {Error} 400 Stock already exists
 * @apiError {Error} 500 Internal Server Error
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
 * @api {put} /stock Update a stock entry
 * @apiName UpdateStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {Number} product_id Product ID
 * @apiParam {Number} warehouse_id Warehouse ID
 * @apiParam {Number} quantity Quantity
 * @apiParam {String} token User token
 * @apiSuccess {Object} Stock updated successfully
 * @apiError {Error} 400 Stock already exists
 * @apiError {Error} 500 Internal Server Error
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
