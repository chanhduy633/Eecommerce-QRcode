import { productControllerV2 } from "../../controllers/productController";
import { createProductRouter } from "../factory/createProductRouter";

export default createProductRouter(productControllerV2);
