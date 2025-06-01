"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "address" }
);
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;


// Seed data for addresses
addressSchema.statics.seedAddresses = async function () {
  try {
    const addressSeeds = [
      {
        address: "Rua da Liberdade 123",
        city: "Barcelos",
        postal_code: "4755-123",
        country: "Portugal",
        latitude: 41.5318,
        longitude: -8.6151,
        active: true,
      },
      {
        address: "Avenida do Cávado 456",
        city: "Barcelos",
        postal_code: "4750-456",
        country: "Portugal",
        latitude: 41.5300,
        longitude: -8.6150,
        active: true,
      },
      {
        address: "Praça da República 789",
        city: "Barcelos",
        postal_code: "4750-789",
        country: "Portugal",
        latitude: 41.5310,
        longitude: -8.6140,
        active: true,
      },
      {
        address: "Travessa do Sol 101",
        city: "Barcelos",
        postal_code: "4750-101",
        country: "Portugal",
        latitude: 41.5320,
        longitude: -8.6160,
        active: true,
      }
    ];

    for (const address of addressSeeds) {
      await this.updateOne(
        { address: address.address }, // Query by address
        { $set: address },            // Update or set data
        { upsert: true }              // Insert if not exists
      );
    }
  } catch (error) {
    throw error;
  }
};

module.exports = addressSeeds;

