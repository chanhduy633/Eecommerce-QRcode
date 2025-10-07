import { Request, Response } from "express";
import Product from "../models/Product";
import {
  CreateProductDto,
  UpdateProductDto,
  IProduct,
  IProductDoc,
} from "../types/productTypes";

const toProductResponse = (product: IProductDoc): IProduct => ({
  _id: product._id.toString(),
  name: product.name,
  description: product.description || undefined,
  price: product.price,
  category: product.category,
  stock: product.stock,
  sold: product.sold,
  image_url: product.image_url || undefined,
  createdAt: product.createdAt.toISOString(),
  updatedAt: product.updatedAt.toISOString(),
});

// GET /api/products — Lấy danh sách sản phẩm
export const getAllProducts = async (
  req: Request<any, IProduct[], any, any>,
  res: Response<IProduct[]>
): Promise<void> => {
  try {
    const products = await Product.find();
    const response = products.map(toProductResponse);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message } as any);
  }
};

// GET /api/products/:id — Lấy chi tiết sản phẩm theo ID
export const getProductById = async (
  req: Request<{ id: string }, IProduct, any, any>,
  res: Response<IProduct, any>
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ error: "Không tìm thấy sản phẩm" } as any);
      return;
    }
    res.status(200).json(toProductResponse(product));
  } catch (error: any) {
    res.status(500).json({ error: error.message } as any);
  }
};

// POST /api/products — Thêm sản phẩm mới
export const createProduct = async (
  req: Request<any, IProduct, CreateProductDto, any>,
  res: Response<IProduct, any>
): Promise<void> => {
  try {
    const productData = req.body as CreateProductDto;

    const product = new Product(productData);
    const savedProduct = await product.save();

    res.status(201).json(toProductResponse(savedProduct));
  } catch (error: any) {
    res.status(400).json({ error: error.message } as any);
  }
};

// PUT /api/products/:id — Cập nhật sản phẩm
export const updateProduct = async (
  req: Request<{ id: string }, IProduct, UpdateProductDto, any>,
  res: Response<IProduct, any>
): Promise<void> => {
  try {
    const updateData = req.body as UpdateProductDto;

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      res.status(404).json({ error: "Không tìm thấy sản phẩm" } as any);
      return;
    }

    res.status(200).json(toProductResponse(product));
  } catch (error: any) {
    res.status(400).json({ error: error.message } as any);
  }
};

// DELETE /api/products/:id — Xoá sản phẩm
export const deleteProduct = async (
  req: Request<{ id: string }, { message: string }, any, any>,
  res: Response<{ message: string }>
): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Không tìm thấy sản phẩm" } as any);
      return;
    }
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error: any) {
    res.status(500).json({ error: error.message } as any);
  }
};
