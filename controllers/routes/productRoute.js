const interactor = require("../../use-cases/products/interactor");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = require("express").Router();

const { productsCreate } = require("../../use-cases/products/create");
const { productsGet, productsGetById } = require("../../use-cases/products/get");
const { productsDelete } = require("../../use-cases/products/delete");
const { productsUpdate } = require("../../use-cases/products/update");
const { productsRestore } = require("../../use-cases/products/restore");

let fileName = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    fileName = uniqueSuffix + path.extname(file.originalname);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique filenames
  },
});
const upload = multer({ storage });


/**
 * @api {post} /product Create a new product entry
 * @apiName CreateProduct
 * @apiGroup Products
 * @apiPermission authenticated user
 * @apiParam {Number} id Product ID
 * @apiParam {String} name Product name
 * @apiParam {Number} product_type_id Product type ID
 * @apiParam {File} image_url Product image
 * @apiParam {String} token User token
 * @apiSuccess {Object} Product created successfully
 * @apiError {Error} 400 Product already exists
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/products").post(upload.single("image"), async (req, res) => {

  const token = req.headers["token"];
  const { code, description, product_type_id } = req.body;
  const image = req.file;

  try {
    const product = await interactor.createProducts(
      { productsCreate },
      { code, description, product_type_id, image, token }
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

/**
 * @api {get} /products Get all product entries
 * @apiName GetProductAll
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiPermission authenticated user
 * @apiSuccess {Object[]} Array of product entries
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/products").get(async (req, res) => {
  /******  0a098c67-5179-491a-9932-f091f5d7fab5  *******/
  const token = req.headers["token"];
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const product_type_id = req.query.product_type_id || null;
  try {
    const products = await interactor.getProducts({
      productsGet,
    }, { token, page, limit, search, product_type_id });
    res.status(products.status).send(products);
  } catch (error) {
    throw error;
  }
});

/**
 * @api {get} /product/:id Get a product entry by ID
 * @apiName GetProduct
 * @apiGroup Products
 * @apiPermission authenticated user
 * @apiParam {Number} id Product ID
 * @apiSuccess {Object} Product entry
 * @apiError {Error} 404 Product not found
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/products/:id").get(async (req, res) => {
  const id = req.params.id;
  const token = req.headers["token"];

  try {
    const product = await interactor.getProductsById(
      { productsGetById },
      { id, token }
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

/**
 * @api {delete} /product Delete a product entry
 * @apiName DeleteProduct
 * @apiGroup Products
 * @apiPermission authenticated user
 * @apiParam {Number} id Product ID
 * @apiParam {String} token User token
 * @apiSuccess {Object} Product deleted successfully
 * @apiError {Error} 400 Product already exists
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/products/:id/delete").patch(async (req, res) => {
  const token = req.headers["token"];
  const { id } = req.params;

  try {
    const product = await interactor.deleteProducts(
      { productsDelete, },
      { id, token }
    );

    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

router.route("/products/:id/restore").patch(async (req, res) => {
  const token = req.headers["token"];
  const { id } = req.params;

  try {
    const product = await interactor.restoreProducts(
      { productsRestore, },
      { id, token }
    );

    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

/**
 * @api {put} /product Update a product entry
 * @apiName UpdateProduct
 * @apiGroup Products
 * @apiPermission authenticated user
 * @apiParam {Number} id Product ID
 * @apiParam {String} name Product name
 * @apiParam {Number} product_type_id Product type ID
 * @apiParam {File} image_name Product image
 * @apiParam {String} token User token
 * @apiSuccess {Object} Product updated successfully
 * @apiError {Error} 400 Product already exists
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/products/:id").put(upload.single("image"), async (req, res) => {
  const token = req.headers["token"];
  const id = req.params.id;

  const image = req.file;
  const { code, description, product_type_id } = req.body;

  try {
    const product = await interactor.updateProducts(
      { productsUpdate },
      { id, code, description, image, product_type_id, token }
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
