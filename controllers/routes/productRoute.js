const productInteractorMongoDB = require("../../use-cases/products/interactorMongoDB");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = require("express").Router();

const {
  productCreatePersistence,
} = require("../../use-cases/products/createPersistence");

const {
  productReadPersistence,
  productIdReadPersistence,
} = require("../../use-cases/products/readPersistence");

const {
  productDeletePersistence,
} = require("../../use-cases/products/deletePersistence");

const {
  productUpdatePersistence,
} = require("../../use-cases/products/updatePersistence");

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
 * @route POST /product
 * @param {object} req - Express request object
 * @param {object} req.body - Contains the product details
 * @param {string} req.body.id - Product ID
 * @param {string} req.body.name - Product name
 * @param {string} req.body.product_type_id - Product type ID
 * @param {object} req.file - Uploaded file object
 * @param {object} res - Express response object
 * @returns {object} - Response with status and product details
 */
router.route("/product").post(upload.single("image_url"), async (req, res) => {
  //const image_url = path.extname(req.file.originalname);
  //const image_url = req.file.originalname;
  const image_url = fileName;
  const token = req.headers["token"];
  const { id, name, product_type_id } = req.body;
  console.log("TOKEN:", token);
  try {
    const product = await productInteractorMongoDB.productCreate(
      { productCreatePersistence },
      { id, name, product_type_id, image_url, token }
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

/**
 * @route GET /product/all
 * @group Products
 * @summary Get all products
 * @returns {object} 200 - An array of products
 * @returns {Error}  400 - Bad request
 * @returns {Error}  404 - Products not found
 * @returns {Error}  500 - Internal Server Error
 */
router.route("/product/all").get(async (req, res) => {
  /******  0a098c67-5179-491a-9932-f091f5d7fab5  *******/
  try {
    const products = await productInteractorMongoDB.productRead({
      productReadPersistence,
    });
    res.status(products.status).send(products);
  } catch (error) {
    throw error;
  }
});

/**
 * @route GET /product
 * @group Products
 * @summary Get product by ID
 * @param {string} id.query - Product ID
 * @returns {object} 200 - Product details
 * @returns {Error}  400 - Bad request
 * @returns {Error}  404 - Product not found
 * @returns {Error}  500 - Internal Server Error
 */
router.route("/product").get(async (req, res) => {
  const id = req.query.id;

  try {
    const product = await productInteractorMongoDB.productReadId(
      { productIdReadPersistence },
      id
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

/**
 * @route DELETE /product
 * @group Products
 * @summary Delete product by ID
 * @param {string} id.body.required - Product ID
 * @param {string} token.header.required - Token
 * @returns {object} 200 - Product deleted
 * @returns {Error}  400 - Bad request
 * @returns {Error}  404 - Product not found
 * @returns {Error}  500 - Internal Server Error
 */
router.route("/product").delete(async (req, res) => {
  const token = req.headers["token"];
  const { id } = req.body;

  try {
    const product = await productInteractorMongoDB.productDelete(
      { productDeletePersistence },
      { id, token }
    );

    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

/**
 * @route PUT /product
 * @group Products
 * @summary Update product by ID
 * @param {string} id.body.required - Product ID
 * @param {string} name.body.required - Product name
 * @param {string} product_type_id.body.required - Product type ID
 * @param {file} image_url.formData - Product image
 * @param {string} token.header.required - Token
 * @returns {object} 200 - Product updated
 * @returns {Error}  400 - Bad request
 * @returns {Error}  404 - Product not found
 * @returns {Error}  500 - Internal Server Error
 */
router.route("/product").put(upload.single("image_url"), async (req, res) => {
  const token = req.headers["token"];

  const image_url = fileName;
  const { id, name, product_type_id } = req.body;

  try {
    const product = await productInteractorMongoDB.productUpdate(
      { productUpdatePersistence },
      { id, name, product_type_id, image_url, token }
    );
    res.status(product.status).send(product);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
