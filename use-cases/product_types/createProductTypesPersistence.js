'use strict'
const mongoose = require("mongoose");
require("../../framework/db/mongoDB/models/productTypeModel");
const ProductType = mongoose.model("ProductType");
require('dotenv').config();


exports.createProductTypesPersistence = async () => {
    try {
        const productTypesCount = await ProductType.countDocuments();
        console.log("productTypesCount", productTypesCount);
        if (productTypesCount !== 0) {
            return { status: 200, message: "Database has product types, no action required" };
        }
        await ProductType.type_1();
        await ProductType.type_2();
        await ProductType.type_3();
        await ProductType.type_4();
        await ProductType.type_5();
        await ProductType.type_6();
        await ProductType.type_7();
        await ProductType.type_8();
        await ProductType.type_9();
        await ProductType.type_10();

        return { status: 201, message: "Product types created successfully" };
    } catch (error) {
        console.log(error.message );
        return { status: 500, message: "Something went wrong during event type creation", error: error.message };
    }
};