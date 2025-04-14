exports.StockJwtEntity = class StockJwtEntity {
  constructor(stockJwt) {
    this.product_id = stockJwt.product_id;
    this.warehouse_id = stockJwt.warehouse_id;
    this.quantity = stockJwt.quantity;
    this.active = stockJwt.active !== undefined ? stockJwt.active : true;
    this.token = stockJwt.token;
  }
};
