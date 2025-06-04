"use strict";

const { WarehouseJwtEntity } = require("../../entities/WarehouseJwtEntity");

exports.getWarehouses = async ({ warehousesGet }, { token, page, limit, search }) => {
  try {
    const getWarehouses = await warehousesGet({token, page, limit, search});
    return getWarehouses;
  } catch (error) {
    return {
      status: 500,
      message: 'An error occurred: ' + error.message
    };
  }
};

exports.getWarehousesById = async ({ warehousesGetById }, {token, id}) => {
  try {
    const warehouse = await warehousesGetById({token, id});

    return warehouse;
  } catch (error) {
    return {
      status: 500,
      message: 'An error occurred: ' + error.message
    };
  }
};
