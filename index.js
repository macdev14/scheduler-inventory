//required app modules
const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { createProductTypesPersistence } = require("./use-cases/product_types/createProductTypesPersistence");
const productTypeInteractorMongoDB = require("./use-cases/product_types/interactorMongoDB");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./public/swagger/swagger.json');

const app = express();
let port = process.env.PORT || 3000;
let uri = process.env.MONGO_CONNECTION_STRING;

//database connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the database");
    (async () => {
      try {
          const productTypes = await productTypeInteractorMongoDB.createProductTypes({createProductTypesPersistence}, {});
          console.log(productTypes);
      } catch (err) {
          console.log("err", err);
      }
  })();
  }).catch((err) => {
    console.log(err);
  });

//middleware
app.use(bodyParser.json()); //parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //allowing for extended syntax (i.e. arrays, objects, nested objects, etc.)

//routes
app.use("/", express.static(path.join(__dirname, "public"))); //available static route at http://localhost:5565
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //serve api documentation
// app.use("/api-docjs", express.static("./public/apidocjs")); //available route at http://localhost:5565/api-docjs/
app.use("/api", require("./controllers/routes/productRoute")); //product route
app.use("/api", require("./controllers/routes/productTypeRoute")); //product types route
app.use("/api", require("./controllers/routes/warehouseRoute")); //warehouse route
app.use("/api", require("./controllers/routes/stockRoute")); //stock route

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
