import { Router } from "express";
import { MessageController } from "../controllers/messageController";
import { authenticateAccessToken } from "../middlewares/tokenMiddleware";

export const messageRouter = Router();

messageRouter.post("/", authenticateAccessToken, MessageController.create);
