import { Router } from "express";
import { MessageController } from "../controllers/messageController.js";
import {
  authenticateAccessToken,
  hasPermission,
} from "../middlewares/tokenMiddleware.js";

export const messageRouter = Router();

messageRouter.post("/", authenticateAccessToken, MessageController.create);
messageRouter.patch("/", hasPermission, MessageController.update);
messageRouter.delete("/", hasPermission, MessageController.delete);
