import express from "express";
import { authDependencies } from "../app/dependencies";
import { ResponseHandler, ResponseCode } from "../utils/responseHandler";

const router = express.Router();

// 🧩 Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { email, password, full_name, phone } = req.body;
    const user = await authDependencies.register.execute(email, password, full_name, phone);
    res.json(ResponseHandler.success({ user }));
  } catch (err: any) {
    res.status(400).json(ResponseHandler.error(ResponseCode.BAD_REQUEST, err.message));
  }
});

// 🔑 Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authDependencies.login.execute(email, password);
    res.json(ResponseHandler.success({ user }));
  } catch (err: any) {
    res.status(401).json(ResponseHandler.error(ResponseCode.UNAUTHORIZED, err.message));
  }
});



// 🔁 Quên mật khẩu
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    await authDependencies.forgotPassword.execute(email);
    res.json(ResponseHandler.success("Đã gửi email khôi phục mật khẩu"));
  } catch (err: any) {
    res.status(404).json(ResponseHandler.error(ResponseCode.NOT_FOUND, err.message));
  }
});

export default router;

