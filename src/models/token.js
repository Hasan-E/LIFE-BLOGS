"use strict";

const { type } = require("os");
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
  },
  { collection: "tokens", timestamps: true }
);

module.exports = model("Token", tokenSchema);
