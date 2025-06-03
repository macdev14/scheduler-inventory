exports.ProductJwtEntity = class ProductJwtEntity {
  constructor(productJwt) {
    this.id = productJwt.id || null;
    this.code = productJwt.code;
    this.name = productJwt.name;
    this.product_type_id = productJwt.product_type_id;
    this.description = productJwt.description || "";
    this.image_name = productJwt.image_name || "";
    this.active = productJwt.active !== undefined ? productJwt.active : true;
    this.token = productJwt.token;
  }
};
