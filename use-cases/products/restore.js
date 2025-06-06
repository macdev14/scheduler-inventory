const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../../framework/db/mongoDB/models/productModel");
const Product = mongoose.model("Product");

// Validation helper to ensure the product ID is provided and exists in the database
const validations = async (id) => {
    if (!id) return { status: 400, message: "product_id is required." };

    const productExists = await Product.findOne({ _id: id });
    if (!productExists) return { status: 404, message: "Product does not exist." };
};

exports.productsRestore = async ({ token, id }) => {
    try {
        // Ensure both token and product ID are provided
        if (!token || !id) {
            return { status: 400, message: "token and id are required" };
        }

        // Verify token and allow only admin users
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role !== process.env.ROLE_ADMIN) {
                return { status: 403, message: "Access denied" };
            }
        } catch (error) {
            console.log("error", error);
            return { status: 403, message: "Access denied" };
        }

        // Validate product existence
        let validationResult = await validations(id);
        if (validationResult) return validationResult;

        // Restore the product by setting `active` to true
        const productRestored = await Product.findOneAndUpdate(
            { _id: id },
            { active: true },
            { new: true } // return the updated document
        );

        return { status: 200, data: productRestored };
    } catch (error) {
        console.log("error", error);
        return { status: 500, message: "Something went wrong" };
    }
};
