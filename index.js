//required app modules
const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { createProductTypes } = require("./use-cases/product_types/create");
const { createAddresses } = require("./use-cases/addresses/create");
const { createWarehouses } = require("./use-cases/warehouses/create");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/apidocjs/swagger.json');
const cors = require('cors');

const app = express();
let port = process.env.PORT || 3000;
let uri = process.env.MONGO_CONNECTION_STRING;

app.use(cors({
  origin: process.env.REACT_URL || 'http://localhost:3000',
  credentials: true
}));

//database connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the database");
    (async () => {
      try {
          const productTypes = await createProductTypes();
          const addresses = await createAddresses();
          const warehouses = await createWarehouses();
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

const api_v01 = '/api/v01/';
//routes
app.use("/", express.static(path.join(__dirname, "public"))); 
app.use(api_v01 + 'docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //serve api documentation
app.use(api_v01 + 'docjs', express.static("./public/apidocjs"));
app.use(api_v01, require("./controllers/routes/productRoute")); //product route
app.use(api_v01, require("./controllers/routes/productTypeRoute")); //product types route
app.use(api_v01, require("./controllers/routes/warehouseRoute")); //warehouse route
app.use(api_v01, require("./controllers/routes/stockRoute")); //stock route

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
