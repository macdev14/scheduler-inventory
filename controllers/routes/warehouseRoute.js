const warehouseInteractorMongoDB = require("../../use-cases/warehouses/interactorMongoDB");
const fs = require("fs");
const router = require("express").Router();

const {
  warehouseReadPersistence,
  warehouseIdReadPersistence,
} = require("../../use-cases/warehouses/readPersistence");

/**
 * @route GET /warehouse/all
 * @group Warehouses
 * @summary Get all warehouses
 * @returns {object} 200 - An array of warehouses
 * @returns {Error}  400 - Bad request
 * @returns {Error}  404 - Warehouses not found
 * @returns {Error}  500 - Internal Server Error
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
 * @route GET /warehouse
 * @group Warehouses
 * @summary Get warehouse by ID
 * @param {string} id.query - Warehouse ID
 * @returns {object} 200 - Warehouse details
 * @returns {Error}  400 - Bad request
 * @returns {Error}  404 - Warehouse not found
 * @returns {Error}  500 - Internal Server Error
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
