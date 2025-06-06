const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/stockModel");
const Stock = mongoose.model("Stock");

exports.stocksGet = async ({ token, product_id, warehouse_id, quantity, active, page, limit }) => {
  try {
    // Ensure the token is provided
    if (!token) return { status: 400, message: "token is required." };

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Only allow access to admins, managers, and users
    if (
      decoded.role !== process.env.ROLE_ADMIN &&
      decoded.role !== process.env.ROLE_MANAGER &&
      decoded.role !== process.env.ROLE_USER
    ) {
      return { status: 403, message: "Access denied" };
    }

    // Base query includes only active records by default
    const query = { active: true };

    // Optional filter: product_id must be a valid ObjectId
    if (product_id) {
      if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return { status: 400, message: "product_id is not a valid id." };
      }
      query.product_id = product_id;
    }

    // Optional filter: warehouse_id must be a valid ObjectId
    if (warehouse_id) {
      if (!mongoose.Types.ObjectId.isValid(warehouse_id)) {
        return { status: 400, message: "warehouse_id is not a valid id." };
      }
      query.warehouse_id = warehouse_id;
    }

    // Optional filter: quantity must match exactly
    if (quantity) {
      query.quantity = quantity;
    }

    // Admins can explicitly filter by active/inactive records
    if (active && decoded.role === process.env.ROLE_ADMIN) {
      query.active = active;
    }

    // Calculate pagination skip value
    const skip = (page - 1) * limit;

    // Retrieve paginated stock records and total count in parallel
    const [stocks, total] = await Promise.all([
      Stock.find(query).skip(skip).limit(limit),
      Stock.countDocuments(query)
    ]);

    // Handle case where no records are found
    if (!stocks || stocks.length === 0) {
      return { status: 404, message: "Stocks not found." };
    }

    // Return results and pagination metadata
    return {
      status: 200,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: stocks
    };

  } catch (error) {
    // Return a generic error message in case of unexpected failure
    return { status: 500, message: "Something went wrong" };
  }
};


