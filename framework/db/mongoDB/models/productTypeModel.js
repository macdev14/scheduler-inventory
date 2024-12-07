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
          id: 1,
          name: 'Mobiliário',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 2,
          name: 'Catering',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 3,
          name: 'Comunicações',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 4,
          name: 'Equipamentos Elétricos',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 5,
          name: 'Publicidade',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 6,
          name: 'Camarins',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 7,
          name: 'Proteção civil',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 8,
          name: 'Estruturas',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 9,
          name: 'Tendas',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
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
          id: 10,
          name: 'Delimitações',
          active: true
      };

      await this.updateOne(
          { id: productType.id }, 
          { $set: productType },              
          { upsert: true  }                 
      );
  } catch (error) {
      throw error;
  }
};

const ProductType = mongoose.model("ProductType", productTypeSchema);
module.exports = ProductType;
