import { Request, Response } from "express";
import { IUserService, CreateUserDto, UpdateUserDto } from "../types/userTypes";

export interface IUserController {
  getAllUsers(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;
  createUser(req: Request, res: Response): Promise<void>;
  updateUser(req: Request, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.service.getAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.service.getById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "Không tìm thấy user" });
        return;
      }
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.service.create(req.body as CreateUserDto);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.service.update(req.params.id, req.body as UpdateUserDto);
      if (!updated) {
        res.status(404).json({ error: "Không tìm thấy user" });
        return;
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.service.delete(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Không tìm thấy user" });
        return;
      }
      res.status(200).json({ message: "Xóa user thành công" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
