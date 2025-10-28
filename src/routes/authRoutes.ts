import { Router } from "express";
import { adminLoginUseCase } from "../app/dependencies";
import { ResponseCode, ResponseHandler } from "../untils/responseHandler";

const router = Router();

router.post("/admin/login", async (req, res) => {
  try {
    const result = await adminLoginUseCase.execute(req.body);
    res.json(ResponseHandler.success(result, "Đăng nhập thành công"));
  } catch (err: any) {
    if (err.message === "Thông tin đăng nhập không hợp lệ" ||
        err.message === "Chỉ admin mới được phép truy cập") {
      res.status(401).json(ResponseHandler.error(ResponseCode.UNAUTHORIZED, err.message));
    } else {
      res.status(500).json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, "Lỗi server nội bộ"));
    }
  }
});

export default router;
