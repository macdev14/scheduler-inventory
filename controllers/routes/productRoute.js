const productInteractorMongoDB = require("../../use-cases/products/interactorMongoDB");
//const multer = require("multer");
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

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Directory to save files
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique filenames
//   },
// });
//const upload = multer({ storage });

router.route("/product/create").post(
  //upload.single("productImage"),
  async (req, res) => {
    const { id, name, type } = req.body;
    const productImage = "";
    //const productImage = req.file;
    try {
      const product = await productInteractorMongoDB.productCreate(
        { productCreatePersistence },
        { id, name, type, productImage }
      );
      res.status(product.status).send(product);
    } catch (error) {
      throw error;
    }
  }
);

router.route("/product/all").get(async (req, res) => {
  try {
    const products = await productInteractorMongoDB.productRead({
      productReadPersistence,
    });
    res.status(products.status).send(products);
  } catch (error) {
    throw error;
  }
});

router.route("/product").get(async (req, res) => {
  const id = req.query.id;
  //res.json({ message: `Produto com ID ${id} encontrado!` });
  console.log("product: ", id);
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

router.route("/product").delete(async (req, res) => {
  const { id } = req.body;
  //res.json({ message: `Produto com ID ${id} encontrado!` });
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

module.exports = router;
