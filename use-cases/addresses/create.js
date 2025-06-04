"use strict";
const mongoose = require("mongoose");
require("../../framework/db/mongoDB/models/addressModel");
const Address = mongoose.model("Address");
require("dotenv").config();

exports.createAddresses = async () => {
  try {
    const addressesCount = await Address.countDocuments();
    console.log("addressesCount", addressesCount);
    if (addressesCount !== 0) {
      return {
        status: 200,
        message: "Database has addresses, no action required",
      };
    }
    await Address.seedAddresses();

    return { status: 201, message: "Addresses created successfully" };
  } catch (error) {
    console.log("error", error);

    // Fallback error response
    return ({ status: 500, message: "Something went wrong" });
  }
};