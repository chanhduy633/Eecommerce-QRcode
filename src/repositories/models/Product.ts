import mongoose from "mongoose";
import { IProductDoc } from "../../types/productTypes";
const productSchema = new mongoose.Schema<IProductDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    image_url: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware để xóa specification khi xóa product
productSchema.pre('findOneAndDelete', async function(next) {
  const productId = this.getQuery()["_id"];
  await mongoose.model('ProductSpecification').deleteOne({ product: productId });
  next();
});

productSchema.pre('deleteOne', async function(next) {
  const productId = this.getQuery()["_id"];
  await mongoose.model('ProductSpecification').deleteOne({ product: productId });
  next();
});

const Product = mongoose.model<IProductDoc>("Product", productSchema);

export default Product;
