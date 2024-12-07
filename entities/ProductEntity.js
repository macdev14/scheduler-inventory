exports.ProductEntity = class ProductEntity {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.product_type_id = product.product_type_id;
    this.image_url = product.image_url;
    this.active = product.active;
  }
};
