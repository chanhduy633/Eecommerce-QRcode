// controllers/index.ts
import { productService } from "../app/productDependency";
import { ProductControllerV1 } from "./v1/productControllerV1";
import { ProductControllerV2 } from "./v2/productControllerV2";

// Cùng dùng một service instance
export const productControllerV1 = new ProductControllerV1(productService);
export const productControllerV2 = new ProductControllerV2(productService);
