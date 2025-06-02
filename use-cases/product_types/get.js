const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productTypeModel");
const ProductType = mongoose.model("ProductType");

exports.productTypesGet = async ({ token, page = 1, limit = 10, search}) => {
  try {
    // Ensure the token is provided
    if (!token) {
      return { status: 400, message: "token is required" };
    }

    // Only allow access to admins, managers, and users
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== process.env.ROLE_ADMIN && decoded.role !== process.env.ROLE_MANAGER && decoded.role !== process.env.ROLE_USER) {
        return { status: 403, message: "Access denied" };
      }
    } catch (error) {
      console.log(error);
      return { status: 403, message: "Access denied" };
    }
    

    // Build MongoDB query based on filters
    const query = { active: true };

    // Optional name filter (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Calculate how many documents to skip based on pagination
    const skip = (page - 1) * limit;

    // Run queries in parallel: fetch paginated results and total count
    const [productTypes, total] = await Promise.all([
      ProductType.find(query).skip(skip).limit(limit),
      ProductType.countDocuments(query)
    ]);

    if (!productTypes || productTypes.length === 0) {
      return { status: 404, message: "No product types found" };
    }

    // Return paginated product types along with metadata
    return {
      status: 200,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: productTypes
    };

  } catch (error) {
    console.log("error", error);
    return { status: 500, message: "Something went wrong" };
  }
};

exports.productTypesGetById = async ({token, id}) => {
  try {

    // Ensure the token is provided
    if (!token) {
      return { status: 400, message: "token is required" };
    }

    // Only allow access to admins, managers, and users
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== process.env.ROLE_ADMIN && decoded.role !== process.env.ROLE_MANAGER && decoded.role !== process.env.ROLE_USER) {
        return { status: 403, message: "Access denied" };
      }
    } catch (error) {
      console.log(error);
      return { status: 403, message: "Access denied" };
    }
    const productType = await ProductType.find({ _id: id });
    return { status: 200, data: productType };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
