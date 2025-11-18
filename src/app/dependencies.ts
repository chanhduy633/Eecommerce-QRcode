// ========================
// IMPORT REPOSITORIES
// ========================
import { AuthAdminRepository } from "../repositories/authAdminRepository";
import { AuthUserRepository } from "../repositories/authUserRepository";
import { UserRepository } from "../repositories/userRepository";
import { ProductRepository } from "../repositories/productRepository";
import { CartRepository } from "../repositories/cartRepository";
import { OrderRepository } from "../repositories/orderRepository";

// ========================
// IMPORT USECASES
// ========================

// --- Admin Auth ---
import { AdminLoginUseCase } from "../usecases/auth/adminLoginUseCase";

// --- User Auth ---
import { LoginUser } from "../usecases/userlogin/loginUser";
import { RegisterUser } from "../usecases/userlogin/registerUser";
import { LoginWithGoogle } from "../usecases/userlogin/loginWithGoogle";
import { ForgotPassword } from "../usecases/userlogin/forgotPassword";

// --- User Management ---
import { GetAllUsers } from "../usecases/user/getAllUsers";
import { GetUserById } from "../usecases/user/getUserById";
import { CreateUser } from "../usecases/user/createUser";
import { UpdateUser } from "../usecases/user/updateUser";
import { DeleteUser } from "../usecases/user/deleteUser";

// --- Product Management ---
import { GetProductById } from "../usecases/product/getProductById";
import { CreateProduct } from "../usecases/product/createProduct";
import { UpdateProduct } from "../usecases/product/updateProduct";
import { DeleteProduct } from "../usecases/product/deleteProduct";
import { GetAllProductsV1 } from "../usecases/product/getAllProductsV1";
import { GetAllProductsV2 } from "../usecases/product/getAllProductsV2";

// --- Cart Management ---
import { AddToCart } from "../usecases/cart/addToCart";
import { GetCart } from "../usecases/cart/getCart";
import { UpdateQuantity } from "../usecases/cart/updateQuantity";
import { RemoveFromCart } from "../usecases/cart/removeFromCart";
import { ClearCart } from "../usecases/cart/clearCart";

// --- Order Management ---
import { CreateOrderUseCase } from "../usecases/order/createOrderUseCase";
import { SendEmailUseCase } from "../usecases/order/sendEmail";


// ========================
// INITIALIZE REPOSITORIES
// ========================
const authAdminRepository = new AuthAdminRepository();
const authUserRepository = new AuthUserRepository();
const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const cartRepository = new CartRepository();
const orderRepository = new OrderRepository();


// ========================
//USECASE INSTANCES
// ========================

// --- Admin Auth ---
const adminLoginUseCase = new AdminLoginUseCase(authAdminRepository);

// --- Product Common UseCases ---
const commonUseCases = {
  getById: new GetProductById(productRepository),
  create: new CreateProduct(productRepository),
  update: new UpdateProduct(productRepository),
  delete: new DeleteProduct(productRepository),
};


// ========================
// EXPORT DEPENDENCIES
// ========================

export { adminLoginUseCase };

// --- User ---
export const userDependencies = {
  getAllUsers: new GetAllUsers(userRepository),
  getUserById: new GetUserById(userRepository),
  createUser: new CreateUser(userRepository),
  updateUser: new UpdateUser(userRepository),
  deleteUser: new DeleteUser(userRepository),
};

// --- Product ---
export const productDependencies = {
  v1: {
    ...commonUseCases,
    getAll: new GetAllProductsV1(productRepository),
  },
  v2: {
    ...commonUseCases,
    getAll: new GetAllProductsV2(productRepository),
  },
};

// --- Cart ---
export const cartDependencies = {
  add: new AddToCart(cartRepository),
  get: new GetCart(cartRepository),
  updateQuantity: new UpdateQuantity(cartRepository),
  remove: new RemoveFromCart(cartRepository),
  clear: new ClearCart(cartRepository),
};

// --- Auth (User) ---
export const authDependencies = {
  login: new LoginUser(authUserRepository),
  register: new RegisterUser(authUserRepository),
  loginWithGoogle: new LoginWithGoogle(authUserRepository),
  forgotPassword: new ForgotPassword(authUserRepository),
};

// --- Order ---
export const orderDependencies = {
  create: new CreateOrderUseCase(cartRepository, productRepository, orderRepository, new SendEmailUseCase()),
};
