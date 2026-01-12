// routes/upload.ts (hoặc tên file upload của bạn)
import express, { Request, Response } from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

// Khởi tạo Supabase với service_role key
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Multer lưu file vào memory (RAM)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Chỉ chấp nhận file ảnh"));
    }
    cb(null, true);
  },
});

// API Upload
router.post("/", upload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có file được tải lên" });
    }

    // Tạo tên file unique
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1e9);
    const ext = req.file.originalname.split(".").pop();
    const fileName = `image-${timestamp}-${random}.${ext}`;

    // Upload lên Supabase Storage
    const { data, error } = await supabase.storage
      .from("products") // Tên bucket
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // Trả về TÊN FILE (không phải URL đầy đủ)
    return res.status(200).json({
      url: fileName,
      filename: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload ảnh thất bại" });
  }
});

export default router;