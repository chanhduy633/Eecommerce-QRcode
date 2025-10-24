import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/userController";

// ✅ Khởi tạo tầng thấp nhất trước (Repository → Service → Controller)
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// ✅ Export ra ngoài để router/app dùng
export { userRepository, userService, userController };
