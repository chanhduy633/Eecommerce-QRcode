import { Router } from "express";
import { UserController } from "../controllers/userController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.get("/", protect, adminOnly, UserController.getAllUsers);
router.get("/:id", protect, adminOnly, UserController.getUserById);
router.post("/", protect, adminOnly, UserController.createUser);
router.put("/:id", protect, adminOnly, UserController.updateUser);
router.delete("/:id", protect, adminOnly, UserController.deleteUser);

export default router;
