import { Router } from "express";
import productRoutesV1 from "./v1/productRoutesV1";
import productRoutesV2 from "./v2/productRoutesV2";

const router = Router();

router.use("/v1", productRoutesV1);
router.use("/v2", productRoutesV2);

export default router;
