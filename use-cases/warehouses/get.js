const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");

// Retrieves a paginated list of warehouses with optional search filter
exports.warehousesGet = async ({ token, page = 1, limit = 10, search }) => {
  try {
    // Ensure token is present
    if (!token) return { status: 400, message: "token is required" };

    // Validate token and check user role permissions
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
      return { status: 401, message: "Invalid token" };
    }

    // Build search query
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } }, // Case-insensitive partial match on name
      ];
    }

    const skip = (page - 1) * limit;

    // Fetch filtered and paginated data along with total count
    const [warehouses, total] = await Promise.all([
      Warehouse.find(query).skip(skip).limit(limit),
      Warehouse.countDocuments(query)
    ]);

    // Handle empty result
    if (!warehouses || warehouses.length === 0) {
      return { status: 404, message: "Warehouses not found." };
    }

    // Return paginated response with metadata
    return {
      status: 200,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: warehouses
    };
  } catch (error) {
    console.log("error", error);
    return { status: 500, message: "Something went wrong" };
  }
};

// Retrieves a single warehouse by ID
exports.warehousesGetById = async ({ token, id }) => {
  try {
    // Ensure token is present
    if (!token) return { status: 400, message: "token is required" };

    // Validate token and check user role permissions
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
      return { status: 401, message: "Invalid token" };
    }

    // Validate provided ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid id" };
    }

    // Find warehouse by ID
    const warehouse = await Warehouse.find({ _id: id });

    return { status: 200, data: warehouse };
  } catch (error) {
    console.log("error", error);
    return { status: 500, message: "Something went wrong" };
  }
};
