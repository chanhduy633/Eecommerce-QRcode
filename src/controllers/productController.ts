import { productService } from "../app/productDependency";
import { ProductControllerV1 } from "./v1/productControllerV1";
// import { ProductControllerV2 } from "./v2/productControllerV2";

// Chỉ cần đổi dòng này là đổi version API
export const productController = new ProductControllerV1(productService);
// export const productController = new ProductControllerV2(productService);
