const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

exports.productsGet = async ({ token, page = 1, limit = 10, search, product_type_id }) => {
  try {
    // Ensure token is provided
    if (!token) {
      return { status: 400, message: "token is required" };
    }

    // Verify token and validate role access
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== process.env.ROLE_ADMIN && decoded.role !== process.env.ROLE_MANAGER) {
        return { status: 403, message: "Access denied" };
      }
    } catch (error) {
      return { status: 401, message: "Invalid token" };
    }

    // Base query: only active products
    const query = { active: true };

    // Optional text search on code or description (case-insensitive)
    if (search) {
      query.$or = [
        { code: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Optional product type filter
    if (product_type_id) {
      query.product_type_id = product_type_id;
    }

    // Calculate how many documents to skip for pagination
    const skip = (page - 1) * limit;

    // Fetch products and total count in parallel
    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query)
    ]);

    // If no products found, return 404
    if (!products || products.length === 0) {
      return { status: 404, message: "Products not found." };
    }

    // Return paginated product list
    return {
      status: 200,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: products
    };
  } catch (error) {
    console.log("error", error);
    return { status: 500, message: "Something went wrong" };
  }
};

exports.productsGetById = async ({ id, token }) => {
  try {
    // Ensure both ID and token are provided
    if (!token || !id) {
      return { status: 400, message: "token and id are required" };
    }

    // Validate user access based on role
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (
        decoded.role !== process.env.ROLE_ADMIN &&
        decoded.role !== process.env.ROLE_MANAGER &&
        decoded.role !== process.env.ROLE_USER
      ) {
        return { status: 403, message: "Access denied" };
      }
    } catch (error) {
      console.log(error);
      return { status: 403, message: "Access denied" };
    }

    // Retrieve product by ID
    const product = await Product.find({ _id: id });
    console.log("product", product);

    // Return product data
    return { status: 200, data: product };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return { status: 500, message: "Something went wrong" };
  }
};