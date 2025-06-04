const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/warehouseModel");
const Warehouse = mongoose.model("Warehouse");

exports.warehousesGet = async ({ token, page = 1, limit = 10, search }) => {

  try {
    if (!token) return { status: 400, message: "token is required" };

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== process.env.ROLE_ADMIN && decoded.role !== process.env.ROLE_MANAGER && decoded.role !== process.env.ROLE_USER) {
        return { status: 403, message: "Access denied" };
      }
    } catch (error) {
      return { status: 401, message: "Invalid token" };
    }

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [warehouses, total] = await Promise.all([
      Warehouse.find(query).skip(skip).limit(limit),
      Warehouse.countDocuments(query)
    ]);

    if (!warehouses || warehouses.length === 0) {
      return { status: 404, message: "Warehouses not found." };
    }

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

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};

exports.warehousesGetById = async ({ token, id }) => {
  try {
    if (!token) return { status: 400, message: "token is required" };

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== process.env.ROLE_ADMIN && decoded.role !== process.env.ROLE_MANAGER && decoded.role !== process.env.ROLE_USER) {
        return { status: 403, message: "Access denied" };
      }
    } catch (error) {
      return { status: 401, message: "Invalid token" };
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid id" };
    }
    
    const warehouse = await Warehouse.find({ _id: id });
    return { status: 200, data: warehouse };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};
