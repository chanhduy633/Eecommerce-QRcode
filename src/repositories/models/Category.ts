// src/infrastructure/database/models/Category.ts

import mongoose, { Schema } from "mongoose";
import { ICategory } from "../../types/categoryTypes";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    
    isActive: {
      type: Boolean,
      default: true,
    },
    productCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index cho tìm kiếm
categorySchema.index({ name: "text", description: "text" });
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1 });

// Helper để tạo slug từ name
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;