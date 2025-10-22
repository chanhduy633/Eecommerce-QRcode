// src/routes/authRoutes.ts
import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();
router.post("/admin/login", AuthController.adminLogin);

export default router;
