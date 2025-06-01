const interactor = require("../../use-cases/warehouses/interactor");
const fs = require("fs");
const router = require("express").Router();

const { warehousesGet, warehousesGetById } = require("../../use-cases/warehouses/get");

/**
 * @api {get} /warehouse/all Get all warehouse entries
 * @apiName GetWarehouseAll
 * @apiGroup Warehouses
 * @apiVersion 1.0.0
 * @apiPermission authenticated user
 * @apiSuccess {Object[]} Array of warehouse entries
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/warehouses").get(async (req, res) => {
  try {
    const warehouses = await interactor.getWarehouses({
      warehousesGet,
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
router.route("/warehouses/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const warehouse = await interactor.getWarehousesById(
      { warehousesGetById },
      id
    );
    res.status(warehouse.status).send(warehouse);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
