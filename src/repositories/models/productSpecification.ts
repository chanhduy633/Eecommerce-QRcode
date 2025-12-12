import mongoose, { Schema } from "mongoose";
import { IProductSpecificationDoc } from "../../types/productSpecificationTypes";

const productSpecificationSchema = new Schema<IProductSpecificationDoc>(
  {
    product: {
      type: Schema.Types.ObjectId as any,
      ref: "Product",
      required: true,
      unique: true, // 1 product = 1 specification
    },

    brand: { type: String, default: null },
    model: { type: String, default: null },
    releaseYear: { type: Number, default: null },
    warranty: { type: String, default: null },
    origin: { type: String, default: null },
    color: { type: String, default: null },
    material: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

// Index theo product (tối ưu tìm kiếm)
productSpecificationSchema.index({ product: 1 });

const ProductSpecification = mongoose.model<IProductSpecificationDoc>(
  "ProductSpecification",
  productSpecificationSchema
);

export default ProductSpecification;
