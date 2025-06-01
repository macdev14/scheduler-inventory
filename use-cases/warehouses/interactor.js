"use strict";

const { WarehouseEntity } = require("../../entities/WarehouseEntity");

exports.getWarehouses = async ({ warehousesGet }) => {
  try {
    const warehouses = await warehousesGet();
    return warehouses;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.getWarehousesById = async ({ warehousesGetById }, id) => {
  try {
    const warehouse = await warehousesGetById(id);

    return warehouse;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};
