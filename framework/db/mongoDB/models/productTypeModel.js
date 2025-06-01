"use strict";
//database schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTypeSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { collection: "product_type" }
);

productTypeSchema.statics.type_1 = async function () {
  try {
      const productType = {
          name: 'Mobiliário',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_2 = async function () {
  try {
      const productType = {
          name: 'Catering',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_3 = async function () {
  try {
      const productType = {
          name: 'Comunicações',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_4 = async function () {
  try {
      const productType = {
          name: 'Equipamentos Elétricos',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_5 = async function () {
  try {
      const productType = {
          name: 'Publicidade',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_6 = async function () {
  try {
      const productType = {
          name: 'Camarins',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_7 = async function () {
  try {
      const productType = {
          name: 'Proteção civil',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_8 = async function () {
  try {
      const productType = {
          name: 'Estruturas',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_9 = async function () {
  try {
      const productType = {
          name: 'Tendas',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};
productTypeSchema.statics.type_10 = async function () {
  try {
      const productType = {
          name: 'Delimitações',
          active: true
      };

      await this.updateOne(
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};

const ProductType = mongoose.model("ProductType", productTypeSchema);
module.exports = ProductType;
