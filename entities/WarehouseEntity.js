exports.WarehouseEntity = class WarehouseEntity {
  constructor(warehouse) {
    this.id = warehouse.id;
    this.name = warehouse.name;
    this.address_id = warehouse.address_id;
  }
};
