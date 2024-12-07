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

router.route("/stock").post(async (req, res) => {
  const { product_id, warehouse_id, quantity } = req.body;

  try {
    const stock = await stockInteractorMongoDB.stockCreate(
      { stockCreatePersistence },
      { product_id, warehouse_id, quantity }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

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

router.route("/stock").get(async (req, res) => {
  const product_id = req.query.product_id;
  console.log("product: ", product_id);

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

router.route("/stock").delete(async (req, res) => {
  const { _id } = req.body;
  console.log("_id: ", _id);
  try {
    const stock = await stockInteractorMongoDB.stockDelete(
      { stockDeletePersistence },
      _id
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

router.route("/stock").put(async (req, res) => {
  const { product_id, warehouse_id, quantity } = req.body;

  try {
    const stock = await stockInteractorMongoDB.stockUpdate(
      { stockUpdatePersistence },
      { product_id, warehouse_id, quantity }
    );
    res.status(stock.status).send(stock);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
