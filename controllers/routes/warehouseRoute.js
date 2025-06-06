const interactor = require("../../use-cases/warehouses/interactor");
const fs = require("fs");
const router = require("express").Router();

const { warehousesGet, warehousesGetById } = require("../../use-cases/warehouses/get");

/**
 * @api {get} /warehouses Get all warehouses
 * @apiName GetWarehouses
 * @apiGroup Warehouses
 * @apiPermission authenticated user
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [limit=10] Number of warehouses per page
 * @apiParam {String} [search] Search string
 * @apiSuccess {Object[]} Array of warehouse entries
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/warehouses").get(async (req, res) => {
  const token = req.headers['token']
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  try {
    const warehouses = await interactor.getWarehouses({
      warehousesGet
    },
    { token, page, limit, search }
    );
    res.status(warehouses.status).send(warehouses);
  } catch (error) {
    throw error;
  }
});

/**
 * @api {get} /warehouses/:id Get a warehouse by ID
 * @apiName GetWarehouse
 * @apiGroup Warehouses
 * @apiPermission authenticated user
 * @apiParam {String} id Warehouse ID
 * @apiSuccess {Object} Warehouse entry
 * @apiError {Error} 404 Warehouse not found
 * @apiError {Error} 500 Internal Server Error
 */
router.route("/warehouses/:id").get(async (req, res) => {
  const token = req.headers['token']
  const id = req.params.id;
  try {
    const warehouse = await interactor.getWarehousesById(
      { warehousesGetById },
      {id, token}
    );
    res.status(warehouse.status).send(warehouse);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
