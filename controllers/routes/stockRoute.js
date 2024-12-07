const stockInteractorMongoDB = require("../../use-cases/stocks/interactorMongoDB");
const router = require("express").Router();

const {
  stockCreatePersistence,
} = require("../../use-cases/stocks/createPersistence");

const {
  stockReadPersistence,
} = require("../../use-cases/stocks/readPersistence");

const {
  stockDeletePersistence,
} = require("../../use-cases/stocks/deletePersistence");

const {
  stockUpdatePersistence,
} = require("../../use-cases/stocks/updatePersistence");

router.route("/stock").post(async (req, res) => {
  const { id, name, product_type_id } = req.body;

  try {
    const product = await stockInteractorMongoDB.stockCreate(
      { productCreatePersistence },
      { id, name, product_type_id, image_url }
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

router.route("/stock/all").get(async (req, res) => {
  try {
    const products = await productInteractorMongoDB.productRead({
      productReadPersistence,
    });
    res.status(products.status).send(products);
  } catch (error) {
    throw error;
  }
});

router.route("/stock").get(async (req, res) => {
  const product_id = req.query.product_id;
  console.log("product: ", product_id);

  try {
    const product = await stockInteractorMongoDB.stockReadId(
      { productIdReadPersistence },
      id
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

router.route("/product").delete(async (req, res) => {
  const { id } = req.body;
  console.log("product: ", id);
  try {
    const product = await productInteractorMongoDB.productDelete(
      { productDeletePersistence },
      id
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

router.route("/product").put(upload.single("image_url"), async (req, res) => {
  const image_url = fileName;

  const { id, name, product_type_id } = req.body;

  try {
    const product = await productInteractorMongoDB.productUpdate(
      { productUpdatePersistence },
      { id, name, product_type_id, image_url }
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
