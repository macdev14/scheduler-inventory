const productTypeInteractorMongoDB = require("../../use-cases/product_types/interactorMongoDB");
const router = require("express").Router();

const {
  productTypeReadPersistence,
  productTypeIdReadPersistence,
} = require("../../use-cases/product_types/readPersistence");


/**
 * @api {get} /productType/all Get all product types
 * @apiName GetProductTypesAll
 * @apiGroup ProductTypes
 * @apiVersion 1.0.0
 * @apiPermission authenticated user
 * @apiSuccess {Object[]} Array of product type entries
 * @apiError {Error} 500 Internal Server Error
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
 * @api {get} /productType Get a product type entry by ID
 * @apiName GetProductType
 * @apiGroup ProductTypes
 * @apiPermission authenticated user
 * @apiParam {Number} id Product Type ID
 * @apiSuccess {Object} Product type entry
 * @apiError {Error} 404 Product type not found
 * @apiError {Error} 500 Internal Server Error
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
