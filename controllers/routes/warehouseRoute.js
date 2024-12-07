const warehouseInteractorMongoDB = require("../../use-cases/warehouses/interactorMongoDB");
const fs = require("fs");
const router = require("express").Router();

const {
  warehouseReadPersistence,
  warehouseIdReadPersistence,
} = require("../../use-cases/warehouses/readPersistence");

router.route("/warehouse/all").get(async (req, res) => {
  try {
    const warehouses = await warehouseInteractorMongoDB.warehouseRead({
      warehouseReadPersistence,
    });
    res.status(warehouses.status).send(warehouses);
  } catch (error) {
    throw error;
  }
});

router.route("/warehouse").get(async (req, res) => {
  const id = req.query.id;
  try {
    const warehouse = await warehouseInteractorMongoDB.warehouseReadId(
      { warehouseIdReadPersistence },
      id
    );
    res.status(warehouse.status).send(warehouse);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
