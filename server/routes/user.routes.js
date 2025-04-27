import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import {
  authenticateAccessToken,
  isAdmin,
} from "../middlewares/tokenMiddleware.js";

export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.post("/login", UserController.login);
userRouter.get("/logout", UserController.logout);
userRouter.get("/", authenticateAccessToken, isAdmin, UserController.get);
