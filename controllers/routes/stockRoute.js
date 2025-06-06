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
  stocksRestore,
} = require("../../use-cases/stocks/restore");

const {
  stocksUpdate,
} = require("../../use-cases/stocks/update");


/**
 * @api {post} /stocks Create a new stock entry
 * @apiName CreateStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {String} product_id Product ID
 * @apiParam {String} warehouse_id Warehouse ID
 * @apiParam {Number} quantity Stock quantity
 * @apiParam {String} token User token
 * @apiSuccess {Object} Stock created successfully
 * @apiError {Error} 400 Stock already exists
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/stocks").post(async (req, res) => {
  const token = req.headers["token"];
  const { product_id, warehouse_id, quantity } = req.body;

  try {
    console.log("req.body", req.body);
    const stock = await interactor.createStocks(
      { stocksCreate },
      { product_id, warehouse_id, quantity, token }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});


/**
 * @api {get} /stocks Get all stocks
 * @apiName GetStocks
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {String} product_id Product ID (optional)
 * @apiParam {String} warehouse_id Warehouse ID (optional)
 * @apiParam {Number} quantity Stock quantity (optional)
 * @apiParam {String} active Stock active status (optional)
 * @apiParam {Number} page Page number for pagination (optional)
 * @apiParam {Number} limit Number of stocks per page (optional)
 * @apiSuccess {Object[]} Array of stock entries
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/stocks").get(async (req, res) => {
  const token = req.headers['token']
  const product_id = req.query.product_id;
  const warehouse_id = req.query.warehouse_id;
  const quantity = req.query.quantity;
  const active = req.query.active || true;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const stocks = await interactor.getStocks({
      stocksGet,
    }, {
      token,
      product_id,
      warehouse_id,
      quantity,
      active,
      page,
      limit,
    });
    res.status(stocks.status).send(stocks);
  } catch (error) {
    throw error;
  }
});


/**
 * @api {patch} /stocks/delete Delete a stock entry
 * @apiName DeleteStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {String} product_id Product ID
 * @apiParam {String} warehouse_id Warehouse ID
 * @apiParam {String} token User token
 * @apiSuccess {Object} Stock deleted successfully
 * @apiError {Error} 404 Stock not found
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/stocks/delete").patch(async (req, res) => {
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
 * @api {patch} /stocks/restore Restore a stock entry
 * @apiName RestoreStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {String} product_id Product ID
 * @apiParam {String} warehouse_id Warehouse ID
 * @apiParam {String} token User token
 * @apiSuccess {Object} Stock restored successfully
 * @apiError {Error} 404 Stock not found
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/stocks/restore").patch(async (req, res) => {
  const token = req.headers["token"];
  const { product_id, warehouse_id } = req.body;

  try {
    const stock = await interactor.restoreStocks(
      { stocksRestore },
      { product_id, warehouse_id, token }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});


/**
 * @api {put} /stocks Update a stock entry
 * @apiName UpdateStock
 * @apiGroup Stocks
 * @apiPermission authenticated user
 * @apiParam {String} product_id Product ID
 * @apiParam {String} warehouse_id Warehouse ID
 * @apiParam {Number} quantity Stock quantity
 * @apiParam {String} token User token
 * @apiSuccess {Object} Stock updated successfully
 * @apiError {Error} 404 Stock not found
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
