import { AuthAdminRepository } from "../repositories/authAdminRepository";
import { AdminLoginUseCase } from "../usecases/auth/adminLoginUseCase";
import { UserRepository } from "../repositories/userRepository";
import { ProductRepository } from "../repositories/productRepository";
import { CartRepository } from "../repositories/cartRepository";
import { AddToCart } from "../usecases/cart/addToCart";
import { GetCart } from "../usecases/cart/getCart";
import { UpdateQuantity } from "../usecases/cart/updateQuantity";
import { RemoveFromCart } from "../usecases/cart/removeFromCart";
import { ClearCart } from "../usecases/cart/clearCart";
import { GetAllUsers } from "../usecases/user/getAllUsers";
import { GetUserById } from "../usecases/user/getUserById";
import { CreateUser } from "../usecases/user/createUser";
import { UpdateUser } from "../usecases/user/updateUser";
import { DeleteUser } from "../usecases/user/deleteUser";
import { GetProductById } from "../usecases/product/getProductById";
import { CreateProduct } from "../usecases/product/createProduct";
import { UpdateProduct } from "../usecases/product/updateProduct";
import { DeleteProduct } from "../usecases/product/deleteProduct";
import { GetAllProductsV1 } from "../usecases/product/getAllProductsV1";
import { GetAllProductsV2 } from "../usecases/product/getAllProductsV2";

// 🧠 AUTH DEPENDENCIES (User Auth)
import { AuthUserRepository } from "../repositories/authUserRepository";
import { LoginUser } from "../usecases/userlogin/loginUser";
import { RegisterUser } from "../usecases/userlogin/registerUser";
import { LoginWithGoogle } from "../usecases/userlogin/loginWithGoogle";
import { ForgotPassword } from "../usecases/userlogin/forgotPassword";

const authUserRepository = new AuthUserRepository();



const authRepository = new AuthAdminRepository();
const adminLoginUseCase = new AdminLoginUseCase(authRepository);

const userRepository = new UserRepository();

const productRepository = new ProductRepository();
const commonUseCases = {
  getById: new GetProductById(productRepository),
  create: new CreateProduct(productRepository),
  update: new UpdateProduct(productRepository),
  delete: new DeleteProduct(productRepository),
};


const cartRepository = new CartRepository();






export { adminLoginUseCase };

export const userDependencies = {
  getAllUsers: new GetAllUsers(userRepository),
  getUserById: new GetUserById(userRepository),
  createUser: new CreateUser(userRepository),
  updateUser: new UpdateUser(userRepository),
  deleteUser: new DeleteUser(userRepository),
};

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

export const cartDependencies = {
  add: new AddToCart(cartRepository),
  get: new GetCart(cartRepository),
  updateQuantity: new UpdateQuantity(cartRepository),
  remove: new RemoveFromCart(cartRepository),
  clear: new ClearCart(cartRepository),
};

export const authDependencies = {
  login: new LoginUser(authUserRepository),
  register: new RegisterUser(authUserRepository),
  loginWithGoogle: new LoginWithGoogle(authUserRepository),
  forgotPassword: new ForgotPassword(authUserRepository),
};