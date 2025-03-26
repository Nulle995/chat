import { Router } from "express";
import { UserController } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.post("/", UserController.login);
userRouter.get("/", UserController.logout);
