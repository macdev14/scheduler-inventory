"use strict";
const mongoose = require("mongoose");
require("../../framework/db/mongoDB/models/addressModel");
const Address = mongoose.model("Address");
require("dotenv").config();

exports.createAddresses = async () => {
  try {
    // Count the number of documents in the Address collection
    const addressesCount = await Address.countDocuments();
    console.log("addressesCount", addressesCount);

    // If there are already addresses in the database, does not create new ones
    if (addressesCount !== 0) {
      return {
        status: 200,
        message: "Database has addresses, no action required",
      };
    }

    // If no addresses exist, seed the database with initial data
    await Address.seedAddresses();

    // Return success after seeding
    return { status: 201, message: "Addresses created successfully" };
  } catch (error) {
    // Log and return a fallback error response in case something goes wrong
    console.log("error", error);
    return ({ status: 500, message: "Something went wrong" });
  }
};