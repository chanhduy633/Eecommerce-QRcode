import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { API_ROUTES } from "../config/api";

const router = express.Router();

// Thư mục lưu ảnh
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "products");

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // Giới hạn 1MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Vui lòng tải lên file ảnh"));
    }
    cb(null, true);
  },
});

// API Upload ảnh
router.post("/", upload.single("image"), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có file được tải lên" });
    }

    // URL truy cập ảnh (nếu dùng static server)
    const imageUrl = `${API_ROUTES.UPLOAD}/${req.file.filename}`;

    return res.status(200).json({
      url: imageUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload ảnh thất bại" });
  }
});

export default router;
