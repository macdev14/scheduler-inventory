"use strict";

exports.getProductTypes = async ({ productTypesGet }, {token, page, limit, search}) => {
  try {
    const productTypes = await productTypesGet({token, page, limit, search});
    return productTypes;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};

exports.getProductTypeById = async ({ productTypesGetById }, id) => {
  try {
    const productType = await productTypesGetById(id);

    return productType;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};
exports.createDefaultProductTypes = async ({ createProductTypes }, { }) => {
  try {
    console.log("createProductTypes", createProductTypes);
    const productType = await createProductTypes();
    return productType;
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred: ' + error,
    });
  }
};
