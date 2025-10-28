import express from "express";
import { userDependencies } from "../app/dependencies";
import { ResponseCode, ResponseHandler } from "../untils/responseHandler";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userDependencies.getAllUsers.execute();
    res.json(ResponseHandler.success(users));
  } catch (err: any) {
    res.status(500).json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, err.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userDependencies.getUserById.execute(req.params.id);
    if (!user) return res.status(404).json(ResponseHandler.error(ResponseCode.NOT_FOUND, "Không tìm thấy user"));
    res.json(ResponseHandler.success(user));
  } catch (err: any) {
    res.status(500).json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, err.message));
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userDependencies.createUser.execute(req.body);
    res.status(201).json(ResponseHandler.created(user));
  } catch (err: any) {
    res.status(400).json(ResponseHandler.error(ResponseCode.BAD_REQUEST, err.message));
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await userDependencies.updateUser.execute(req.params.id, req.body);
    if (!updated) return res.status(404).json(ResponseHandler.error(404, "Không tìm thấy user"));
    res.json(ResponseHandler.success(updated, "Cập nhật user thành công"));
  } catch (err: any) {
    res.status(400).json(ResponseHandler.error(ResponseCode.BAD_REQUEST, err.message));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const success = await userDependencies.deleteUser.execute(req.params.id);
    if (!success) return res.status(404).json(ResponseHandler.error(ResponseCode.NOT_FOUND, "Không tìm thấy user"));
    res.json(ResponseHandler.success(null, "Xóa user thành công"));
  } catch (err: any) {
    res.status(500).json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, err.message));
  }
});

export default router;
