exports.StockEntity = class StockEntity {
  constructor(stock) {
    this.product_id = stock.id;
    this.warehouse_id = stock.name;
    this.quantity = stock.quantity;
    this.active = stock.active !== undefined ? stock.active : true;
  }
};
