import { Router } from "express";
import { userController } from "../controllers/userController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.get("/", protect, adminOnly, (req, res) => userController.getAllUsers(req, res));
router.get("/:id", protect, adminOnly, (req, res) => userController.getUserById(req, res));
router.post("/", protect, adminOnly, (req, res) => userController.createUser(req, res));
router.put("/:id", protect, adminOnly, (req, res) => userController.updateUser(req, res));
router.delete("/:id", protect, adminOnly, (req, res) => userController.deleteUser(req, res));

export default router;
