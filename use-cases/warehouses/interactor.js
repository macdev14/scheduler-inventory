"use strict";

const { WarehouseEntity } = require("../../entities/WarehouseEntity");

exports.getWarehouses = async ({ warehousesGet }) => {
  try {
    const warehouses = await warehousesGet();
    return warehouses;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};

exports.getWarehousesById = async ({ warehousesGetById }, id) => {
  try {
    const warehouse = await warehousesGetById(id);

    return warehouse;
  } catch (error) {
    return { success: false, status: 500, message: "Something went wrong." };
  }
};
