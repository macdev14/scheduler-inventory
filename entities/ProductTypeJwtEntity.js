exports.ProductTypeJwtEntity = class ProductTypeJwtEntity {
  constructor(productTypeJwt) {
    this.id = productTypeJwt.id;
    this.name = productTypeJwt.name;
    this.active = productTypeJwt.active !== undefined ? productTypeJwt.active : true;
    this.token = productTypeJwt.token;
  }
};
