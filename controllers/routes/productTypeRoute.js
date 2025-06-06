const interactor = require("../../use-cases/product_types/interactor");
const router = require("express").Router();
const { productTypesGet, productTypesGetById, } = require("../../use-cases/product_types/get");



/**
 * @api {get} /productTypes Get all product types
 * @apiName GetProductTypes
 * @apiGroup Product Types
 * @apiPermission authenticated user
 * @apiParam {Number} [page=1] Page number for pagination
 * @apiParam {Number} [limit=10] Number of product types per page
 * @apiParam {String} [search] Search term for product types
 * @apiSuccess {Object[]} Array of product type entries
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/productTypes").get(async (req, res) => {
  try {
    const token = req.headers['token']
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const products = await interactor.getProductTypes({ productTypesGet }, { token, page, limit, search });
    res.status(products.status).send(products);
  } catch (error) {
    throw error;
  }
});


/**
 * @api {get} /productTypes/:id Get a product type by ID
 * @apiName GetProductType
 * @apiGroup Product Types
 * @apiPermission authenticated user
 * @apiParam {String} id Product type ID
 * @apiParam {String} token User token
 * @apiSuccess {Object} Product type entry
 * @apiError {Error} 404 Product type not found
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/productTypes/:id").get(async (req, res) => {
  const id = req.params.id;
  const token = req.headers['token']

  try {
    const product = await interactor.getProductTypeById({ productTypesGetById }, {token, id});
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
