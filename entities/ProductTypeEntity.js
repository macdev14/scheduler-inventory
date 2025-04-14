exports.ProductTypeEntity = class ProductTypeEntity {
  constructor(productType) {
    this.id = productType.id;
    this.name = productType.name;
    this.active = productType.active !== undefined ? productType.active : true;
  }
};
