"use strict";

const { WarehouseEntity } = require("../../entities/WarehouseEntity");

exports.warehouseRead = async ({ warehouseReadPersistence }) => {
  try {
    const warehouses = await warehouseReadPersistence();
    return warehouses;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.warehouseReadId = async ({ warehouseIdReadPersistence }, id) => {
  try {
    const warehouse = await warehouseIdReadPersistence(id);

    return warehouse;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
