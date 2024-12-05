exports.ProductEntity = class ProductEntity {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    // this.description = product.description;
    // this.price = product.price;
    this.type = product.type;
    this.image = product.image;
    this.active = product.active;
  }
};
