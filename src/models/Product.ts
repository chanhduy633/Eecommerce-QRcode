import mongoose from "mongoose";
import { IProductDoc } from '../types/productTypes';
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
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
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

const Product = mongoose.model<IProductDoc>("Product", productSchema);

export default Product;