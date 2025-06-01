const interactor = require("../../use-cases/product_types/interactor");
const router = require("express").Router();
const { productTypesGet, productTypesGetById,} = require("../../use-cases/product_types/get");


/**
 * @api {get} /productType/all Get all product types
 * @apiName GetProductTypesAll
 * @apiGroup ProductTypes
 * @apiVersion 1.0.0
 * @apiPermission authenticated user
 * @apiSuccess {Object[]} Array of product type entries
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/productTypes").get(async (req, res) => {
  try {
    const products = await interactor.getProductTypes({ productTypesGet });
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
router.route("/productType/:id").get(async (req, res) => {
  const id = req.params.id;

  try {
    const product = await interactor.getProductTypeById( { productTypesGetById }, id);
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
