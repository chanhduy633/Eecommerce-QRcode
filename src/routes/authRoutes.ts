import { Router, Request, Response } from "express";
import { adminLoginUseCase } from "../app/dependencies";

const router = Router();

router.post("/admin/login", async (req: Request, res: Response) => {
  try {
    const result = await adminLoginUseCase.execute(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Lỗi khi đăng nhập admin:", error);
    if (
      error.message === "Thông tin đăng nhập không hợp lệ" ||
      error.message === "Chỉ admin mới được phép truy cập"
    ) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Lỗi server nội bộ" });
    }
  }
});

export default router;
