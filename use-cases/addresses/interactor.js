"use strict";

exports.createDefaultAddresses = async ({ createAddresses }, { }) => {
    try {
        console.log("createAddresses", createAddresses);
        const productType = await createAddresses();
        return productType;
    } catch (error) {
        console.log("error", error);

        // Fallback error response
        return ({ status: 500, message: "Something went wrong" });
    }
};