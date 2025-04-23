import { Router } from "express";
import { UserController } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.post("/login", UserController.login);
userRouter.get("/logout", UserController.logout);
userRouter.get("/", UserController.getAll);
