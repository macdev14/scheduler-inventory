"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
  {
    name: { type: String, required: true },
    address_id: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "warehouse" }
);

warehouseSchema.statics.seedWarehouses = async function () {
    const addressIds = await mongoose.model("Address").distinct("_id");
    if (addressIds.length < 4) {
        throw new Error(
            "At least 4 addresses should be seeded before seeding warehouses!"
        );
    }
    const randomAddressIds = addressIds.sort(() => 0.5 - Math.random()).slice(0, 4);

    const warehouses = [
        {
            name: "Deposito 1",
            address_id: randomAddressIds[0],
        },
        {
            name: "Deposito 2",
            address_id: randomAddressIds[1],
        },
        {
            name: "Deposito 3",
            address_id: randomAddressIds[2],
        },
        {
            name: "Deposito 4",
            address_id: randomAddressIds[3],
        },
    ];

    await this.insertMany(warehouses.map(warehouse => ({ ...warehouse, active: true })));
};

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
module.exports = Warehouse;


