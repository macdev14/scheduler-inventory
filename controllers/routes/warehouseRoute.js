const warehouseInteractorMongoDB = require("../../use-cases/warehouses/interactorMongoDB");
const fs = require("fs");
const router = require("express").Router();

const {
  warehouseReadPersistence,
  warehouseIdReadPersistence,
} = require("../../use-cases/warehouses/readPersistence");

/**
 * @api {get} /warehouse/all Get all warehouse entries
 * @apiName GetWarehouseAll
 * @apiGroup Warehouses
 * @apiVersion 1.0.0
 * @apiPermission authenticated user
 * @apiSuccess {Object[]} Array of warehouse entries
 * @apiError {Error} 500 Internal Server Error
 */
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

/**
 * @api {get} /warehouse Get a warehouse entry by ID
 * @apiName GetWarehouse
 * @apiGroup Warehouses
 * @apiVersion 1.0.0
 * @apiPermission authenticated user
 * @apiParam {String} id Warehouse ID
 * @apiSuccess {Object} Warehouse entry
 * @apiError {Error} 404 Warehouse not found
 * @apiError {Error} 500 Internal Server Error
 */
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
