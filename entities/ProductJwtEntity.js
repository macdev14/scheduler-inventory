exports.ProductJwtEntity = class ProductJwtEntity {
  constructor(productJwt) {
    this.id = productJwt.id;
    this.name = productJwt.name;
    this.productJwt_type_id = productJwt.product_type_id;
    this.image_url = productJwt.image_url;
    this.active = productJwt.active !== undefined ? productJwt.active : true;
    this.token = productJwt.token;
  }
};
