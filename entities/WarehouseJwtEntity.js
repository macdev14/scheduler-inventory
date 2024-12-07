exports.WarehouseJwtEntity = class WarehouseJwtEntity {
  constructor(warehouseJwt) {
    this.id = warehouseJwt.id;
    this.name = warehouseJwt.name;
    this.address_id = warehouseJwt.address_id;
    this.active = warehouseJwt.active !== undefined ? warehouseJwt.active : true;
    this.token = warehouseJwt.token;
  }
};
