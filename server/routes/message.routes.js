import { Router } from "express";
import { MessageController } from "../controllers/messageController.js";
import { authenticateAccessToken } from "../middlewares/tokenMiddleware.js";

export const messageRouter = Router();

messageRouter.post("/", authenticateAccessToken, MessageController.create);
