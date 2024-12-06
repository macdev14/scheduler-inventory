exports.ProductTypeEntity = class ProductTypeEntity {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.active = product.active;
  }
};
