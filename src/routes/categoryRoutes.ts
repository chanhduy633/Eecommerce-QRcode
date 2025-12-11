import { Router, Request, Response } from "express";
import { categoryDependencies } from "../app/dependencies";
import { ResponseCode, ResponseHandler } from "../utils/responseHandler";

const router = Router();

// ==========================================
// GET /api/categories - Get all categories
// ==========================================
router.get("/", async (req: Request, res: Response) => {
  try {
    const { isActive, search } = req.query;

    const filters = {
      isActive:
        isActive === "true" ? true : isActive === "false" ? false : undefined,
      search: search as string,
    };

    const categories = await categoryDependencies.getAll.execute(filters);

    res.json(ResponseHandler.success(categories));
  } catch (error: any) {
    res
      .status(500)
      .json(ResponseHandler.error(ResponseCode.INTERNAL_ERROR, error.message));
  }
});

// ==========================================
// GET /api/categories/:id
// ==========================================
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const category = await categoryDependencies.getById.execute(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json(
          ResponseHandler.error(
            ResponseCode.NOT_FOUND,
            "Không tìm thấy danh mục"
          )
        );
    }

    res.json(ResponseHandler.success(category));
  } catch (error: any) {
    res
      .status(404)
      .json(ResponseHandler.error(ResponseCode.NOT_FOUND, error.message));
  }
});

// ==========================================
// GET /api/categories/slug/:slug
// ==========================================
router.get("/slug/:slug", async (req: Request, res: Response) => {
  try {
    const category = await categoryDependencies.getBySlug.execute(
      req.params.slug
    );

    if (!category) {
      return res
        .status(404)
        .json(
          ResponseHandler.error(
            ResponseCode.NOT_FOUND,
            "Không tìm thấy danh mục"
          )
        );
    }

    res.json(ResponseHandler.success(category));
  } catch (error: any) {
    res
      .status(404)
      .json(ResponseHandler.error(ResponseCode.NOT_FOUND, error.message));
  }
});

// ==========================================
// POST /api/categories - Create category
// ==========================================
router.post("/", async (req: Request, res: Response) => {
  try {
    const created = await categoryDependencies.create.execute(req.body);

    res
      .status(201)
      .json(ResponseHandler.created(created, "Tạo danh mục thành công"));
  } catch (error: any) {
    res
      .status(400)
      .json(ResponseHandler.error(ResponseCode.BAD_REQUEST, error.message));
  }
});

// ==========================================
// PUT /api/categories/:id - Update category
// ==========================================
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await categoryDependencies.update.execute(
      req.params.id,
      req.body
    );

    if (!updated) {
      return res
        .status(404)
        .json(
          ResponseHandler.error(
            ResponseCode.NOT_FOUND,
            "Không tìm thấy danh mục"
          )
        );
    }

    res.json(ResponseHandler.success(updated, "Cập nhật danh mục thành công"));
  } catch (error: any) {
    res
      .status(400)
      .json(ResponseHandler.error(ResponseCode.BAD_REQUEST, error.message));
  }
});

// ==========================================
// DELETE /api/categories/:id - Delete category
// ==========================================
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await categoryDependencies.delete.execute(req.params.id);

    res.json(ResponseHandler.success(null, "Xóa danh mục thành công"));
  } catch (error: any) {
    res
      .status(400)
      .json(ResponseHandler.error(ResponseCode.BAD_REQUEST, error.message));
  }
});

export default router;
