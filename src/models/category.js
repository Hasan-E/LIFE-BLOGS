"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

  },
  { collection: "categories", timestamps: true }
);

module.exports = model("Category", categorySchema);
