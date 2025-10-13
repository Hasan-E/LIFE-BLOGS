"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const postSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    countOfVisibility: {
      type: Number,
      default: 0,
    },
  },
  { collection: "posts", timestamps: true }
);

postSchema.pre("save", function (next) {
  //Create slug
  if (this.isModified("title") || !this.slug) {
    let baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    if (this.userId) {
      const userPart = this.userId.toString().slice(-2);
      this.slug = `${baseSlug}-${userPart}`;
    } else {
      this.slug = `${baseSlug}-${Date.now().toString().slice(-2)}`;
    }
  }

  // -- Tags normalize --
  if (this.tags && this.tags.length > 0) {
    this.tags = [...new Set(this.tags.map((tag) => tag.trim().toLowerCase()))];
  }
  next();
});

module.exports = model("Post", postSchema);
