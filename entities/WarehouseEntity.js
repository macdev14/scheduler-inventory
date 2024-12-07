exports.WarehouseEntity = class WarehouseEntity {
  constructor(warehouse) {
    this.id = warehouse.id;
    this.name = warehouse.name;
    this.active = warehouse.active !== undefined ? warehouse.active : true;
  }
};
