const interactor = require("../../use-cases/stocks/interactor");
const router = require("express").Router();

const {
  stocksCreate,
} = require("../../use-cases/stocks/create");

const {
  stocksGet,
  stocksGetByProductId,
} = require("../../use-cases/stocks/get");

const {
  stocksDelete,
} = require("../../use-cases/stocks/delete");

const {
  stocksUpdate,
} = require("../../use-cases/stocks/update");


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
    const stock = await interactor.updateStocks(
      { stocksCreate },
      { product_id, warehouse_id, quantity, token }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

/**
 * @api {get} /stocks Get all stock entries
 * @apiName GetStockAll
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiSuccess {Object[]} Array of stock entries
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/stocks").get(async (req, res) => {
  try {
    const stocks = await interactor.getStocks({
      stocksGet,
    });
    res.status(stocks.status).send(stocks);
  } catch (error) {
    throw error;
  }
});

/**
 * @api {get} /stocks/byProductId Get a stock entry by product ID
 * @apiName GetStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {Number} product_id Product ID
 * @apiSuccess {Object} Stock entry
 * @apiError {Error} 404 Stock not found
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/stocks/byProductId").get(async (req, res) => {
  const product_id = req.query.product_id;

  try {
    const stock = await interactor.getStocksByProductId(
      { stocksGetByProductId },
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
router.route("/stocks").delete(async (req, res) => {
  const token = req.headers["token"];
  const { product_id, warehouse_id } = req.body;

  try {
    const stock = await interactor.deleteStocks(
      { stocksDelete },
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
router.route("/stocks").put(async (req, res) => {
  const token = req.headers["token"];
  const { product_id, warehouse_id, quantity } = req.body;

  try {
    const stock = await interactor.updateStocks(
      { stocksUpdate },
      { product_id, warehouse_id, quantity, token }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
