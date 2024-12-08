const productTypeInteractorMongoDB = require("../../use-cases/product_types/interactorMongoDB");
const router = require("express").Router();

const {
  productTypeReadPersistence,
  productTypeIdReadPersistence,
} = require("../../use-cases/product_types/readPersistence");

/**
 * @route GET /productType/all
 * @group Product Types
 * @summary Get all product types
 * @returns {object} 200 - An array of product types
 * @returns {Error}  400 - Bad request
 * @returns {Error}  404 - Product types not found
 * @returns {Error}  500 - Internal Server Error
 */
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

/**
 * @route GET /productType
 * @group Product Types
 * @summary Get product type by ID
 * @param {string} id.query - Product type ID
 * @returns {object} 200 - Product type details
 * @returns {Error}  400 - Bad request
 * @returns {Error}  404 - Product type not found
 * @returns {Error}  500 - Internal Server Error
 */
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
