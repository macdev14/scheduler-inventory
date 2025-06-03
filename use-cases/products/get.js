const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

exports.productsGet = async ({ token, page = 1, limit = 10, search, product_type_id }) => {
  try {
    if (!token) {
      return { status: 400, message: "token is required" };
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== process.env.ROLE_ADMIN && decoded.role !== process.env.ROLE_MANAGER) {
        return { status: 403, message: "Access denied" };
      }
    } catch (error) {
      return { status: 401, message: "Invalid token" };
    }

    const query = { active: true };

    if (search) {
      query.$or = [
        // { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (product_type_id) {
      query.product_type_id = product_type_id;
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query)
    ]);

    if (!products || products.length === 0) {
      return { status: 404, message: "Products not found." };
    }

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

    // Ensure the token is provided
    if (!token || !id) {
      return { status: 400, message: "token and id are required" };
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

    const product = await Product.find({ _id: id });
    console.log("product", product);
    return { status: 200, data: product };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
