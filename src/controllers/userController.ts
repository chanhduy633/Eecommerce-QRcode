import { Request, Response } from "express";
import { IUserService, CreateUserDto, UpdateUserDto } from "../types/userTypes";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";

// Inject dependency qua interface (Repository)
const repository = new UserRepository();
const service: IUserService = new UserService(repository);

export interface IUserController {
  getAllUsers(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;
  createUser(req: Request, res: Response): Promise<void>;
  updateUser(req: Request, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
}

export const UserController: IUserController = {
  async getAllUsers(req, res): Promise<void> {
    try {
      const users = await service.getAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserById(req, res): Promise<void> {
    try {
      const user = await service.getById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "Không tìm thấy user" });
        return;
      }
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async createUser(req, res): Promise<void> {
    try {
      const user = await service.create(req.body as CreateUserDto);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateUser(req, res): Promise<void> {
    try {
      const updated = await service.update(
        req.params.id,
        req.body as UpdateUserDto
      );
      if (!updated) {
        res.status(404).json({ error: "Không tìm thấy user" });
        return;
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteUser(req, res): Promise<void> {
    try {
      const success = await service.delete(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Không tìm thấy user" });
        return;
      }
      res.status(200).json({ message: "Xóa user thành công" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
