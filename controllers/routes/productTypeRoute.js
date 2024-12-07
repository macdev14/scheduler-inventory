const productTypeInteractorMongoDB = require("../../use-cases/product_types/interactorMongoDB");
const router = require("express").Router();

const {
  productTypeReadPersistence,
  productTypeIdReadPersistence,
} = require("../../use-cases/product_types/readPersistence");

router.route("/productType/all").get(async (req, res) => {
  try {
    const products = await productTypeInteractorMongoDB.productTypeRead({
      productTypeReadPersistence,
    });
    res.status(products.status).send(products);
  } catch (error) {
    throw error;
  }
});

router.route("/productType").get(async (req, res) => {
  const id = req.query.id;
  try {
    const product = await productTypeInteractorMongoDB.productTypeReadId(
      { productTypeIdReadPersistence },
      id
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
