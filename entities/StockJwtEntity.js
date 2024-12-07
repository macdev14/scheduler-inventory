exports.StockJwtEntity = class StockJwtEntity {
  constructor(stockJwt) {
    this.product_id = stockJwt.id;
    this.warehouse_id = stockJwt.name;
    this.quantity = stockJwt.quantity;
    this.active = stockJwt.active !== undefined ? stockJwt.active : true;
    this.token = stockJwt.token;
  }
};
