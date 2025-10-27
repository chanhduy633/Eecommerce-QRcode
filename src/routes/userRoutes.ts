import express from "express";
import { userDependencies } from "../app/dependencies";

const router = express.Router();

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userDependencies.getAllUsers.execute();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userDependencies.getUserById.execute(req.params.id);
    if (!user) return res.status(404).json({ error: "Không tìm thấy user" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create new user
router.post("/", async (req, res) => {
  try {
    const user = await userDependencies.createUser.execute(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Update user
router.put("/:id", async (req, res) => {
  try {
    const updated = await userDependencies.updateUser.execute(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Không tìm thấy user" });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete user
router.delete("/:id", async (req, res) => {
  try {
    const success = await userDependencies.deleteUser.execute(req.params.id);
    if (!success) return res.status(404).json({ error: "Không tìm thấy user" });
    res.json({ message: "Xóa user thành công" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
